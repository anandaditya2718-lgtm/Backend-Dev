const express = require('express')
const app = express();
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.get("/user",(req,res)=>{
    res.send("User route")
})
app.get("/userDetails",(req,res)=>{
    res.json({
        name:"Aditya",
        age:20,
        city:"New Delhi"
    });
})
//create 3 more routes /about, /contact, /services
app.get("/about",(req,res)=>{
    res.send("About Us Page")
})
app.get("/contact",(req,res)=>{
    res.send("Contact Us Page")
}
)
app.get("/services",(req,res)=>{
    res.send("Our Services Page")
})
app.listen(3000,()=>{
    console.log("Server is running")
})