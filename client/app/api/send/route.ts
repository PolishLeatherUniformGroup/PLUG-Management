import { EmailTemplate } from './email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(formData: FormData) {
  try {
    console.log(formData);
    const mail = {
        from: formData.get('from') as string,
        subject: formData.get('subject')as string,
        message: formData.get('message')as string,
        firstName: formData.get('firstName') as string | undefined
    };
    const data = await resend.emails.send({
      from: mail.from,
      to: ['board@plug.org.pl'],
      subject:mail.subject,
      text: mail.message,
      react: EmailTemplate({ firstName:mail.firstName,message:mail.message}),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
