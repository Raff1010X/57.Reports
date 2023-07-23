import nodemailer, { SentMessageInfo, TransportOptions } from 'nodemailer';

type TMailSubject = 'activateAccount' | 'welcome' | 'changePassword' | 'changePasswordConfirm';

function createTransporter() {
    // const transporter = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "6f25ca3ea05729",
    //       pass: "b5ecc4e813c0a9"
    //     }
    // });

    const transporter = nodemailer.createTransport({
        host: process.env.email_host,
        port: process.env.email_port,
        secure: true, // true for 465, false for 25 or other ports
        auth: {
            user: process.env.email_user,
            pass: process.env.email_pass,
        },
        tls: {
            rejectUnauthorized: false, // do not fail on invalid certs
        },
    } as TransportOptions);

    return transporter;
}

export default async function sendEmail(
    to: string,
    subject: TMailSubject,
    activator?: string,
    project?: string,
    password?: string,
) {
    let mailOptions = {};
    if (subject === 'activateAccount')
        mailOptions = sendActivationEmail(to, activator!);

    if (subject === 'welcome') mailOptions = sendWelcomeEmail(to);

    if (subject === 'changePassword')
        mailOptions = sendChangePasswordEmail(to, project!, activator!, password!);

    if (subject === 'changePasswordConfirm')
        mailOptions = sendChangePasswordConfirm(to);
    
    const transporter = createTransporter();
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    if (process.env.NODE_ENV === 'development')
        console.log('Message sent: %s', info.response as string);
    if (info) return true;
    return false;
}

function sendActivationEmail(to: string, activator: string) {
    return {
        from: 'webdev@webdev.smallhost.pl',
        to,
        subject: 'PDF Reports - Your account activation link',
        text: `Hi there,
Thank you for registering with our service. Your account will be activated when you copy and paste this link into a browser address bar:
${process.env.NEXTAUTH_URL}/auth/activate_account/${activator}
We look forward to providing you with a great experience and hope that you enjoy using our services.
Thanks again for signing up!
Regards,
PDF Report Team`,
        html: `<h1>Hi there,</h1>
        <p>Thank you for registering with our service. Your account will be activated when You click the link below:</p>
        <a href="${process.env.NEXTAUTH_URL}/auth/activate_account/${activator}" target="_blank">Link to activate your account</a>
        <p>We look forward to providing you with a great experience and hope that you enjoy using our services.</p>
        <p>Thanks again for signing up!</p>
        <p>Regards,</p>
        <p>PDF Report Team</p>`,
    };
}

function sendWelcomeEmail(to: string) {
    return {
        from: 'webdev@webdev.smallhost.pl',
        to,
        subject: 'PDF Reports - Your account has been activated',
        text: `Congratulations! 
Your account has been successfully activated. 
You can now log into your account and start using it. 
Thank you for using our service.`,
        html: `<h1>Congratulations!</h1> 
        <p>Your account has been successfully activated. </p>
        <p>You can now log into your account and start using it.</p> 
        <p>Thank you for using our service.</p>`,
    };
}


function sendChangePasswordEmail(
    to: string,
    project: string,
    activator: string,
    password: string,
) {
    return {
        from: 'webdev@webdev.smallhost.pl',
        to,
        subject: 'PDF Reports - Your account new password',
        text: `Hi there,
Your project(s): ${project}
You can change your password when You copy and paste this link into a browser address bar:
${process.env.NEXTAUTH_URL}/auth/change_password/${activator}/${password}
Regards,
PDF Report Team`,
        html: `<h1>Hi there,</h1>
        <p>Your project(s): ${project}</p>
        <p>You can change your password by clicking the link below:</p>
        <a href="${process.env.NEXTAUTH_URL}/auth/change_password/${activator}/${password}" target="_blank">Link to activate your new password</a>
        <p>Regards,</p>
        <p>PDF Report Team</p>`,
    };
}


function sendChangePasswordConfirm(
    to: string,
) {
    return {
        from: 'webdev@webdev.smallhost.pl',
        to,
        subject: 'PDF Reports - Your account new password',
        text: `Hi there,
Your password was changed.
Regards,
PDF Report Team`,
        html: `<h1>Hi there,</h1>
        <p>Your password was changed.</p>
        <p>Regards,</p>
        <p>PDF Report Team</p>`,
    };
}
