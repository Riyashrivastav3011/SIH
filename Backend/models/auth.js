import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
   },
   password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 10,
    },
    mobile: {
    type: String,
    trim: true
   },
   role: {
  type: String,
  enum: ['student', 'industry', 'academician', 'institution'],
  required: true,
},
  isVerified:{
    type:Boolean,
    default:false
  },
  verificationCode:{
    type:Number,
  },
  

},
{
  timestamps: true 
}
);

export default mongoose.model('User' , userSchema);
