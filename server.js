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
const authToken = '619cf9f6b015928f7fac3549589e945d'; 
const client = require('twilio')(accountSid, authToken); 
app.post("/sendSMS", (req, res, next) => {
    
    console.log(req.body.name);
    client.messages 
    .create({ 
        body: `Criminal detected. Name: ${req.body.name}.`,  
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
