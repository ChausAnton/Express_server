require('dotenv').config()
const nodemailer = require('nodemailer');
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


exports.sendEmail = async(email, subject, payload, template) => {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD, 
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);

        const options = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        };

        await transporter.sendMail(options, (err, info) => {
            if (err) {
                return err;
            } else {
                return true
            }
        });
};