import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema
({
    DisplayName: String,
    UserName: String,
    Password: String,
    Email: String
},
{
    collection: "users"
});

export const Model = mongoose.model("Contact", ContactSchema);