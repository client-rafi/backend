import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    first_name:{type : String , required : true},
    last_name:{type:String,required:true},
    contact_number:{type:String,required:true},
    email:{type:String,required:true},
    comment:{type:String,required:true}
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
