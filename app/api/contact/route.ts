import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    console.log("Contact form submission received:", {
      name,
      email,
      subject,
      message,
    });

    // Option 1: Send to Discord webhook if configured
    const discordWebhook = process.env.CONTACT_DISCORD_WEBHOOK_URL;
    if (discordWebhook) {
      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: `New Contact Form Submission: ${subject}`,
              color: 3447003, // Blue
              fields: [
                { name: "Name", value: name, inline: true },
                { name: "Email", value: email, inline: true },
                { name: "Message", value: message },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    // Option 2: Send email using Resend if configured
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "techwithkesava@gmail.com";
    if (resendKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: toEmail,
          subject: `[Contact Form] ${subject}`,
          html: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Subject:</strong> ${subject}</p>
                 <p><strong>Message:</strong></p>
                 <p>${message.replace(/\n/g, "<br/>")}</p>`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Resend API error:", errorData);
      }
    }

    return NextResponse.json(
      { message: "Your message has been received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
