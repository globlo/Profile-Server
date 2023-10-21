require("dotenv").config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
// const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const myEmail = process.env.EMAIL_USERNAME;
    const myPass = process.env.EMAIL_PASSWORD;

    // Replace with your email and SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., 'Gmail'
        auth: {
            user: myEmail,
            pass: myPass,
        },
    });

    const mailOptions = {
        from: email,
        to: myEmail,
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Email not sent.');
        } else {
            console.log('Email sent: ' + info.response);
            // res.status(200).send('Email sent successfully.');
            res.redirect(process.env.THNKYOU_URL);
    
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

