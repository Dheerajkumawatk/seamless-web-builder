const puppeteer = require("puppeteer");
const mysql = require("mysql2/promise");

(async () => {
  // =========================================================
  // CONFIG
  // =========================================================

  const URL =
    "https://sec.rajasthan.gov.in/Winner_Runner.aspx?code=CEM&Period=0&DistrictID=33&LocalBodyID=12084";

  const DISTRICT_SELECTOR = 'select[id$="DistrictDropDownList"]';

  const ULB_SELECTOR = 'select[id$="PanchayatSamitiDropDownList"]';

  // =========================================================
  // STATS
  // =========================================================

  let totalRowsFound = 0;
  let totalInserted = 0;
  let totalIgnored = 0;
  let totalULBs = 0;
  let failedULBs = 0;

  const startTime = Date.now();

  // =========================================================
  // DATABASE
  // =========================================================

  const db = await mysql.createPool({
    host: "103.191.208.201",

    port: Number(process.env.DB_PORT || 3306),

    user: "fmojnedg_bharatpanchayatgdpe",

    password: "Legal786skr",

    database: "fmojnedg_bharat_Panchayat_GDPE",

    charset: "utf8mb4",

    waitForConnections: true,

    connectionLimit: 5,

    queueLimit: 0,
  });

  // =========================================================
  // BROWSER
  // =========================================================

  let browser = null;

  // =========================================================
  // HELPERS
  // =========================================================

  // ---------------------------------------------------------
  // Sleep
  // ---------------------------------------------------------

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ---------------------------------------------------------
  // Get dropdown options
  // ---------------------------------------------------------

  async function getOptions(selector) {
    return await page.evaluate((selector) => {
      const select = document.querySelector(selector);

      if (!select) {
        return [];
      }

      return Array.from(select.options)

        .map((option) => ({
          value: option.value,
          text: option.text.trim(),
        }))

        .filter((option) => option.value !== "" && option.value !== "0");
    }, selector);
  }

  // ---------------------------------------------------------
  // Wait for dropdown options
  // ---------------------------------------------------------

  async function waitForDropdown(selector, minimum = 1, timeout = 20000) {
    try {
      await page.waitForFunction(
        ({ selector, minimum }) => {
          const select = document.querySelector(selector);

          if (!select) {
            return false;
          }

          return select.options.length >= minimum;
        },

        {
          timeout,
        },

        {
          selector,
          minimum,
        },
      );

      return true;
    } catch {
      return false;
    }
  }

  // ---------------------------------------------------------
  // Select dropdown
  // ---------------------------------------------------------

  async function selectAndWait(selector, value, label) {
    console.log(`      🔄 Selecting ${label}: ${value}`);

    const onchange = await page.$eval(
      selector,
      (element) => element.getAttribute("onchange") || "",
    );

    const hasPostBack =
      onchange.includes("__doPostBack") || onchange.includes("WebForm_DoPostBackWithOptions");

    // =====================================================
    // ASP.NET POSTBACK
    // =====================================================

    if (hasPostBack) {
      try {
        await Promise.all([
          page.waitForNavigation({
            waitUntil: "domcontentloaded",

            timeout: 30000,
          }),

          page.select(selector, value),
        ]);

        console.log("      ✅ Postback completed");
      } catch (error) {
        // Navigation timeout can happen
        // even when the selection succeeded.

        if (!error.message.includes("Navigation timeout")) {
          throw error;
        }

        console.log("      ⚠️ Navigation timeout, continuing...");

        await sleep(800);
      }
    } else {
      // =================================================
      // NORMAL / AJAX SELECT
      // =================================================

      await page.select(selector, value);

      await sleep(500);
    }
  }

  // ---------------------------------------------------------
  // Find SEP 2026 dropdown
  // ---------------------------------------------------------

  async function findDurationDropdown() {
    return await page.evaluate(() => {
      const selects = Array.from(document.querySelectorAll("select"));

      const select = selects.find((select) =>
        Array.from(select.options).some(
          (option) => option.text.trim().toLowerCase() === "sep 2026",
        ),
      );

      if (!select) {
        return null;
      }

      return {
        id: select.id,
      };
    });
  }

  // =========================================================
  // SCRAPE TABLE
  // =========================================================

  async function scrapeTable() {
    return await page.evaluate(() => {
      // -------------------------------------------------
      // First try known table
      // -------------------------------------------------

      let table = document.querySelector("table.overflow-y");

      // -------------------------------------------------
      // Fallback table detection
      // -------------------------------------------------

      if (!table) {
        const tables = Array.from(document.querySelectorAll("table"));

        table = tables.find((t) => {
          const text = t.innerText.toLowerCase();

          return (
            text.includes("votes secured") ||
            text.includes("party name") ||
            text.includes("candidate category") ||
            text.includes("ward reservations")
          );
        });
      }

      if (!table) {
        return [];
      }

      // -------------------------------------------------
      // Get rows
      // -------------------------------------------------

      const rows = Array.from(table.querySelectorAll("tr"));

      if (rows.length <= 1) {
        return [];
      }

      // -------------------------------------------------
      // Convert rows
      // -------------------------------------------------

      return rows

        .slice(1)

        .map((row) => {
          const cols = Array.from(row.querySelectorAll("td, th"));

          if (cols.length < 5) {
            return null;
          }

          return {
            district_name: cols[1]?.innerText.trim() || "",

            ulb_name: cols[2]?.innerText.trim() || "",

            ward_no: cols[3]?.innerText.trim() || "",

            ward_reservations: cols[4]?.innerText.trim() || "",

            result: cols[5]?.innerText.trim() || "",

            name: cols[6]?.innerText.trim() || "",

            gender: cols[7]?.innerText.trim() || "",

            age: cols[8]?.innerText.trim() || "",

            candidate_category: cols[9]?.innerText.trim() || "",

            party_name: cols[10]?.innerText.trim() || "",

            votes_secured: cols[11]?.innerText.trim() || "",
          };
        })

        .filter(Boolean);
    });
  }

  // =========================================================
  // INSERT INTO MYSQL
  // =========================================================

  async function insertRows(rows) {
    if (!rows.length) {
      return {
        inserted: 0,
        ignored: 0,
      };
    }

    // -----------------------------------------------------
    // Prepare values
    // -----------------------------------------------------

    const values = rows.map((row) => {
      // Age
      let age = null;

      if (row.age) {
        const parsedAge = Number.parseInt(String(row.age).replace(/[^\d]/g, ""), 10);

        if (!Number.isNaN(parsedAge)) {
          age = parsedAge;
        }
      }

      // Votes
      let votes = 0;

      if (row.votes_secured) {
        const parsedVotes = Number(
          String(row.votes_secured)
            .replace(/,/g, "")

            .replace(/[^\d.-]/g, ""),
        );

        if (!Number.isNaN(parsedVotes)) {
          votes = parsedVotes;
        }
      }

      return [
        row.district_name || "",

        row.ulb_name || "",

        row.ward_no || "",

        row.ward_reservations || "",

        row.result || "",

        row.name || "",

        row.gender || "",

        age,

        row.candidate_category || "",

        row.party_name || "",

        votes,
      ];
    });

    // -----------------------------------------------------
    // INSERT IGNORE
    // -----------------------------------------------------

    const sql = `

            INSERT IGNORE INTO election_results

            (
                district_name,
                ulb_name,
                ward_no,
                ward_reservations,
                result,
                name,
                gender,
                age,
                candidate_category,
                party_name,
                votes_secured
            )

            VALUES ?

        `;

    const [result] = await db.query(sql, [values]);

    return {
      inserted: result.affectedRows,

      ignored: rows.length - result.affectedRows,
    };
  }

  // =========================================================
  // MAIN
  // =========================================================

  try {
    console.log("");
    console.log("==============================================");

    console.log("       RAJASTHAN ELECTION SCRAPER");

    console.log("           DIRECT MYSQL MODE");

    console.log("==============================================");

    // =====================================================
    // DATABASE CONNECTION
    // =====================================================

    console.log("");
    console.log("🔌 Testing MySQL connection...");

    const connection = await db.getConnection();

    await connection.ping();

    connection.release();

    console.log("✅ MySQL connected");

    // =====================================================
    // BROWSER
    // =====================================================

    console.log("");
    console.log("🌐 Starting browser...");

    browser = await puppeteer.launch({
      // IMPORTANT:
      // Cron ke liye headless true
      headless: true,

      args: [
        "--no-sandbox",

        "--disable-setuid-sandbox",

        "--disable-dev-shm-usage",

        "--disable-blink-features=AutomationControlled",
      ],
    });

    // IMPORTANT:
    // page ko try ke andar declare kiya gaya hai
    // aur helper functions ko access dene ke liye
    // variable function scope mein declare hona chahiye.

    page = await browser.newPage();

    // =====================================================
    // OPEN WEBSITE
    // =====================================================

    console.log("");
    console.log("🚀 Opening website...");

    await page.goto(
      URL,

      {
        waitUntil: "domcontentloaded",

        timeout: 60000,
      },
    );

    console.log("✅ Website loaded");

    // =====================================================
    // SEP 2026
    // =====================================================

    console.log("");
    console.log("📅 Finding SEP 2026...");

    const duration = await findDurationDropdown();

    if (!duration) {
      throw new Error("SEP 2026 dropdown nahi mila.");
    }

    const DURATION_SELECTOR = `#${duration.id}`;

    const sepValue = await page.$eval(
      DURATION_SELECTOR,

      (select) => {
        const option = Array.from(select.options).find(
          (option) => option.text.trim().toLowerCase() === "sep 2026",
        );

        return option ? option.value : null;
      },
    );

    if (!sepValue) {
      throw new Error("SEP 2026 value nahi mila.");
    }

    console.log(`📅 SEP 2026 value: ${sepValue}`);

    await selectAndWait(
      DURATION_SELECTOR,

      sepValue,

      "Duration",
    );

    // =====================================================
    // DISTRICTS
    // =====================================================

    console.log("");
    console.log("📍 Loading districts...");

    const districtsLoaded = await waitForDropdown(
      DISTRICT_SELECTOR,

      2,
    );

    if (!districtsLoaded) {
      throw new Error("District dropdown load nahi hua.");
    }

    const districts = await getOptions(DISTRICT_SELECTOR);

    console.log(`✅ Districts Found: ${districts.length}`);

    // =====================================================
    // DISTRICT LOOP
    // =====================================================

    for (let d = 0; d < districts.length; d++) {
      const district = districts[d];

      console.log("");
      console.log("==============================================");

      console.log(`📍 DISTRICT ${d + 1}/${districts.length}: ${district.text}`);

      console.log("==============================================");

      // -------------------------------------------------
      // SELECT DISTRICT
      // -------------------------------------------------

      await selectAndWait(
        DISTRICT_SELECTOR,

        district.value,

        `District ${district.text}`,
      );

      // -------------------------------------------------
      // WAIT ULB
      // -------------------------------------------------

      const ulbLoaded = await waitForDropdown(
        ULB_SELECTOR,

        2,
      );

      if (!ulbLoaded) {
        console.log("   ❌ ULB dropdown load nahi hua.");

        continue;
      }

      // -------------------------------------------------
      // GET ULBs
      // -------------------------------------------------

      const ulbs = await getOptions(ULB_SELECTOR);

      console.log(`   🏢 ULBs Found: ${ulbs.length}`);

      if (!ulbs.length) {
        console.log("   ⚠️ No ULBs found.");

        continue;
      }

      // =================================================
      // ULB LOOP
      // =================================================

      for (let u = 0; u < ulbs.length; u++) {
        const ulb = ulbs[u];

        totalULBs++;

        console.log("");
        console.log(`   🏢 ULB ${u + 1}/${ulbs.length}: ${ulb.text}`);

        try {
          // -----------------------------------------
          // SELECT ULB
          // -----------------------------------------

          await selectAndWait(
            ULB_SELECTOR,

            ulb.value,

            `ULB ${ulb.text}`,
          );

          // -----------------------------------------
          // WARD
          // -----------------------------------------

          console.log("      🔢 Ward: --All-- (default)");

          // IMPORTANT:
          // Ward dropdown ko touch nahi karna.

          // -----------------------------------------
          // WAIT FOR TABLE
          // -----------------------------------------

          try {
            await page.waitForFunction(
              () => {
                const tables = document.querySelectorAll("table");

                return Array.from(tables).some((table) => {
                  const text = table.innerText.toLowerCase();

                  return (
                    text.includes("votes secured") ||
                    text.includes("party name") ||
                    text.includes("candidate category")
                  );
                });
              },

              {
                timeout: 15000,
              },
            );
          } catch {
            console.log("      ⚠️ Table wait timeout");
          }

          // -----------------------------------------
          // SCRAPE
          // -----------------------------------------

          const rows = await scrapeTable();

          console.log(`      📊 Rows Found: ${rows.length}`);

          totalRowsFound += rows.length;

          // -----------------------------------------
          // DATABASE INSERT
          // -----------------------------------------

          if (rows.length > 0) {
            const result = await insertRows(rows);

            totalInserted += result.inserted;

            totalIgnored += result.ignored;

            console.log(`      ✅ New rows inserted: ${result.inserted}`);

            console.log(`      ⏭️ Existing rows ignored: ${result.ignored}`);
          } else {
            console.log("      ⚠️ No data found.");
          }
        } catch (error) {
          failedULBs++;

          console.log("");
          console.log(`      ❌ Failed ULB: ${ulb.text}`);

          console.log(`      ${error.message}`);

          // Continue next ULB
          continue;
        }
      }
    }

    // =====================================================
    // FINAL REPORT
    // =====================================================

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("");
    console.log("");
    console.log("==============================================");

    console.log("             🏁 SCRAPING COMPLETE");

    console.log("==============================================");

    console.log(`🏢 ULBs processed        : ${totalULBs}`);

    console.log(`📊 Rows scraped          : ${totalRowsFound}`);

    console.log(`✅ New rows inserted     : ${totalInserted}`);

    console.log(`⏭️ Existing rows ignored : ${totalIgnored}`);

    console.log(`❌ Failed ULBs           : ${failedULBs}`);

    console.log(`⏱️ Time taken            : ${timeTaken}s`);

    console.log("🗄️ Table                 : election_results");

    console.log("==============================================");
  } catch (error) {
    console.log("");
    console.log("==============================================");

    console.log("❌ SCRAPER ERROR");

    console.log("==============================================");

    console.error(error);
  } finally {
    // =====================================================
    // CLOSE BROWSER
    // =====================================================

    if (browser) {
      try {
        await browser.close();
      } catch {
        // Ignore browser close error
      }
    }

    // =====================================================
    // CLOSE DATABASE
    // =====================================================

    try {
      await db.end();
    } catch {
      // Ignore DB close error
    }

    console.log("");
    console.log("🔌 MySQL connection closed.");
  }
})();
