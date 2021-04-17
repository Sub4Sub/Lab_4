import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema
({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String
},
{
    collection: "users"
});

export const Model = mongoose.model("User", UserSchema);