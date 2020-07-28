const nodeMailer = require('nodemailer'); // Whatever SMTP client
const gsuiteKey = require('./gsuiteKey.json');

class ALZKMailer {

    constructor() {
        if (ALZKMailer._instance) {
            return ALZKMailer._instance
        }
        ALZKMailer._instance = this;
        this.EMAIL_ADDRESS = 'alzk.admin@alzk.com.tw';
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: this.EMAIL_ADDRESS,
                serviceClient: gsuiteKey.client_id,
                privateKey: gsuiteKey.private_key,
            },
        })
    }

    async send(mailInfo) {
        try {
            await this.transporter.verify();
            await this.transporter.sendMail({
                from: mailInfo.sendFrom,
                to: mailInfo.sendTo, // `abc@outlook.com, def@gmail.com`,
                subject: mailInfo.sendSubject,
                text: mailInfo.sendText
            })
        } catch (err) {
            throw err;
        }
    }
}

var mailer2 = new ALZKMailer();

mailer2.send({ 
    sendFrom: 'enkore.smart@alzk.com.tw', 
    sendTo: 'abc@alzk.com.tw', 
    sendSubject: "Lock Dead",
    sendText: "L1 is dead"
}).then(() => {
    console.log(`Mail sent successfully.`)
}).catch((err) => {
    console.log(`Mail sent failed ! ${err}`)
})

// var mailer1 = new ALZKMailer();
// await mailer1.send()

// hello.send({
//     sendFrom: 'enkore.smart@alzk.com.tw',
//     sendTo: 'abc@gmail.com',
//     sendSubject: "N@@@@@"
// }).then(() => {
//     console.log('ok...')
// }).catch((err) => {
//     console.log(err)
//     console.log(".......")
// })

