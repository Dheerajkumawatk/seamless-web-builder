"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Download,
  Edit3,
  Eye,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageCircle,
  Newspaper,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  UserRoundPlus,
  UsersRound,
  X,
  XCircle,
} from "lucide-react";
import { adminEmail, adminPassword } from "@/lib/admin-auth";
import { formatVikasMitraId } from "@/lib/profile-id";

type Tab = "vikas" | "contacts" | "demos" | "blogs" | "orders";

type Vikas = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  district: string;
  tehsil: string;
  village: string;
  occupation?: string;
  experience?: string;
  message?: string;
  photo?: string;
  panCard?: string;
  aadhaarCard?: string;
  status: "pending" | "approved" | "rejected";
  rejectionMessage?: string;
  createdAt: string;
};

type ContactLead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  post: string;
  source?: string;
  state?: string;
  city?: string;
  message?: string;
  createdAt: string;
};

type DemoLead = {
  id: string;
  name: string;
  phone: string;
  village?: string;
  district?: string;
  post?: string;
  source?: string;
  pageUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: string;
  notes?: string;
  createdAt: string;
};

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishDate: string;
  category: string;
  image: string;
  imageAltText: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
  createdAt: string;
};

type PackageOrder = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  packageName: string;
  amountPaise: number;
  currency: string;
  status: "created" | "pending" | "paid" | "failed" | "cancelled";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
};

type AdminData = {
  vikas: Vikas[];
  contacts: ContactLead[];
  demos: DemoLead[];
  blogs: BlogPost[];
  packageOrders: PackageOrder[];
};

const emptyData: AdminData = {
  vikas: [],
  contacts: [],
  demos: [],
  blogs: [],
  packageOrders: [],
};

