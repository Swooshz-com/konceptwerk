"use client";

import { FormEvent, useState } from "react";

import { ArrowIcon } from "@/components/ArrowIcon";
import { site } from "@/lib/site-data";

type FormStatus = "idle" | "preparing" | "handoff" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setStatus("error");
      return;
    }

    setStatus("preparing");
    const data = new FormData(form);
    const type = String(data.get("projectType") ?? "Project");
    const body = [
      `Name: ${String(data.get("name") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Project type: ${type}`,
      "",
      "Project details:",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.setTimeout(() => {
      try {
        setStatus("handoff");
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry - ${type}`)}&body=${encodeURIComponent(body)}`;
      } catch {
        setStatus("error");
      }
    }, 220);
  }

  return (
    <form className="editorial-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row form-row--two">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="form-row form-row--two">
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          <span>Project type</span>
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label>
        <span>Tell us about your space</span>
        <textarea name="message" rows={5} required />
      </label>
      <button className="form-submit" type="submit" disabled={status === "preparing"}>
        <span>{status === "preparing" ? "Preparing enquiry" : "Prepare enquiry"}</span>
        <ArrowIcon />
      </button>
      <p className={`form-status ${status === "error" ? "is-error" : ""}`} aria-live="polite">
        {status === "handoff"
          ? `Email handoff requested. If your email app did not open, email us directly at ${site.email}.`
          : status === "error"
            ? `Please complete the required fields, or email us directly at ${site.email}.`
            : "Submitting asks your email app to open. No information is stored by this website."}
      </p>
    </form>
  );
}
