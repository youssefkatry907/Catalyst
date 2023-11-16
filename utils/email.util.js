// const { SendMailClient } = require("zeptomail");

// exports.sendEmail = async (receiver, subject, text, html) => {
//     const url = "api.zeptomail.eu/";
//     const token = "Zoho-enczapikey yA6KbHtSv1ilxz8EFRE8gJmIoIw1+K9v2ink5y6wdcYgKdXo2qE8hRJuI9fvJDvSjNCDtKhWY4wTJNqwvYpXd8Q1NYQEfJTGTuv4P2uV48xh8ciEYNYmgZqsAbMXEa5KeRstCikxQ/MgWA==";
    
//     let client = new SendMailClient({ url, token });
  
//     try {
//       await client.sendMail({
//         //bounce_address: "password.reset@support.vipcardsshop.com",
//         from: {
//           address: "undefined",
//           name: "noreply",
//         },
//         to: [
//           {
//             email_address: {
//               address: receiver,
//             },
//           },
//         ],
//         subject: subject,
//         htmlbody: html,
//         textbody: text,
//       });
  
//       console.log("Email sent successfully.");
//       return { success: true, code: 201 };
//     } catch (error) {
//       console.log("Error sending email:", error);
//       return { error: error, success: false, code: 500 };
//     }
//   };



// client.sendMail({
//     "from": 
//     {
//         "address": "undefined",
//         "name": "noreply"
//     },
//     "to": 
//     [
//         {
//         "email_address": 
//             {
//                 "address": "youssefkatry907@gmail.com",
//                 "name": "youssef"
//             }
//         }
//     ],
//     "subject": "Test Email",
//     "htmlbody": "<div><b> Test email sent successfully.</b></div>",
// }).then((resp) => console.log("success")).catch((error) => console.log("error"));