"use client";

import { FormEvent, useState } from "react";

import { ArrowIcon } from "@/components/ArrowIcon";
import { site } from "@/lib/site-data";

export function CareerForm() {
  const [message, setMessage] = useState(
    "Submitting asks your email app to open. Add the selected CV before sending.",
  );
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setError(true);
      setMessage("Please complete the required fields.");
      return;
    }

    const data = new FormData(form);
    const file = data.get("resume");
    if (file instanceof File && file.size > 10 * 1024 * 1024) {
      setError(true);
      setMessage("Please choose a CV smaller than 10 MB.");
      return;
    }

    const name = String(data.get("name") ?? "");
    const body = [
      `Name: ${name}`,
      `Contact number: ${String(data.get("contact") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      "",
      "Please attach the selected CV and cover letter before sending.",
    ].join("\n");

    setError(false);
    setMessage(
      `Email handoff requested. If your email app did not open, email ${site.email} directly and attach your CV and cover letter.`,
    );
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Career expression of interest - ${name}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="editorial-form career-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row form-row--two">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Contact number</span>
          <input name="contact" type="tel" autoComplete="tel" required />
        </label>
      </div>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="file-field">
        <span>Resume and cover letter</span>
        <input name="resume" type="file" accept=".pdf,.doc,.docx" required />
        <small>PDF, DOC or DOCX, up to 10 MB. The file stays on your device until you attach it in your email app.</small>
      </label>
      <button className="form-submit" type="submit">
        <span>Prepare application</span>
        <ArrowIcon />
      </button>
      <p className={`form-status ${error ? "is-error" : ""}`} aria-live="polite">{message}</p>
    </form>
  );
}
