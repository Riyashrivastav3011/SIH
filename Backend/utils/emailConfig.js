import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
    tls: {
    rejectUnauthorized: false,
  },
})

transporter.verify((error, success) =>{
    if(error){
        console.log("smtp error",error);
    }else{
        console.log("smptp ready", success);
    }
})