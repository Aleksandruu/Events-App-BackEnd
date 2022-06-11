"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'athinabarbul96@gmail.com',
        pass: 'tuvhkloejzoimgnl'
    }
});
