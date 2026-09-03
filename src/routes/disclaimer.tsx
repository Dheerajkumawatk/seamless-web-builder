import { LegalDoc } from "@/components/site/LegalDoc";

const content = `
Bharat Pahchan is an independent digital presence platform/project operated under *Citiline Technologies Private Limited*.

*Channel009* is the News & Media Partner of Bharat Pahchan.

## 1. Digital Presence Platform Only

Bharat Pahchan is designed to provide individuals, public representatives, candidates and other users with a professional *digital presence and online identity*.

Our services may include digital profiles, websites, digital branding, social media services, graphics, videos, content and other online services.

### Bharat Pahchan does NOT guarantee election victory.

The purpose of Bharat Pahchan is to create and improve your *digital presence*. It is not an election-winning service and does not promise votes, political support, public popularity or any particular electoral outcome.

## 2. No Election Guarantee

Bharat Pahchan does not guarantee or promise:

* Election victory
* Votes or vote share
* Political support
* Public popularity
* Voter response
* Campaign success
* Social media reach or engagement
* Any specific electoral or public result

Election results and public response depend on many factors that are outside Bharat Pahchan's control.

## 3. Information Provided by Users

All names, photographs, videos, designations, achievements, biographical details, statements, campaign messages, logos and documents are provided by the customer.

Bharat Pahchan publishes this material on an "as-provided" basis and does not independently verify its accuracy.

The customer is solely responsible for the correctness, legality and ownership of the content they provide.

## 4. No Professional Advice

Nothing on Bharat Pahchan constitutes legal, electoral, financial or professional advice.

Customers should obtain independent professional advice for election law, advertising regulations and compliance matters.

## 5. Election Laws and Compliance

Customers using Bharat Pahchan for election-related purposes are responsible for complying with the Model Code of Conduct, Election Commission directions, advertising rules and all other applicable laws.

Bharat Pahchan does not provide electoral compliance certification unless expressly agreed in writing.

## 6. Third-Party Platforms and Services

Some services rely on third-party platforms such as social media networks, hosting providers, APIs and payment gateways.

Their performance, availability and policies are outside Bharat Pahchan's control.

## 7. Website Availability

We make reasonable efforts to keep the website and services available, but we do not guarantee uninterrupted or error-free operation.

## 8. External Links

The website may contain links to external sites. Bharat Pahchan is not responsible for the content, security or practices of any third-party site.

## 9. Limitation of Liability

To the maximum extent permitted by law, Bharat Pahchan and Citiline Technologies Private Limited shall not be liable for any indirect, incidental or consequential loss, loss of votes, loss of election, loss of reputation or loss of opportunity arising from use of the platform.

## 10. Intellectual Property

The original design, branding and proprietary materials of Bharat Pahchan are protected and may not be copied or reused without permission. Customer-owned content remains the property of the customer.

## 11. Changes to this Disclaimer

Bharat Pahchan may update this Disclaimer from time to time. The updated version will be published on this page.

## 12. Governing Law

This Disclaimer is governed by the applicable laws of India, and any dispute is subject to the jurisdiction of the competent courts having applicable jurisdiction.

## 13. Contact

For any questions about this Disclaimer, please contact Bharat Pahchan through the Contact Us page.

*Bharat Pahchan*
A Project of *Citiline Technologies Private Limited*
*News & Media Partner:* Channel009
*Jaipur, Rajasthan, India*

*Bharat Pahchan creates digital presence; it does not guarantee election victory.*
`;

export default function Disclaimer() {
  return (
    <LegalDoc
      title="Disclaimer"
      summary="Bharat Pahchan provides digital presence services only and does not guarantee election results."
      lastUpdated="Last Updated: September 2026"
      content={content}
    />
  );
}
