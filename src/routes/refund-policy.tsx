import { LegalDoc } from "@/components/site/LegalDoc";

const content = `
This Refund Policy applies to all services purchased through *Bharat Pahchan*.

Bharat Pahchan is a digital presence platform/project operated under *Citiline Technologies Private Limited*.

## 1. No Refund Policy

### All payments made to Bharat Pahchan are strictly non-refundable.

Once payment has been successfully made for any Bharat Pahchan service, the amount *will not be refunded under any circumstances*, except where a refund is mandatorily required under applicable law.

This policy applies whether or not the customer subsequently uses the service.

## 2. Digital Presence Services

Bharat Pahchan provides digital presence and related services, which may include:

* Digital profile creation
* Personal/public profile
* Website creation
* Digital branding
* Graphic design
* Video creation/editing
* Social media services
* Digital campaign support
* Content publishing
* Online promotion
* Other customized digital services

These services involve digital resources, development time, design work, content preparation and operational costs.

Therefore, once a payment has been made, it is considered a confirmed service order.

## 3. No Refund After Payment

Refunds will not be provided because of:

* Change of mind
* Change in personal circumstances
* Change in election plans
* Withdrawal from an election
* Not contesting an election
* Election date being changed
* Election being postponed or cancelled
* Not receiving expected public response
* Not receiving expected votes
* Not winning an election
* Not receiving political support
* Lower-than-expected website traffic
* Lower-than-expected social media engagement
* Customer's failure to provide content
* Customer's delay in providing required information
* Customer's failure to use the service

## 4. Election Result Disclaimer

Bharat Pahchan is *not an election-winning service*.

The purpose of Bharat Pahchan is to create and strengthen an individual's *digital presence and online identity*.

*Bharat Pahchan does not guarantee that a customer will win an election, receive a particular number of votes, gain political support, increase popularity or achieve any particular electoral result.*

Therefore, failure to achieve any election-related result shall *not constitute grounds for a refund*.

## 5. Customized Work

For customized digital services, work may begin after payment confirmation.

Once design, development, profile creation, content preparation, website setup, digital branding or any other service process has started, the payment shall remain non-refundable.

## 6. Third-Party Charges

Where third-party services, hosting, software, APIs, payment processing, advertising or other external services are purchased or activated for providing the customer's service, such costs are also non-refundable to the extent permitted by applicable law.

## 7. Duplicate Payment

In case of an accidental duplicate payment, the customer should contact us with the relevant transaction details.

Any resolution of a duplicate transaction will be handled after verification and subject to applicable law and payment-provider rules.

## 8. Failed Payment

If a payment is shown as failed but the amount has been deducted from the customer's bank account, the transaction will be verified.

Where the amount has not been successfully received by Bharat Pahchan, the customer may need to contact their bank/payment provider regarding the transaction.

## 9. Service Corrections

Although payments are non-refundable, if there is a genuine technical issue or an error attributable to Bharat Pahchan within the agreed service scope, we may, at our discretion, provide a correction or reasonable service resolution.

Such correction does not create a general right to a monetary refund.

## 10. Agreement to Refund Policy

By making a payment for Bharat Pahchan services, the customer confirms that they have read, understood and accepted this Refund Policy.

## 11. Contact

For payment-related queries, please contact us through the Contact Us page.

*Bharat Pahchan*
A Project of *Citiline Technologies Private Limited*
*News & Media Partner:* Channel009
*Jaipur, Rajasthan, India*

*All payments are non-refundable, except where a refund is required under applicable law.*
`;

export default function RefundPolicy() {
  return (
    <LegalDoc
      title="Refund Policy"
      summary="Payment and refund terms for all services purchased through Bharat Pahchan."
      lastUpdated="Last Updated: September 2026"
      content={content}
    />
  );
}
