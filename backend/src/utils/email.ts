import nodemailer from 'nodemailer';
import { config } from '../config/env.js';
import { logger } from './logger.js';

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: true,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS
  }
});

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const verificationLink = `${config.FRONTEND_PROD_URL}/verify-email?token=${token}`;

  const htmlContent = `
    <h1>Vérifiez votre email</h1>
    <p>Cliquez sur le lien ci-dessous pour vérifier votre adresse email:</p>
    <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      Vérifier mon email
    </a>
    <p>Ou copiez ce lien: ${verificationLink}</p>
    <p>Ce lien expire dans 24 heures.</p>
  `;

  try {
    await transporter.sendMail({
      from: config.SMTP_FROM,
      to: email,
      subject: '🔐 Vérifiez votre email - Shearn',
      html: htmlContent
    });
    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send verification email to ${email}`, error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const resetLink = `${config.FRONTEND_PROD_URL}/reset-password?token=${token}`;

  const htmlContent = `
    <h1>Réinitialiser votre mot de passe</h1>
    <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe:</p>
    <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      Réinitialiser le mot de passe
    </a>
    <p>Ce lien expire dans 1 heure.</p>
  `;

  try {
    await transporter.sendMail({
      from: config.SMTP_FROM,
      to: email,
      subject: '🔐 Réinitialiser votre mot de passe - Shearn',
      html: htmlContent
    });
  } catch (error) {
    logger.error(`Failed to send password reset email to ${email}`, error);
    throw error;
  }
};

export const sendNotificationEmail = async (
  email: string,
  subject: string,
  content: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: config.SMTP_FROM,
      to: email,
      subject,
      html: content
    });
  } catch (error) {
    logger.error(`Failed to send notification email to ${email}`, error);
  }
};
