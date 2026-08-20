import type { Metadata } from "next";

import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing the Koncept Werk website and service enquiries.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="legal-page page-main page-shell">
      <header className="legal-page__header">
        <h1>Terms of Service</h1>
        <p>{site.legalName} (trading as Konceptwerk.com)</p>
        <p>Effective date: 10 October 2025</p>
      </header>

      <div className="legal-content section-pad">
        <p>
          Welcome to Konceptwerk.com, operated by FJ & Joseph Pte Ltd. By accessing or using our website and
          services, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.
        </p>

        <section>
          <h2>1. Scope of Services</h2>
          <ul>
            <li>Konceptwerk.com provides interior design consultancy, project management, renovation, and construction services.</li>
            <li>Website information is for general guidance and may be updated without prior notice.</li>
          </ul>
        </section>

        <section>
          <h2>2. Use of Website</h2>
          <ul>
            <li>You agree to use the website lawfully and not for fraudulent, unlawful, or harmful purposes.</li>
            <li>We may suspend or restrict access for maintenance, upgrades, or misuse.</li>
          </ul>
        </section>

        <section>
          <h2>3. Quotations and Agreements</h2>
          <ul>
            <li>An enquiry does not create a binding contract until a formal quotation, proposal, or agreement is signed by both parties.</li>
            <li>Prices, timelines, and scope are specified in the signed agreement for each project.</li>
            <li>Services are subject to availability and may vary with site conditions and approvals.</li>
          </ul>
        </section>

        <section>
          <h2>4. Payments</h2>
          <ul>
            <li>Deposits and milestone payments must follow the agreed project schedule.</li>
            <li>The Company may suspend or stop work for late or non-payment.</li>
            <li>Fees exclude government taxes unless stated otherwise.</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <ul>
            <li>Design concepts, drawings, renderings, and project materials remain the intellectual property of FJ & Joseph Pte Ltd unless agreed otherwise in writing.</li>
            <li>Clients receive a limited licence to use deliverables solely for the contracted project.</li>
          </ul>
        </section>

        <section>
          <h2>6. Warranties and Limitations</h2>
          <ul>
            <li>Workmanship is covered under warranty for 12 months from project completion unless the contract specifies otherwise.</li>
            <li>Manufacturer warranties apply where available.</li>
            <li>The Company is not liable for indirect, incidental, or consequential damages, or defects caused by misuse, alteration, or work by unengaged third parties.</li>
          </ul>
        </section>

        <section>
          <h2>7. Third-Party Links and Content</h2>
          <p>We are not responsible for external-site content, practices, or privacy policies. Reliance on third-party information is at your own risk.</p>
        </section>

        <section>
          <h2>8. Privacy Protection</h2>
          <p>Personal data is collected, used, and protected in accordance with our Privacy Policy.</p>
        </section>

        <section>
          <h2>9. Termination of Services</h2>
          <ul>
            <li>We may decline or terminate services if a client breaches these terms, fails to pay, or engages in unlawful conduct.</li>
            <li>On termination, the client remains liable for completed work, purchased materials, and applicable cancellation charges.</li>
          </ul>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>These terms are governed by Singapore law. Disputes are subject to the exclusive jurisdiction of the Singapore courts.</p>
        </section>

        <section>
          <h2>11. Updates to Terms</h2>
          <p>We may update these terms at any time. Continued website or service use after changes are posted constitutes acceptance.</p>
        </section>
      </div>
    </main>
  );
}
