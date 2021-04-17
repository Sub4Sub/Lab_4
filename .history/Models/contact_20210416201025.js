const Schema = mongoose.Schema;

const ContactSchema = new Schema
({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String
},
{
    collection: "contacts"
});

export const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports.Model = ContactModel;