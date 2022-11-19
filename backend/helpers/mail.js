import nodemailer from "nodemailer";

const transporterFn = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com" || process.env.MAIL_HOST,
        port: "587" || process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "mohabedr34@gmail.com" || process.env.MAIL_USERNAME,
            pass: "xjbwduuumkfhntuz" || process.env.MAIL_PASSWORD,
        },
    });
    return transporter;
};

export const sendMoneyWithdrawalEmail = async ({ email, name, amount, onSuccess, onError }) => {
    const transporter = transporterFn();
    const mailOptions = {
        from: process.env.MAIL_FROM, // sender address
        to: email, // list of receivers
        subject: "Money Withdrawal", // Subject line
        html: `<p>Hi ${name},</p>
  <p>You have successfully withdrawn ${amount} from your account.</p>
  <p>Thanks for using our service. Funds will be sent to your bank account within 2 working days.</p>
  <p>Regards,</p>
  <p>The Art of Film</p>
  `, // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            onError();
        } else {
            onSuccess();
        }
    });
};

export const sendResetPasswordEmail = ({ email, token, onSuccess, onError, host }) => {
    const transporter = transporterFn();

    const mailOptions = {
        from: "The Art of Film  ",
        to: email,
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
  Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
  http://${host}/reset/${token}\n\n
  If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            onError(err);
        } else {
            onSuccess();
        }
    });
};