const navItems = [
  { key: "vikas" as const, label: "Vikas Mitra", icon: UsersRound },
  { key: "contacts" as const, label: "Contact Details", icon: Mail },
  { key: "demos" as const, label: "Demo Requests", icon: UserRoundPlus },
  { key: "orders" as const, label: "Package Orders", icon: CreditCard },
  { key: "blogs" as const, label: "Blogs", icon: Newspaper },
];

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("vikas");
  const [data, setData] = useState<AdminData>(emptyData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [editing, setEditing] = useState<{
    type: "vikas" | "contact" | "demo" | "blog";
    row: Record<string, unknown>;
  } | null>(null);
  const [previewing, setPreviewing] = useState<Vikas | null>(null);

  const authHeaders = useMemo(
    () => ({
      "x-admin-email": email,
      "x-admin-password": password,
    }),
    [email, password],
  );

  const pendingCount = data.vikas.filter((row) => row.status === "pending").length;
  const approvedCount = data.vikas.filter((row) => row.status === "approved").length;
  const packageLeadCount = data.contacts.filter(
    (row) => row.source === "Package Form" || row.post === "Package Query",
  ).length;
  const paidOrderCount = data.packageOrders.filter((row) => row.status === "paid").length;
  const paidAmountPaise = data.packageOrders
    .filter((row) => row.status === "paid")
    .reduce((total, row) => total + row.amountPaise, 0);
  const pendingAmountPaise = data.packageOrders
    .filter((row) => row.status === "pending" || row.status === "created")
    .reduce((total, row) => total + row.amountPaise, 0);

  useEffect(() => {
    const saved = window.localStorage.getItem("bharat-admin-auth");
    if (saved) {
      const parsed = JSON.parse(saved) as { email: string; password: string };
      setEmail(parsed.email);
      setPassword(parsed.password);
      setLoggedIn(parsed.email === adminEmail && parsed.password === adminPassword);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      void loadData();
    }
  }, [loggedIn]);

  async function loadData() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/data", { headers: authHeaders });
      if (!response.ok) throw new Error("Admin data load failed");
      const payload = (await response.json()) as Partial<AdminData>;
      setData({
        ...emptyData,
        ...payload,
        packageOrders: payload.packageOrders ?? [],
      });
    } catch {
      setMessage(
        "Data load nahi ho paya. Supabase tables, RLS policies, ya service role key check karein.",
      );
    } finally {
      setLoading(false);
    }
  }

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      window.localStorage.setItem("bharat-admin-auth", JSON.stringify({ email, password }));
      setLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Wrong admin email ya password.");
    }
  }

  function logout() {
    window.localStorage.removeItem("bharat-admin-auth");
    setLoggedIn(false);
    setData(emptyData);
  }

  type UpdateResult = {
    ok: boolean;
    email?: { sent: boolean; skipped?: boolean; error?: string };
  };

  async function updateRow(
    type: "vikas" | "contact" | "demo" | "blog",
    id: string,
    rowData: Record<string, unknown>,
    options?: { notify?: boolean; silent?: boolean },
  ): Promise<UpdateResult | null> {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          type,
          id,
          data: rowData,
          ...(options?.notify ? { notify: true } : {}),
        }),
      });
      if (!response.ok) throw new Error("Update failed");
      const result = (await response.json()) as UpdateResult;
      await loadData();
      setEditing(null);
      if (!options?.silent) {
        setMessage("Update save ho gaya.");
      }
      return result;
    } catch {
      setMessage("Update save nahi ho paya.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createBlog() {
    setLoading(true);
    setMessage("");
    try {
      const publishDate = new Date().toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const response = await fetch("/api/admin/data", {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          type: "blog",
          data: {
            title: "नया ब्लॉग",
            slug: "",
            excerpt: "इस ब्लॉग का छोटा विवरण यहां लिखें।",
            date: publishDate,
            publishDate,
            category: "अपडेट",
            image: "village",
            imageAltText: "नया ब्लॉग",
            content: "यहां पूरा ब्लॉग कंटेंट लिखें।",
            seoTitle: "नया ब्लॉग",
            metaDescription: "इस ब्लॉग की मेटा डिस्क्रिप्शन यहां लिखें।",
          },
        }),
      });
      if (!response.ok) throw new Error("Blog create failed");
      const result = (await response.json()) as { row?: BlogPost };
      await loadData();
      if (result.row) {
        setEditing({ type: "blog", row: result.row });
      }
      setMessage("New blog add ho gaya. Edit karke content update karein.");
    } catch {
      setMessage("Blog add nahi ho paya.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteRow(type: "vikas" | "contact" | "demo" | "blog", id: string, label: string) {
    const ok = window.confirm(`${label} delete karna hai? Ye row DB se permanently delete hogi.`);
    if (!ok) return;

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/data", {
        method: "DELETE",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ type, id }),
      });
      if (!response.ok) throw new Error("Delete failed");
      await loadData();
      setMessage("Record delete ho gaya.");
    } catch {
      setMessage("Record delete nahi ho paya.");
    } finally {
      setLoading(false);
    }
  }

  function exportCurrentTab() {
    const rows =
      tab === "vikas"
        ? filterRows(data.vikas, query, dateFrom, dateTo)
        : tab === "contacts"
          ? filterRows(data.contacts, query, dateFrom, dateTo)
          : tab === "demos"
            ? filterRows(data.demos, query, dateFrom, dateTo)
            : tab === "orders"
              ? filterRows(
                  data.packageOrders as Array<PackageOrder & Record<string, unknown>>,
                  query,
                  dateFrom,
                  dateTo,
                )
              : filterRows(data.blogs, query, dateFrom, dateTo);
    if (!rows.length) {
      setMessage("Export ke liye koi record nahi mila.");
      return;
    }

    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bharat-pehchan-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  async function approve(row: Vikas) {
    setData((current) => ({
      ...current,
      vikas: current.vikas.map((profile) =>
        profile.id === row.id ? { ...profile, status: "approved" } : profile,
      ),
    }));
    const result = await updateRow(
      "vikas",
      row.id,
      { status: "approved" },
      { notify: Boolean(row.email), silent: true },
    );

    if (!result?.ok) {
      setData((current) => ({
        ...current,
        vikas: current.vikas.map((profile) =>
          profile.id === row.id ? { ...profile, status: row.status } : profile,
        ),
      }));
      return;
    }

    if (!row.email) {
      setMessage(
        "Approve ho gaya. Client ka email nahi diya gaya tha, isliye auto-mail nahi bheja.",
      );
      return;
    }

    const email = result.email;
    if (email?.sent) {
      setMessage(
        `Approve ho gaya. Member card aur Unique ID ke saath email ${row.email} par bhej diya gaya.`,
      );
      return;
    }

    if (email?.skipped) {
      setMessage(
        "Approve ho gaya, par email configure nahi hai. SMTP settings check karke 'Email Card' se retry karein.",
      );
    } else {
      setMessage(
        `Approve ho gaya, par email bhejne me dikkat aayi${email?.error ? `: ${email.error}` : ""}. 'Email Card' se retry karein.`,
      );
    }
  }

  async function reject(row: Vikas) {
    const rejectionMessage = window.prompt(
      "Reject message",
      "Your Vikas Mitra profile has been rejected.",
    );
    if (rejectionMessage === null) return;
    const result = await updateRow(
      "vikas",
      row.id,
      { status: "rejected", rejectionMessage },
      { notify: Boolean(row.email), silent: true },
    );
    if (!result?.ok) return;
    if (!row.email) {
      setMessage(
        "Reject ho gaya. Client ka email nahi diya gaya tha, isliye auto-mail nahi bheja.",
      );
      return;
    }
    setMessage(
      result.email?.sent
        ? `Reject ho gaya. Rejection email ${row.email} par bhej diya gaya.`
        : "Reject ho gaya, par email nahi bheja ja saka. Applicant email aur SMTP settings check karein; Reject se dobara email bhej sakte hain.",
    );
  }

  const field =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

  if (!loggedIn) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0f172a] px-4">
        <form
          acceptCharset="UTF-8"
          onSubmit={login}
          className="w-full max-w-md rounded-lg bg-white p-7 shadow-2xl"
        >
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-600 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="mt-5 text-xs font-black tracking-[0.18em] text-emerald-700 uppercase">
            Secure Admin
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Bharat Pehchan Admin</h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Login karke profiles aur website leads manage karein.
          </p>
          <div className="mt-6 space-y-4">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={field}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={field}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="mt-5 w-full rounded-md bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20">
            Login
          </button>
          {message && <p className="mt-3 text-sm font-bold text-red-600">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 z-40 border-b border-slate-200 bg-[#111827] text-white shadow-lg shadow-slate-950/10 lg:top-0 lg:h-screen lg:border-b-0">
        <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-5 lg:block">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-600 sm:h-11 sm:w-11">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black">Bharat Pehchan</p>
              <p className="truncate text-xs font-semibold text-slate-400">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="rounded-md bg-white/10 px-3 py-2 text-xs font-black lg:hidden"
          >
            Logout
          </button>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-3 [-webkit-overflow-scrolling:touch] sm:px-5 sm:pb-5 lg:mt-4 lg:block lg:space-y-2 lg:overflow-visible">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-xs font-black whitespace-nowrap transition sm:gap-3 sm:px-4 sm:py-3 sm:text-sm lg:w-full ${
                tab === key
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden px-5 pb-5 lg:block">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold text-slate-400">Logged in as</p>
            <p className="mt-1 text-sm font-black break-all">{email}</p>
          </div>
          <button
            onClick={logout}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-black text-slate-950"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <section className="min-w-0">
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:py-5 lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-emerald-700 uppercase">
                Admin Panel
              </p>
              <h1 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
                {navItems.find((item) => item.key === tab)?.label}
              </h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:flex-wrap xl:justify-end">
              <label className="relative min-w-0 sm:col-span-2 xl:w-72">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white py-2.5 pr-3 pl-9 text-sm font-semibold outline-none focus:border-emerald-500"
                  placeholder="Search records"
                />
              </label>
              <label className="min-w-0 xl:w-56">
                <span className="mb-1 block text-[11px] font-black tracking-[0.12em] text-slate-500 uppercase">
                  From
                </span>
                <input
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                  type="datetime-local"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-500"
                  title="From date/time"
                />
              </label>
              <label className="min-w-0 xl:w-56">
                <span className="mb-1 block text-[11px] font-black tracking-[0.12em] text-slate-500 uppercase">
                  To
                </span>
                <input
                  value={dateTo}
                  onChange={(event) => setDateTo(event.target.value)}
                  type="datetime-local"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-500"
                  title="To date/time"
                />
              </label>
              {(dateFrom || dateTo) && (
                <button
                  onClick={() => {
                    setDateFrom("");
                    setDateTo("");
                  }}
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-black"
                >
                  Clear Date
                </button>
              )}
              {tab === "blogs" && (
                <button
                  onClick={createBlog}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-black text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Blog
                </button>
              )}
              <button
                onClick={exportCurrentTab}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-black"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
              <button
                onClick={loadData}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-black"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh
              </button>
            </div>
          </div>
        </header>

        <div className="px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <Stat label="Total Vikas Mitra" value={data.vikas.length} />
            <Stat label="Pending Approval" value={pendingCount} tone="orange" />
            <Stat label="Approved Profiles" value={approvedCount} tone="green" />
            <Stat label="Demo Requests" value={data.demos.length} tone="orange" />
            <Stat label="Package Leads" value={packageLeadCount} tone="blue" />
            <Stat label="Package Orders" value={data.packageOrders.length} tone="blue" />
            <Stat label="Paid Orders" value={paidOrderCount} tone="green" />
            <Stat label="Paid Amount" value={formatAdminAmount(paidAmountPaise)} tone="green" />
            <Stat
              label="Pending Amount"
              value={formatAdminAmount(pendingAmountPaise)}
              tone="orange"
            />
            <Stat label="Contact Leads" value={data.contacts.length} tone="blue" />
            <Stat label="Blogs" value={data.blogs.length} tone="green" />
          </div>

          {message && (
            <p className="mt-5 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
              {message}
            </p>
          )}

          <div className="mt-6">
            {tab === "vikas" && (
              <VikasList
                rows={filterRows(data.vikas, query, dateFrom, dateTo)}
                onApprove={approve}
                onReject={reject}
                onEdit={(row) => setEditing({ type: "vikas", row })}
                onDelete={(row) => deleteRow("vikas", row.id, row.name)}
                onPreview={setPreviewing}
              />
            )}
            {tab === "contacts" && (
              <SimpleList
                rows={filterRows(data.contacts, query, dateFrom, dateTo)}
                type="contact"
                onEdit={(type, row) => setEditing({ type, row })}
                onDelete={(type, row) => deleteRow(type, row.id, row.name)}
                title={(row) => `${row.name} - ${leadSourceLabel(row)}`}
                detail={(row) =>
                  `${row.post} | ${row.phone}${row.email ? ` | ${row.email}` : ""}${displayLeadCity(row) ? ` | City: ${displayLeadCity(row)}` : ""}${row.state && row.state !== displayLeadCity(row) ? ` | ${row.state}` : ""}`
                }
              />
            )}
            {tab === "demos" && (
              <SimpleList
                rows={filterRows(data.demos, query, dateFrom, dateTo)}
                type="demo"
                onEdit={(type, row) => setEditing({ type, row })}
                onDelete={(type, row) => deleteRow(type, row.id, row.name)}
                title={(row) => `${row.name} - ${row.status || "NEW"}`}
                detail={(row) =>
                  `${row.phone}${row.post ? ` | ${row.post}` : ""}${row.village ? ` | ${row.village}` : ""}${row.district ? ` | ${row.district}` : ""}`
                }
              />
            )}
            {tab === "orders" && (
              <OrdersList
                rows={filterRows(
                  data.packageOrders as Array<PackageOrder & Record<string, unknown>>,
                  query,
                  dateFrom,
                  dateTo,
                )}
              />
            )}
            {tab === "blogs" && (
              <BlogList
                rows={filterRows(data.blogs, query, dateFrom, dateTo)}
                onEdit={(row) => setEditing({ type: "blog", row })}
                onDelete={(row) => deleteRow("blog", row.id, row.title)}
              />
            )}
          </div>
        </div>
      </section>

      {editing && (
        <EditModal
          type={editing.type}
          row={editing.row}
          fieldClass={field}
          onClose={() => setEditing(null)}
          onSave={(id, rowData) => updateRow(editing.type, id, rowData)}
        />
      )}

      {previewing && <PreviewModal row={previewing} onClose={() => setPreviewing(null)} />}
    </main>
  );
}

