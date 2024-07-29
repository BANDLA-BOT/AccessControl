const express = require('express');
const cors = require('cors')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
const randomString = require('randomstring')
const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);

//Configure handlebars 
const hbsOptions = {
    viewEngine:{
        defaultLayout:'baseMessage',
        partialsDir:'views',
        layoutsDir:'views'
    },
    viewPath:'views'
}
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'bguru757@gmail.com',
        pass:'xpgzyyfbkeggfmod'
    }
})
transporter.use('compile', hbs(hbsOptions))






function sendEmail(to, subject, template, context){
    const mailOptions = {
        from : 'bguru757@gmail.com',
        to,
        subject,
        template,
        context,
    }
    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log('Error', err)
        }
        else{
            console.log('Message sent')
        }
    })
}
sendEmail('bguru757@gmail.com','Dynamic email Templates with nodemailer-express-handlebars','message', {access:'123456'})

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/roleBasedAccess', )
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// async function generateOTP (){
//     return randomString.generate({
//         length:6,
//         charset:'numeric'
//     })
// }
// const OTP = generateOTP()
// console.log(OTP)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
