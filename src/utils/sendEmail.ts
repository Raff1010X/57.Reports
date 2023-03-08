import nodemailer from 'nodemailer';
import { TMailSubject } from '@/types/email';

function createTransporter() {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "671d929e58b445",
          pass: "a16a94a65469af"
        }
    });

    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         type: 'OAuth2',
    //         user: process.env.EMAIL_USER,
    //         clientId: process.env.EMAIL_clientId,
    //         clientSecret: process.env.EMAIL_clientSecret,
    //         refreshToken: process.env.EMAIL_refreshToken,
    //         accessToken: process.env.EMAIL_accessToken,
    //     },
    // });
    return transporter;
}

export default async function sendEmail(
    to: string,
    subject: TMailSubject,
    activator?: string,
    project?: string
) {
    let mailOptions = {};
    if (subject === 'activateAccount')
        mailOptions = sendActivationEmail(to, activator!);
    if (subject === 'welcome') mailOptions = sendWelcomeEmail(to);
    if (subject === 'changePassword')
        mailOptions = sendChangePasswordEmail(to, project!, activator!);
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.response);
    if (info) return true;
    return false;
}

function sendActivationEmail(to: string, activator: string) {
    return {
        from: 'reports@test.com',
        to,
        subject: 'PDF Reports - Your account activation link',
        text: `Hi there,
Thank you for registering with our service. Your account will be activated when you click the link below:
${activator}
We look forward to providing you with a great experience and hope that you enjoy using our services.
Thanks again for signing up!
Regards,
PDF Report Team`,
    };
}
// TODO: create route to activate account

function sendWelcomeEmail(to: string) {
    return {
        from: 'reports@test.com',
        to,
        subject: 'PDF Reports - Your account has been activated',
        text: `Congratulations! 
Your account has been successfully activated. 
You can now log into your account and start using it. 
Thank you for using our service.`,
    };
}

function sendChangePasswordEmail(
    to: string,
    project: string,
    activator: string
) {
    return {
        from: 'reports@test.com',
        to,
        subject: 'PDF Reports - Your account new password',
        text: `Hi there,
Your project name is: ${project}
You can change Your password by clicking the link below:
${activator}
We look forward to providing you with a great experience and hope that you enjoy using our services.
Regards,
PDF Report Team`,
    };
}

// TODO: create route to change password
