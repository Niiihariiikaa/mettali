import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "info@mettali.com";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const formData = await req.formData();

  const inquiryType = String(formData.get("inquiryType") || "");
  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const company = String(formData.get("company") || "");
  const quantity = String(formData.get("quantity") || "");
  const requirements = String(formData.get("requirements") || "");

  if (!fullName || !email || !requirements) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const isGifting = inquiryType === "gifting";

  const rows = [
    ["Inquiry Type", isGifting ? "Corporate Gifting" : "Bulk Order"],
    ["Full Name", fullName],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Company", company || "—"],
    ["Approx. Quantity", quantity || "—"],
    ["Requirements", requirements],
  ];

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #222;">
      <h2 style="margin-bottom: 16px;">New Bulk Order / Gifting Inquiry</h2>
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
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "Mettali Website <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `${isGifting ? "Corporate Gifting" : "Bulk Order"} Inquiry — ${fullName}`,
      html,
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
