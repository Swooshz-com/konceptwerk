import type { Metadata } from "next";

import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Koncept Werk privacy policy and personal-data practices.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page page-main page-shell">
      <header className="legal-page__header">
        <h1>Privacy Policy</h1>
        <p>{site.legalName} (trading as Konceptwerk.com)</p>
        <p>Effective date: 10 October 2025</p>
      </header>

      <div className="legal-content section-pad">
        <p>
          At Konceptwerk.com, operated by FJ & Joseph Pte Ltd, we value and respect your privacy. This Privacy
          Policy explains how we collect, use, disclose, and protect your personal data in compliance with the
          Singapore Personal Data Protection Act (PDPA) and applicable regulations.
        </p>

        <section>
          <h2>1. Collection of Personal Data</h2>
          <p>We may collect personal data from you when you:</p>
          <ul>
            <li>Submit an enquiry via our website, email, or phone.</li>
            <li>Engage our interior design or construction services.</li>
            <li>Subscribe to our newsletter or marketing updates.</li>
            <li>Provide feedback or communicate with us.</li>
          </ul>
          <p>Examples include your name, contact number, email and postal address, project or site information, and billing and payment information.</p>
        </section>

        <section>
          <h2>2. Use of Personal Data</h2>
          <p>We may use your personal data to:</p>
          <ul>
            <li>Respond to enquiries and service requests.</li>
            <li>Prepare quotations, proposals, and project agreements.</li>
            <li>Deliver design and construction services.</li>
            <li>Process payments and accounting.</li>
            <li>Comply with legal and regulatory obligations.</li>
            <li>Send marketing, promotional, or service-related communications only with your consent.</li>
          </ul>
        </section>

        <section>
          <h2>3. Disclosure of Personal Data</h2>
          <p>We will not sell, rent, or trade your personal data to third parties. We may disclose data to:</p>
          <ul>
            <li>Employees, subcontractors, and suppliers for project execution.</li>
            <li>Service providers such as IT support, payment processors, and cloud storage providers.</li>
            <li>Government agencies or regulators where required by law.</li>
          </ul>
          <p>Third parties handling personal data on our behalf are required to safeguard it in line with this policy.</p>
        </section>

        <section>
          <h2>4. Protection of Personal Data</h2>
          <p>
            We implement reasonable security measures against unauthorized access, disclosure, alteration, or
            destruction. No method of transmission over the internet or electronic storage is completely secure.
          </p>
        </section>

        <section>
          <h2>5. Retention of Personal Data</h2>
          <p>
            We retain personal data for as long as necessary for the purpose for which it was collected or as
            required by law. When no longer needed, it will be securely deleted or anonymised.
          </p>
        </section>

        <section>
          <h2>6. Cookies and Website Tracking</h2>
          <p>
            The website may use cookies and analytics tools to improve experience and understand traffic. You may
            disable cookies in your browser settings, although this may affect some website functions.
          </p>
        </section>

        <section>
          <h2>7. Access, Correction and Withdrawal of Consent</h2>
          <p>You may request access to your personal data, request corrections, or withdraw consent for its use or disclosure.</p>
          <p>Withdrawing consent may affect our ability to provide services.</p>
        </section>

        <section>
          <h2>8. Third-Party Websites</h2>
          <p>
            The website may link to external websites. We are not responsible for their privacy practices and
            encourage you to read their policies.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>Questions about this policy or personal-data management can be directed to:</p>
          <p>
            {site.legalName} (Konceptwerk.com)<br />
            Email: <a href={`mailto:${site.email}`}>{site.email}</a><br />
            Phone: <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a><br />
            Address: {site.address}
          </p>
        </section>

        <section>
          <h2>10. Updates to this Privacy Policy</h2>
          <p>We may update this policy from time to time. Changes will be posted on this page with the updated effective date.</p>
        </section>
      </div>
    </main>
  );
}
