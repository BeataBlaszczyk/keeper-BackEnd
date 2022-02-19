const express = require ("express")
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/Users")
const NoteModel = require("./models/Notes")


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
};



mongoose.connect("mongodb+srv://admin-beata:mleczyk123@cluster0.yu0at.mongodb.net/keeper?retryWrites=true&w=majority")


app.use(express.json());
app.use(cors());

app.get("/getNotes:UserID", (req, res) =>{
    console.log(req.params.UserID + "!!!")
    NoteModel.find({userID: req.params.UserID}, (err, result)=> {
 if(err){
    res.json(err)
 }else{
     res.json(result)
 }
 })
})

app.get("/getUser:UserName", (req, res) =>{
   
    UserModel.find({username: req.params.UserName}, (err, result)=> {
        
 if(!result[0]){
    res.json(false)
 }else{
     res.json(true)
 }
 })
})

app.post("/createNote", async (req, res)=> {
    const note = req.body
    const newNote = new NoteModel(note);
    await newNote.save();

    res.json(note);

})


app.post("/changeColor", async (req, res)=> {
    const color = req.body.color
    const user = req.body.user
    

    UserModel.findOne({username: user}, async (err, result)=> {
        if(!result){
           res.json(err)
        }else{
            result.color = color
           await result.save()
        }

    })
    
})

app.post("/createUser", async (req, res)=> {
    const user = req.body
    const newUser = new UserModel(user);
    await newUser.save();

    UserModel.findOne({username: newUser.username}, (err, result)=> {
        if(err){
           res.json(err)
        }else{
            res.json(result)
        }

    })
    

})

app.post("/login", async (req, res)=> {
    const user = req.body
    
 
    UserModel.findOne({username: user.username}, (err, result)=> {
        
        if(!result){
           res.json("This user does not exist")
        }
        else{

            if (user.password === result.password){
                res.json(result)
            } else {
                res.json("Incorrect password")
            }


            
        }

    })
    

})

app.post("/deleteNote", async (req, res)=> {
    const id = req.body

    NoteModel.findOneAndRemove({_id: id._id},(err, result)=> {
        if(err){
           res.json(err)
        }else{
            res.json(result)
        }
     } );

    

})




app.listen(port, function() {
    console.log("Server has started succesfully");
  });