import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "info@mettali.com";
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const formData = await req.formData();

  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const company = String(formData.get("company") || "");
  const requestType = String(formData.get("requestType") || "");
  const pieceName = String(formData.get("pieceName") || "");
  const productLink = String(formData.get("productLink") || "");
  const customizations = String(formData.get("customizations") || "");
  const requirements = String(formData.get("requirements") || "");

  if (!fullName || !email || !requirements) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  for (const [key, value] of formData.entries()) {
    if (key === "files" && value instanceof File) {
      if (value.size > MAX_ATTACHMENT_BYTES) continue;
      const buf = Buffer.from(await value.arrayBuffer());
      attachments.push({ filename: value.name, content: buf });
    }
  }

  const isBespoke = requestType === "bespoke";

  const rows = [
    ["Request Type", isBespoke ? "Bespoke / New Design Request" : "Customize an Existing Piece"],
    ["Full Name", fullName],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Company", company || "—"],
    ...(isBespoke
      ? []
      : [
          ["Piece to Customize", pieceName || "—"],
          ["Product Link", productLink || "—"],
          ["Requested Changes", customizations || "—"],
        ]),
    ["Requirements", requirements],
  ];

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #222;">
      <h2 style="margin-bottom: 16px;">New Customisation Request</h2>
      <table cellpadding="8" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight: 600; vertical-align: top; white-space: nowrap;">${label}</td>
            <td style="white-space: pre-wrap;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      ${attachments.length ? `<p style="margin-top:16px;">${attachments.length} file(s) attached.</p>` : ""}
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "Mettali Website <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `${isBespoke ? "Bespoke Request" : "Customisation Request"} — ${fullName}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Send failed" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
