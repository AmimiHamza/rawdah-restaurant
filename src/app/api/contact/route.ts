import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'hamza.amimi.p@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Rawdah Contact <onboarding@resend.dev>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Rawdah] New inquiry: ${service}`,
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #121212; color: #F8F8F8; padding: 40px 32px; border: 1px solid rgba(212,175,55,0.3);">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-family: Georgia, serif; font-size: 28px; color: #D4AF37; letter-spacing: 0.1em; margin: 0;">RAWDAH</h1>
            <p style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(248,248,248,0.5); margin-top: 4px;">New Contact Inquiry</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 16px; border: 1px solid rgba(212,175,55,0.15); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(212,175,55,0.7); width: 30%;">Name</td>
              <td style="padding: 12px 16px; border: 1px solid rgba(212,175,55,0.15); font-size: 14px; color: #F8F8F8;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border: 1px solid rgba(212,175,55,0.15); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(212,175,55,0.7);">Email</td>
              <td style="padding: 12px 16px; border: 1px solid rgba(212,175,55,0.15); font-size: 14px; color: #F8F8F8;"><a href="mailto:${email}" style="color: #D4AF37;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border: 1px solid rgba(212,175,55,0.15); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(212,175,55,0.7);">Service</td>
              <td style="padding: 12px 16px; border: 1px solid rgba(212,175,55,0.15); font-size: 14px; color: #D4AF37; font-weight: 600;">${service}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.15);">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(212,175,55,0.7); margin: 0 0 10px;">Message</p>
            <p style="font-size: 14px; color: rgba(248,248,248,0.8); line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="text-align: center; font-size: 10px; color: rgba(248,248,248,0.25); margin-top: 32px; letter-spacing: 0.1em;">
            Rawdah Restaurant · King Fahd Road, Riyadh
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
