'use server';

// import nodemailer, { TransportOptions } from 'nodemailer';
// import { google } from 'googleapis';

// const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
// const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
// const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
// const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
// const SENDER_EMAIL = process.env.SENDER_EMAIL;

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// export async function verifyEmail(email: string) {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();
//     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

//     const transporterOptions: TransportOptions = {
//       pool: true,
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: process.env.SENDER_EMAIL as string,
//         clientId: process.env.CLIENT_ID as string,
//         clientSecret: process.env.CLIENT_SECRET as string,
//         refreshToken: process.env.REFRESH_TOKEN as string,
//         accessToken: accessToken.token as string,
//       },
//       maxConnections: 5,
//       maxMessages: 10,
//       rateLimit: 10,
//     };

//     const transporter = nodemailer.createTransport(transporterOptions);

//     const mailOptions = {
//       from: `ChatIn <${SENDER_EMAIL}>`,
//       to: email,
//       subject: 'Verify Your Email Address With ChatIn',
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//           h1 {
//             color: #333;
//             font-size: 26px;
//             margin-bottom: 20px;
//           }
//           p {
//             font-size: 16px;
//             line-height: 1.6;
//             margin: 10px 0;
//             color: #333;
//           }
//           .verification-code {
//             font-size: 20px;
//             font-weight: bold;
//             padding: 0.25rem 0.5rem;
//             border-radius: 2px;
//             background-color: #333;
//             color: #FFD369;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>Email Verification</h1>
//           <p>Your verification code is: <span class="verification-code">${verificationCode}</span></p>
//           <p>Please enter this code on the verification page to complete your registration.</p>
//           <p>If you did not sign up for ChatIn, please ignore this email.</p>
//           <p>Thank you</p>
//           <p>The ChatIn Team</p>
//         </div>
//       </body>
//       </html>
//       `,
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', result);
//     return { verificationToken };
//   } catch (err) {
//     console.error('[verifyEmail] Error:', err);
//     throw new Error('An error occurred while sending mail to verify your account.');
//   }
// }

export async function getTokenAndSendEmail(email: string) {
  console.log(`called verifyEmail(${email})`);
  return "123456"
}