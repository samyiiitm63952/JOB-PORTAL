import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOtpEmail = async (toEmail, otp) => {
    try {
        const mailOptions = {
            from: `"Job Portal" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: 'Email Verification OTP - Job Portal',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #6A38C2; margin: 0; font-size: 26px;">Job Portal</h1>
                        <p style="color: #64748b; margin-top: 4px; font-size: 14px;">Verify your email address</p>
                    </div>

                    <p style="font-size: 15px; line-height: 1.6; color: #334155;">
                        Hello,
                    </p>
                    <p style="font-size: 15px; line-height: 1.6; color: #334155;">
                        Thank you for registering with Job Portal. To complete your registration, please enter the following 6-digit One-Time Password (OTP):
                    </p>

                    <div style="text-align: center; margin: 28px 0;">
                        <div style="display: inline-block; background: #f5f0ff; border: 2px dashed #6A38C2; border-radius: 12px; padding: 14px 32px;">
                            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #6A38C2; font-family: monospace;">
                                ${otp}
                            </span>
                        </div>
                    </div>

                    <p style="font-size: 13px; color: #64748b; text-align: center; margin-top: 10px;">
                        ⏰ This code expires in <strong>10 minutes</strong>.
                    </p>

                    <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-top: 25px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
                        If you didn't attempt to sign up for Job Portal, please disregard this email.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Failed to send OTP email:", error);
        return { success: false, error };
    }
};

export default transporter;
