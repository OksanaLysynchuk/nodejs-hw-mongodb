// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phoneNumber: { type: String },
//     isFavourite: { type: Boolean, default: false },
//     contactType: { type: String },
//     photo: { type: String },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );

// const Contact = mongoose.model('Contact', contactSchema);

// export default Contact;

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: { type: String },
    photoUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
