const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 3400;
const app = express();

mongoose.connect('mongodb+srv://bhuvi1:bhuvi1@cluster0.9f74ibb.mongodb.net/Tour&NatureWeb?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log(`DB connected`);
})
.catch((err)=>{
    console.log(err)
})

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const contact_schema = new mongoose.Schema({
    Fname : String,
    email : String,
    phone : String,
    query: String

}) 

const contact = new mongoose.model('contact',contact_schema)



app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.post("/contact", async (req, res) => {
    try {
        // console.log(req.body)
        const doc = new contact(req.body);
        await doc.save();
        res.redirect("/")
    }
    catch (err) {  
        res.send(err);
    }

})

app.listen(port, ()=>{
    console.log(`App is listening at port ${port}`);
})
