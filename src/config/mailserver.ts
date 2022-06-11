
const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
        user: 'athinabarbul96@gmail.com',
        pass: 'tuvhkloejzoimgnl'
    }
});