require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

const client = require("twilio")(accountSid, authToken);


exports.sendOtp = async (phone) => {
    try {
        const verification = await client.verify.v2.services(verifySid)
            .verifications.create({ to: phone, channel: "sms" });

        return {
            success: true,
            code: 200,
            message: "OTP sent successfully"
        };
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message,
        };
    }
}

// client.verify.v2
//     .services(verifySid)
//     .verifications.create({ to: "+201001860857", channel: "sms" })
//     .then((verification) => console.log(verification.status))
//     .then(() => {
//         const readline = require("readline").createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         });
//         readline.question("Please enter the OTP:", (otpCode) => {
//             client.verify.v2
//                 .services(verifySid)
//                 .verificationChecks.create({ to: "+201001860857", code: otpCode })
//                 .then((verification_check) => console.log(verification_check.status))
//                 .then(() => readline.close());
//         });
//     });