
const nodemailer = require('nodemailer');
require('dotenv').config();     

module.exports = {
    verification:(email)=>{
        return new Promise((resolve,reject)=>{
            let transporter = nodemailer.createTransport({
                host: "main.subhan07.com",
                port: 465,
                secure: true,
                service : 'Gmail',
                       
                auth: {
                  user: 'ibrahimpc05@gmail.com',
                  pass: process.env.PASSWORD,
                }
                
            });
          var otp = Math.random();
          otp = otp * 1000000;
          otp = parseInt(otp);
          console.log(otp);   
        
            // send mail with defined transport object
     var mailOptions={
        to: email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('***3********************',error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('otp');
        
    });
    resolve(otp)
        })
    }
}