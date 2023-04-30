const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
  Username: { type: String, required:true },  
  Password: {type:String, required:true},
});

const Admins= mongoose.model("Admins", AdminSchema);
module.exports = Admins ; 