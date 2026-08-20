import type { Metadata } from "next";

import { TextLink } from "@/components/TextLink";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="not-found page-main page-shell">
      <div>
        <h1>404</h1>
        <p>The space you are looking for is no longer here.</p>
        <TextLink href="/">Return home</TextLink>
      </div>
    </main>
  );
}