function filterRows<T extends Record<string, unknown> & { createdAt?: string }>(
  rows: T[],
  query: string,
  dateFrom = "",
  dateTo = "",
): T[] {
  const text = query.trim().toLowerCase();
  const fromTime = dateFrom ? new Date(dateFrom).getTime() : null;
  const toTime = dateTo ? new Date(dateTo).getTime() : null;

  return rows.filter((row) => {
    const matchesText = !text || Object.values(row).join(" ").toLowerCase().includes(text);
    if (!matchesText) return false;

    if (!fromTime && !toTime) return true;

    const rowTime = row.createdAt ? new Date(row.createdAt).getTime() : Number.NaN;
    if (!Number.isFinite(rowTime)) return false;
    if (fromTime && rowTime < fromTime) return false;
    if (toTime && rowTime > toTime) return false;
    return true;
  });
}

function toCsv(rows: Record<string, unknown>[]) {
  const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replaceAll('"', '""')}"`;
  };
  return [
    columns.join(","),
    ...rows.map((row) => columns.map((key) => escape(row[key])).join(",")),
  ].join("\n");
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function Stat({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: number | string;
  tone?: "slate" | "orange" | "green" | "blue";
}) {
  const tones = {
    slate: "bg-slate-950",
    orange: "bg-emerald-600",
    green: "bg-emerald-600",
    blue: "bg-blue-600",
  };
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className={`h-1.5 w-12 rounded-full ${tones[tone]}`} />
      <p className="mt-3 text-xs leading-tight font-bold text-slate-500 sm:mt-4 sm:text-sm">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black sm:text-3xl">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Vikas["status"] }) {
  const className =
    status === "approved"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "rejected"
        ? "bg-red-50 text-red-700 ring-red-200"
        : "bg-emerald-50 text-emerald-700 ring-emerald-200";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ring-1 ${className}`}>
      {status}
    </span>
  );
}

function VikasList({
  rows,
  onApprove,
  onReject,
  onEdit,
  onDelete,
  onPreview,
}: {
  rows: Vikas[];
  onApprove: (row: Vikas) => void;
  onReject: (row: Vikas) => void;
  onEdit: (row: Record<string, unknown>) => void;
  onDelete: (row: Vikas) => void;
  onPreview: (row: Vikas) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-black">Vikas Mitra Applications</h2>
      </div>
      <div className="divide-y divide-slate-200">
        {rows.map((row) => (
          <section key={row.id} className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="break-words text-lg font-black sm:text-xl">{row.name}</h3>
                  <StatusBadge status={row.status} />
                </div>
                <p className="mt-2 text-xs font-black tracking-[0.16em] text-emerald-700 uppercase">
                  {formatVikasMitraId(row.id, row.createdAt)}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  Submitted: {formatAdminDateTime(row.createdAt)}
                </p>
                <p className="mt-1 break-all text-sm font-bold text-slate-600">
                  {row.phone} {row.email ? `| ${row.email}` : ""}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {row.village}, {row.tehsil}, {row.district}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  {row.occupation} {row.experience ? `| ${row.experience}` : ""}
                </p>
                {row.message && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{row.message}</p>
                )}
                {row.rejectionMessage && (
                  <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                    Reject msg: {row.rejectionMessage}
                  </p>
                )}
              </div>
              <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-start">
                <button onClick={() => onPreview(row)} className="action border bg-white">
                  <Eye className="h-4 w-4" /> Preview
                </button>
                {row.status === "approved" ? (
                  <span className="action cursor-default bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Approved
                  </span>
                ) : (
                  <button
                    onClick={() => onApprove(row)}
                    className="action bg-emerald-600 text-white"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                )}
                <button onClick={() => onReject(row)} className="action bg-red-600 text-white">
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button onClick={() => onEdit(row)} className="action border bg-white">
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="action border bg-white text-red-700"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
                {row.status === "rejected" && (
                  <a
                    href={`https://wa.me/${row.phone.replace(/\D/g, "")}?text=${encodeURIComponent(row.rejectionMessage ?? "Your Vikas Mitra profile has been rejected.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action border bg-white"
                  >
                    <MessageCircle className="h-4 w-4" /> Msg
                  </a>
                )}
                {row.status === "approved" && row.email && (
                  <button
                    type="button"
                    onClick={() => onApprove(row)}
                    className="action border bg-white"
                  >
                    <Mail className="h-4 w-4" /> Email Card
                  </button>
                )}
                {row.status === "approved" && (
                  <a
                    href={`/vikas-mitra/id-card/${row.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action border bg-white"
                  >
                    <Download className="h-4 w-4" /> ID Card PDF
                  </a>
                )}
              </div>
            </div>
          </section>
        ))}
        {rows.length === 0 && (
          <p className="p-8 text-center text-sm font-bold text-slate-500">No records found.</p>
        )}
      </div>
    </div>
  );
}

function OrdersList({ rows }: { rows: PackageOrder[] }) {
  const statusTone: Record<PackageOrder["status"], string> = {
    created: "bg-slate-100 text-slate-700",
    pending: "bg-amber-100 text-amber-800",
    paid: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-700",
    cancelled: "bg-slate-100 text-slate-600",
  };
  const statusLabel: Record<PackageOrder["status"], string> = {
    created: "Lead saved",
    pending: "Payment pending",
    paid: "Paid",
    failed: "Failed",
    cancelled: "Cancelled",
  };
  const paidRows = rows.filter((row) => row.status === "paid");
  const paidTotal = paidRows.reduce((total, row) => total + row.amountPaise, 0);
  const pendingTotal = rows
    .filter((row) => row.status === "pending" || row.status === "created")
    .reduce((total, row) => total + row.amountPaise, 0);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-3 sm:p-5">
        <div>
          <p className="text-xs font-black tracking-[0.12em] text-slate-500 uppercase">
            Total Orders
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">{rows.length}</p>
        </div>
        <div>
          <p className="text-xs font-black tracking-[0.12em] text-slate-500 uppercase">
            Paid Collection
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-700">
            {formatAdminAmount(paidTotal)}
          </p>
        </div>
        <div>
          <p className="text-xs font-black tracking-[0.12em] text-slate-500 uppercase">
            Pending Value
          </p>
          <p className="mt-1 text-2xl font-black text-amber-700">
            {formatAdminAmount(pendingTotal)}
          </p>
        </div>
      </div>
      <div className="divide-y divide-slate-200">
        {rows.length === 0 && (
          <p className="p-5 text-sm font-bold text-slate-500">Abhi koi package order nahi hai.</p>
        )}
        {rows.map((row) => (
          <section key={row.id} className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="break-words text-lg font-black">{row.name}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold uppercase ${statusTone[row.status]}`}
                  >
                    {statusLabel[row.status]}
                  </span>
                </div>
                <p className="mt-2 text-sm font-black text-slate-900">Package: {row.packageName}</p>
                <p className="mt-1 text-sm font-bold text-slate-600">
                  Customer: {row.phone} | {row.email}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {row.city}, {row.state} — {row.pincode}
                </p>
                <div className="mt-3 grid gap-2 text-xs font-bold text-slate-500 sm:grid-cols-2">
                  <p>Order ID: {row.id}</p>
                  <p>Created: {formatAdminDateTime(row.createdAt)}</p>
                  <p>Updated: {formatAdminDateTime(row.updatedAt)}</p>
                  <p>Razorpay Order: {row.razorpayOrderId || "Not created yet"}</p>
                  <p>Razorpay Payment: {row.razorpayPaymentId || "Not paid yet"}</p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 xl:min-w-52">
                <p className="text-xs font-black tracking-[0.12em] text-slate-500 uppercase">
                  Payment
                </p>
                <p className="mt-1 text-2xl font-black text-slate-950">
                  {formatAdminAmount(row.amountPaise, row.currency)}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  Status: {statusLabel[row.status]}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function SimpleList<T extends { id: string; message?: string; createdAt: string }>({
  rows,
  type,
  title,
  detail,
  onEdit,
  onDelete,
}: {
  rows: T[];
  type: "contact" | "demo";
  title: (row: T) => string;
  detail: (row: T) => string;
  onEdit: (type: "contact" | "demo", row: Record<string, unknown>) => void;
  onDelete: (type: "contact" | "demo", row: T) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="divide-y divide-slate-200">
        {rows.map((row) => (
          <section key={row.id} className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="break-words text-lg font-black">{title(row)}</h2>
                <p className="mt-1 break-words text-sm font-bold text-slate-600">{detail(row)}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  Submitted: {formatAdminDateTime(row.createdAt)}
                </p>
                {"message" in row && typeof row.message === "string" && row.message && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{row.message}</p>
                )}
                {"notes" in row && typeof row.notes === "string" && row.notes && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{row.notes}</p>
                )}
              </div>
              <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <button onClick={() => onEdit(type, row)} className="action border bg-white">
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => onDelete(type, row)}
                  className="action border bg-white text-red-700"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </section>
        ))}
        {rows.length === 0 && (
          <p className="p-8 text-center text-sm font-bold text-slate-500">No records found.</p>
        )}
      </div>
    </div>
  );
}

