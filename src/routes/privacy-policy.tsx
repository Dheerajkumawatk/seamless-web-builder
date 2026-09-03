import { LegalDoc } from "@/components/site/LegalDoc";

const content = `
Bharat Pahchan ("Bharat Pahchan", "we", "us", or "our") is a digital presence platform/project operated under *Citiline Technologies Private Limited*. *Channel009* is the News & Media Partner of Bharat Pahchan.

This Privacy Policy explains how we collect, use, store and protect information provided by users while accessing or using the Bharat Pahchan website and services.

By using our website or services, you agree to the practices described in this Privacy Policy.

## 1. Information We Collect

Depending on the services used, we may collect:

* Name
* Mobile number
* Email address
* Address and location information
* Village, Gram Panchayat, Ward or constituency-related information
* Profile photographs
* Videos and other media
* Professional or public profile information
* Social media details
* Website/profile content
* Documents or information provided for profile creation
* Payment and transaction information
* Communication and support details
* Technical information such as IP address, browser type, device information and website usage data

We collect information that is reasonably necessary to provide and manage our services.

## 2. How We Use Your Information

Information may be used to:

* Create your digital profile
* Create and maintain your digital presence
* Develop or manage your website/profile
* Publish information provided by you
* Create digital branding material
* Provide social media and digital services
* Communicate regarding your services
* Process payments and service requests
* Provide customer support
* Improve our website and services
* Maintain website security
* Comply with applicable legal requirements

## 3. Digital Profile Information

Information submitted by you for creating your Bharat Pahchan digital profile may be displayed publicly as part of your digital presence.

You are responsible for ensuring that the information, photographs, videos, achievements, statements and other content provided by you is accurate and lawful.

## 4. Photos, Videos and Other Content

If you provide photographs, videos, logos, documents or other material, you confirm that you have the necessary rights or permission to provide and use such material.

We may use such material for providing the services requested by you.

## 5. Payment Information

Payments may be processed through third-party payment gateways.

We do not intentionally store sensitive payment credentials such as UPI PINs, banking passwords, debit card PINs or credit card PINs.

Payment processors may collect and process payment information according to their own policies.

## 6. Sharing of Information

We do not sell or rent your personal information.

Information may be shared with trusted service providers, technology providers, hosting providers, payment processors or other service partners where necessary to provide our services.

Information may also be disclosed where required by law, court order, government authority or other lawful process.

## 7. Cookies

The website may use cookies and similar technologies to improve functionality, security, performance and user experience.

You may manage cookies through your browser settings.

## 8. Data Security

We take reasonable measures to protect information against unauthorized access, misuse, alteration or disclosure.

However, no internet-based system can be guaranteed to be completely secure.

## 9. Third-Party Links

Our website may contain links to third-party websites, social media platforms or services.

We are not responsible for the privacy practices, security or content of those third-party services.

## 10. Data Retention

We may retain information for as long as reasonably necessary to provide services, maintain business records, resolve disputes, comply with legal obligations and protect our legitimate interests.

## 11. User Requests

Subject to applicable law, users may contact us to request correction or updating of their personal information.

Where legally permissible, users may also request deletion of information, subject to contractual, legal and operational requirements.

## 12. No Guarantee of Election Results

Bharat Pahchan provides a *digital presence service only*.

The information and digital profile created through Bharat Pahchan are intended to help an individual establish and maintain an online presence.

*Bharat Pahchan does not guarantee, promise or claim that its website, digital profile, branding, social media services or any other service will result in winning an election, receiving votes, obtaining political support or achieving any particular election result.*

## 13. Changes to Privacy Policy

We may update this Privacy Policy from time to time. Changes will be published on this page with an updated date.

## 14. Contact

For privacy-related queries, please contact us through the Contact Us page.

*Bharat Pahchan*
A Project of *Citiline Technologies Private Limited*
*News & Media Partner:* Channel009
*Jaipur, Rajasthan, India*
`;

export default function PrivacyPolicy() {
  return (
    <LegalDoc
      title="Privacy Policy"
      summary="How Bharat Pahchan collects, uses, stores and protects the information you provide."
      lastUpdated="Last Updated: September 2026"
      content={content}
    />
  );
}
