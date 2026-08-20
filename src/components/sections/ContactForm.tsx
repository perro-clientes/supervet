"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { ContactForm as ContactFormType } from "@/lib/types";

type FieldKey = "name" | "email" | "phone" | "message";
type Status = "idle" | "loading" | "success" | "error";

const fieldTypes: Record<Exclude<FieldKey, "message">, string> = {
  name: "text",
  email: "email",
  phone: "tel",
};

export function ContactForm({ form }: { form?: ContactFormType | null }) {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const labels: Record<FieldKey, string> = {
    name: form?.nameLabel || "Nombre",
    email: form?.emailLabel || "Email",
    phone: form?.phoneLabel || "Teléfono",
    message: form?.messageLabel || "Mensaje",
  };

  const setValue = (key: FieldKey) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Ocurrió un error al enviar el mensaje.");
        return;
      }

      setStatus("success");
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo conectar con el servidor.");
    }
  };

  const inputClass =
    "w-full rounded-full border border-black bg-white px-4 py-3 text-ink placeholder:text-muted/60 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5">
        {(["name", "email", "phone"] as Exclude<FieldKey, "message">[]).map(
          (key) => (
            <label key={key} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-ink">
                {labels[key]}
              </span>
              <input
                type={fieldTypes[key]}
                name={key}
                value={values[key]}
                onChange={(event) => setValue(key)(event.target.value)}
                disabled={status === "loading"}
                className={inputClass}
              />
            </label>
          ),
        )}
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-ink">
          {labels.message}
        </span>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => setValue("message")(event.target.value)}
          disabled={status === "loading"}
          className={`${inputClass} resize-none rounded-xl`}
        />
      </label>

      {status === "success" && (
        <p className="text-sm font-medium text-secondary">
          Mensaje enviado correctamente.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="self-start px-10"
      >
        {status === "loading"
          ? "Enviando..."
          : form?.submitLabel || "Enviar mensaje"}
      </Button>
    </form>
  );
}
