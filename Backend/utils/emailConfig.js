import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: "riyashrivastav06348@gmail.com",
        pass: "tojg szuz mrhq brpa",
    },
    tls: {
      rejectUnauthorized: false, 
    },
})