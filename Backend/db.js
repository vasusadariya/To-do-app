const {mongoose} = require("mongoose");

mongoose.connect("mongodb+srv://vasu10:VPAHRqNAHMLhfsiL@cluster0.lflje.mongodb.net/todo");
const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {Todo}
