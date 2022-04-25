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



const accountSid = 'AC5034f4aed62bd514c116e08ab613094c'; 
const authToken = '0baac867637ab1d44d5c877c4a423f8b';
const client = require('twilio')(accountSid, authToken); 
app.post("/sendSMS", (req, res, next) => {
    
    console.log(req.body.name);
    client.messages 
    .create({ 
        body: `Intruder Detected. Check RAT TRAP APP`,  
        messagingServiceSid: 'MG64d2d8f2598c07c6325f6399d1e5b408',      
        to: '+919920211185' 
    }) 
    .then(message => console.log(message.sid)) 
    .done(() => {
        res.status(200).json({
            "Message": "Sent"
        });
    });
});
app.get("/", (req,res,next) => {
    console.log("Inside");
    next();
})
app.listen(process.env.PORT || 5000, () => console.log('Server listening'));
