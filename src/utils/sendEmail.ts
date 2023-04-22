import nodemailer from 'nodemailer';

type TMailSubject = 'activateAccount' | 'welcome' | 'changePassword';

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
        host: 'mail0.small.pl',
        port: 465,
        secure: true, // true for 465, false for 25 or other ports
        auth: {
            user: 'webdev@webdev.smallhost.pl',
            pass: "]L8mpLiwBn'0Wk8^58gZ_341EN.mb5",
        },
        tls: {
            rejectUnauthorized: false, // do not fail on invalid certs
        },
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
    if (process.env.NODE_ENV === 'development')
        console.log('Message sent: %s', info.response);
    if (info) return true;
    return false;
}

function sendActivationEmail(to: string, activator: string) {
    return {
        from: 'webdev@webdev.smallhost.pl',
        to,
        subject: 'PDF Reports - Your account activation link',
        text: `Hi there,
Thank you for registering with our service. Your account will be activated when you click the link below:
${process.env.NEXTAUTH_URL}/auth/activate_account/activator=${activator}
We look forward to providing you with a great experience and hope that you enjoy using our services.
Thanks again for signing up!
Regards,
PDF Report Team`,
        html: `<h1>Hi there</h1>,
        <p>Thank you for registering with our service. Your account will be activated when you click the link below:</p>
        <a href="${process.env.NEXTAUTH_URL}/auth/activate_account/activator=${activator}" target="_blank">Link to activate your account</a>
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
    };
}

function sendChangePasswordEmail(
    to: string,
    project: string,
    activator: string
) {
    return {
        from: 'webdev@webdev.smallhost.pl',
        to,
        subject: 'PDF Reports - Your account new password',
        text: `Hi there,
Your project name is: ${project}
You can change Your password by clicking the link below:
${process.env.NEXTAUTH_URL}//TODO: add path to change pssword /${activator}
We look forward to providing you with a great experience and hope that you enjoy using our services.
Regards,
PDF Report Team`,
    };
}

// TODO: create route to change password
