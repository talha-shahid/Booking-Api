// import  mongoose, {Schema, model} from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new Schema({
//     name: {type: String, required: true},
//     password: {type: String, required: true, select: false},
//     bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
// }, {timestamps: true});


// userSchema.pre('save', async function(next) {
//     if(!this.isModified('password')) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// });

// const User = mongoose.models.User || model('User', userSchema);

// export default User;


///////////////////////////



////////
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
