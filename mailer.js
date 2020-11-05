var nodemailer = require('nodemailer');

// https://www.w3schools.com/nodejs/nodejs_email.asp

function sender(emailTo, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chat.arqui.g4@gmail.com',
            pass: 'Pass123!'
        }
    });

    var mailOptions = {
        from: 'chat.arqui.g4@gmail.com',
        to: emailTo,
        subject: 'Te han etiquetado!',
        text: 'Te han etiquetado en el siguiente mensaje: \n' + message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sender }