function BlogList({
  rows,
  onEdit,
  onDelete,
}: {
  rows: BlogPost[];
  onEdit: (row: Record<string, unknown>) => void;
  onDelete: (row: BlogPost) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-black">Website Blogs</h2>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          {rows.length} posts
        </span>
      </div>
      <div className="divide-y divide-slate-200">
        {rows.map((row) => (
          <section key={row.id} className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                    {row.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Publish: {row.publishDate || row.date}
                  </span>
                </div>
                <h3 className="mt-2 break-words text-lg font-black text-slate-950 sm:text-xl">
                  {row.title}
                </h3>
                <p className="mt-1 break-all text-sm font-bold text-slate-500">/{row.slug}</p>
                <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
                  {row.excerpt}
                </p>
                <p className="mt-2 text-xs font-bold text-slate-400">
                  SEO: {row.seoTitle || row.title}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-400">
                  Created: {formatAdminDateTime(row.createdAt)}
                </p>
              </div>
              <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <button onClick={() => onEdit(row)} className="action border bg-white">
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="action border bg-white text-red-700"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </section>
        ))}
        {rows.length === 0 && (
          <p className="p-8 text-center text-sm font-bold text-slate-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}

function EditModal({
  type,
  row,
  fieldClass,
  onClose,
  onSave,
}: {
  type: "vikas" | "contact" | "demo" | "blog";
  row: Record<string, unknown>;
  fieldClass: string;
  onClose: () => void;
  onSave: (id: string, data: Record<string, string>) => void;
}) {
  const [form, setForm] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.entries(row).map(([key, value]) => [key, String(value ?? "")])),
  );
  const fields =
    type === "vikas"
      ? [
          "name",
          "phone",
          "email",
          "district",
          "tehsil",
          "village",
          "occupation",
          "experience",
          "message",
          "photo",
          "panCard",
          "aadhaarCard",
        ]
      : type === "contact"
        ? ["name", "phone", "email", "post", "source", "city", "state", "message"]
        : type === "demo"
          ? [
              "name",
              "phone",
              "village",
              "district",
              "post",
              "source",
              "pageUrl",
              "utmSource",
              "utmMedium",
              "utmCampaign",
              "status",
              "notes",
            ]
          : [
              "title",
              "slug",
              "excerpt",
              "image",
              "imageAltText",
              "content",
              "seoTitle",
              "metaDescription",
              "publishDate",
            ];
  const longFields = [
    "message",
    "notes",
    "photo",
    "panCard",
    "aadhaarCard",
    "excerpt",
    "content",
    "metaDescription",
  ];
  const labels: Record<string, string> = {
    title: "Blog title",
    slug: "URL slug",
    excerpt: "Short description",
    image: "Upload image",
    imageAltText: "Image alt text",
    content: "Blog content",
    seoTitle: "SEO title",
    metaDescription: "Meta description",
    publishDate: "Publish date",
  };

  async function handleBlogImageUpload(file: File) {
    const dataUrl = await readFileAsDataUrl(file);
    setForm((current) => ({
      ...current,
      image: dataUrl,
      imageAltText: current["imageAltText"] || file.name.replace(/\.[^.]+$/, ""),
    }));
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/70 px-3 py-4 sm:px-4">
      <form
        acceptCharset="UTF-8"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(
            String(row["id"]),
            type === "blog" ? { ...form, date: form["publishDate"] ?? "" } : form,
          );
        }}
        className="max-h-[calc(100dvh-3rem)] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 shadow-2xl sm:p-5"
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-emerald-700 uppercase">
              Edit Record
            </p>
            <h2 className="text-2xl font-black">Edit {type}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-3 py-2 text-sm font-black"
          >
            Close
          </button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field} className={longFields.includes(field) ? "sm:col-span-2" : ""}>
              <span className="mb-1 block text-xs font-black uppercase text-slate-500">
                {labels[field] ?? field}
              </span>
              {type === "blog" && field === "image" ? (
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void handleBlogImageUpload(file);
                    }}
                    className={fieldClass}
                  />
                  {form[field] && (
                    <img
                      src={form[field]}
                      alt={form["imageAltText"] || "Blog image preview"}
                      className="h-36 w-full rounded-md border border-slate-200 object-cover"
                    />
                  )}
                  <input
                    value={form[field] ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, [field]: event.target.value }))
                    }
                    className={fieldClass}
                    placeholder="Image key, image URL, ya uploaded data URL"
                  />
                </div>
              ) : longFields.includes(field) ? (
                <textarea
                  value={form[field] ?? ""}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [field]: event.target.value }))
                  }
                  rows={field === "message" ? 5 : 3}
                  className={fieldClass}
                />
              ) : (
                <input
                  value={form[field] ?? ""}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [field]: event.target.value }))
                  }
                  className={fieldClass}
                />
              )}
            </label>
          ))}
        </div>
        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-black text-white">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </form>
    </div>
  );
}

