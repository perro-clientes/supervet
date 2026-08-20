import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Nombre, email y mensaje son obligatorios." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta la variable RESEND_API_KEY." },
      { status: 500 },
    );
  }

  if (!toEmail) {
    return NextResponse.json(
      { error: "Falta la variable RESEND_TO_EMAIL." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Supervet <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `Consulta de ${name} — Supervet`,
    html: `
      <h2>Nuevo mensaje desde el formulario de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
