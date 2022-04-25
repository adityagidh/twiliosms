const express = require("express");
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.urlencoded());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});



const accountSid = 'AC5506ff75bf701114c0d7bac3e2b3694d'; 
const authToken = '0baac867637ab1d44d5c877c4a423f8b';
const client = require('twilio')(accountSid, authToken); 
app.get("/sendSMS", (req, res, next) => {
    
    client.messages 
    .create({ 
        body: `Intruder Detected. Check RAT TRAP APP`,  
        messagingServiceSid: 'MG3ea36925577aeafcbff636fc1f560638',      
        to: '+919920211185' 
    }) 
    .then(message => console.log(message.sid)) 
    .done(() => {
        res.status(200).json({
            "Message": "Sent"
        });
        next();
    });
});
app.get("/", (req,res,next) => {
    console.log("Inside");
    next();
})
app.listen(process.env.PORT || 5000, () => console.log('Server listening'));
