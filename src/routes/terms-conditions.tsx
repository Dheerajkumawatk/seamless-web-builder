import { LegalDoc } from "@/components/site/LegalDoc";

const content = `
Welcome to *Bharat Pahchan*.

These Terms & Conditions govern your use of the Bharat Pahchan website and services.

Bharat Pahchan is a digital presence platform/project operated under *Citiline Technologies Private Limited*.

By accessing or using Bharat Pahchan, you agree to these Terms & Conditions.

## 1. Nature of Bharat Pahchan

Bharat Pahchan is a *digital presence platform*.

The platform is intended to help users create and maintain an online identity through services such as:

* Digital profiles
* Personal/public websites
* Digital branding
* Social media presence
* Graphics
* Videos
* Digital content
* Online promotion
* Other digital services

### Bharat Pahchan is NOT an election-winning service.

The platform only provides digital presence and related services.

## 2. No Election Guarantee

Bharat Pahchan does not guarantee:

* Election victory
* Votes
* Political support
* Public popularity
* Voter response
* Campaign success
* Social media engagement
* Any specific electoral result

The customer understands and accepts that digital presence does not automatically result in election victory.

## 3. User Responsibility

Users must provide correct and complete information.

Users must not submit:

* False information
* Fake documents
* Misleading claims
* Unauthorized photographs
* Copyright-infringing content
* Illegal content
* Content intended to deceive or defraud others

## 4. Client-Provided Content

The customer is responsible for all information and material supplied to Bharat Pahchan.

This includes:

* Photographs
* Videos
* Names
* Designations
* Achievements
* Biographical information
* Political statements
* Campaign messages
* Logos
* Documents
* Social media information

The customer confirms that they have the necessary rights and permissions to use such material.

## 5. Election & Political Use

Customers using Bharat Pahchan for election-related activities are responsible for complying with applicable election laws, advertising regulations, Election Commission directions and other legal requirements.

Bharat Pahchan does not provide legal or electoral compliance certification unless expressly agreed in writing.

## 6. Payments

Customers must pay the applicable charges for the selected service or package.

Service activation or work commencement may be subject to successful payment.

## 7. No Refund

All payments made for Bharat Pahchan services are *non-refundable*, except where a refund is mandatorily required under applicable law.

By making a payment, the customer acknowledges and accepts the Refund Policy.

## 8. Customized Services

Customized services may involve design, development, content preparation, profile creation and other work.

Once such work begins, cancellation will not create any right to a refund.

## 9. Intellectual Property

Bharat Pahchan's original website design, platform elements, branding, graphics, text and proprietary materials may be protected by intellectual property laws.

Customers may not copy, reproduce, distribute or commercially exploit such material without permission.

Customer-owned content remains subject to the customer's applicable ownership rights.

## 10. Prohibited Use

Users must not use Bharat Pahchan for:

* Fraud
* Impersonation
* Illegal activities
* Harassment
* Defamation
* Hate speech
* Copyright infringement
* Misleading representation
* Distribution of malicious software
* Any activity prohibited by applicable law

We may suspend or terminate services if misuse is identified.

## 11. Website Availability

We attempt to keep Bharat Pahchan available and functional.

Temporary interruptions may occur due to maintenance, technical problems, hosting issues, internet failures, third-party services or circumstances outside our reasonable control.

## 12. Third-Party Platforms

Some services may depend on third-party platforms, including social media networks, hosting providers, APIs, payment gateways and other external services.

Their availability and functionality are outside our complete control.

## 13. Suspension or Termination

We may suspend or terminate a user's service where:

* These Terms are violated
* Fraudulent or illegal activity is suspected
* False information is provided
* Required payments are not made
* Services are misused
* Legal or compliance requirements are not met

## 14. Privacy

Use of Bharat Pahchan is also subject to our Privacy Policy.

## 15. Disclaimer Acceptance

By using Bharat Pahchan, the customer acknowledges that:

*Bharat Pahchan creates digital presence; it does not guarantee election victory.*

The customer accepts that election results and public response are outside Bharat Pahchan's control.

## 16. Changes to Terms

We reserve the right to update these Terms & Conditions from time to time.

Updated terms will be published on this page.

## 17. Governing Law

These Terms & Conditions shall be governed by the applicable laws of India.

Any dispute shall be subject to the jurisdiction of the competent courts having applicable jurisdiction.

## 18. Contact

For questions regarding these Terms & Conditions, please contact Bharat Pahchan through the Contact Us page.

*Bharat Pahchan*
A Project of *Citiline Technologies Private Limited*
*News & Media Partner:* Channel009
*Jaipur, Rajasthan, India*
`;

export default function TermsConditions() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      summary="The terms that govern your use of the Bharat Pahchan website and services."
      lastUpdated="Last Updated: September 2026"
      content={content}
    />
  );
}