function displayLeadCity(row: ContactLead) {
  return row.city || (row.post === "Website Popup Lead" ? row.state : "");
}

function formatAdminDateTime(value: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAdminAmount(paise: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function leadSourceLabel(row: ContactLead) {
  if (row.source) return row.source;
  if (row.post === "Website Popup Lead") return "Popup Form";
  if (row.post === "Package Query") return "Package Form";
  return "Contact Us Page";
}

function PreviewModal({ row, onClose }: { row: Vikas; onClose: () => void }) {
  const docs = [
    { label: "Profile Photo", src: row.photo },
    { label: "PAN Card", src: row.panCard },
    { label: "Aadhaar Card", src: row.aadhaarCard },
  ];

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/70 px-3 py-4 sm:px-4">
      <div className="max-h-[calc(100dvh-3rem)] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-4 shadow-2xl sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-emerald-700 uppercase">
              Application Preview
            </p>
            <h2 className="text-2xl font-black">{row.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-md border text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <PreviewField label="Unique ID" value={formatVikasMitraId(row.id, row.createdAt)} />
          <PreviewField label="Status" value={row.status} />
          <PreviewField label="Phone" value={row.phone} />
          <PreviewField label="Email" value={row.email || "-"} />
          <PreviewField label="District" value={row.district} />
          <PreviewField label="Tehsil / Block" value={row.tehsil} />
          <PreviewField label="Village / City" value={row.village} />
          <PreviewField label="Occupation" value={row.occupation || "-"} />
          <PreviewField label="Experience" value={row.experience || "-"} />
          <PreviewField label="Submitted" value={new Date(row.createdAt).toLocaleString()} />
        </div>

        {row.message && (
          <div className="mt-4">
            <p className="mb-1 text-xs font-black uppercase text-slate-500">Message</p>
            <p className="whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {row.message}
            </p>
          </div>
        )}
        {row.rejectionMessage && (
          <div className="mt-4">
            <p className="mb-1 text-xs font-black uppercase text-red-500">Reject Message</p>
            <p className="whitespace-pre-wrap rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
              {row.rejectionMessage}
            </p>
          </div>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {docs.map((doc) => (
            <div key={doc.label}>
              <p className="mb-1 text-xs font-black uppercase text-slate-500">{doc.label}</p>
              {doc.src ? (
                <a href={doc.src} target="_blank" rel="noreferrer" className="block">
                  <img
                    src={doc.src}
                    alt={doc.label}
                    className="h-44 w-full rounded-md border border-slate-200 bg-slate-50 object-contain"
                  />
                </a>
              ) : (
                <div className="grid h-44 w-full place-items-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-xs font-bold text-slate-400">
                  Not uploaded
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-black uppercase text-slate-500">{label}</p>
      <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold break-words text-slate-800">
        {value}
      </p>
    </div>
  );
}
