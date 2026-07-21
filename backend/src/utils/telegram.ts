import axios from 'axios';
import { config } from '../config/env.js';
import { logger } from './logger.js';

const sendTelegramMessage = async (
  botToken: string,
  chatId: string,
  message: string
): Promise<void> => {
  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    logger.info('Telegram message sent successfully');
  } catch (error) {
    logger.error('Failed to send Telegram message', error);
  }
};

export const sendRechargeNotification = async (
  transactionId: string,
  email: string,
  method: string,
  amount: number,
  voucherCode: string
): Promise<void> => {
  const message = `
<b>💰 Nouvelle demande de rechargement</b>

<b>ID Transaction:</b> ${transactionId}
<b>Email:</b> ${email}
<b>Méthode:</b> ${method}
<b>Montant:</b> €${amount}
<b>Code:</b> ${voucherCode}
<b>Heure:</b> ${new Date().toLocaleString('fr-FR')}

<a href="https://shearn-admin.com/recharges/${transactionId}">Voir dans l'admin</a>
  `;

  await sendTelegramMessage(
    config.TELEGRAM_BOT_RECHARGE,
    config.TELEGRAM_CHAT_ID,
    message
  );
};

export const sendWithdrawalNotification = async (
  email: string,
  amount: number,
  method: string,
  walletAddress?: string
): Promise<void> => {
  const message = `
<b>🏦 Nouvelle demande de retrait</b>

<b>Email:</b> ${email}
<b>Montant:</b> €${amount}
<b>Méthode:</b> ${method}
${walletAddress ? `<b>Adresse:</b> ${walletAddress}` : ''}
<b>Heure:</b> ${new Date().toLocaleString('fr-FR')}
  `;

  await sendTelegramMessage(
    config.TELEGRAM_BOT_WITHDRAWAL,
    config.TELEGRAM_CHAT_ID,
    message
  );
};
