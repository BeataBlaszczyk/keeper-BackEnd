const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
    title: String,
    content: String,
    userID: String,
})



const NoteModel = mongoose.model("Note", NotesSchema)

module.exports = NoteModel
