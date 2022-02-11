const express = require ("express")
const app=express()
const cors = require("cors");
const mongoose = require("mongoose");

const NoteModel = require("./models/Notes")

mongoose.connect("mongodb+srv://admin-beata:mleczyk123@cluster0.yu0at.mongodb.net/keeper?retryWrites=true&w=majority")


app.use(express.json());
app.use(cors());

app.get("/getNotes", (req, res) =>{
    NoteModel.find({}, (err, result)=> {
 if(err){
    res.json(err)
 }else{
     res.json(result)
 }
 })
})


app.post("/createNote", async (req, res)=> {
    const note = req.body
    const newNote = new NoteModel(note);
    await newNote.save();

    res.json(note);

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


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
};

app.listen(port, function() {
    console.log("Server has started succesfully");
  });