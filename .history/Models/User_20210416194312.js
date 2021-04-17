import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema
({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String
},
{
    collection: "contacts"
});

export const Model = mongoose.model("Contact", ContactSchema);