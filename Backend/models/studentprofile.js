import mongoose from 'mongoose'

const trainingSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ["Internship", "Training"],
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    description: {
      type: String,
    },
},
{_id:true}
);


const certificateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    issuer: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    link: {
      type: String,
    },
},
{_id:true});

const activitySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
      type: String,
    },
},
{ _id: true });

const studentProfileSchema = new mongoose.Schema({
      userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      },

      resume:{
        type:String
      },
      career:{
        type:String,
        required:true
      },

     institution: {
      collegeName: {
        type: String,
        required: true,
      },
      course: {
        type: String,
      },
      branch: {
        type: String,
      },
      year: {
        type: String,
      },
      rollNumber: {
        type: String,
      },
    },
     skills: {
      type: [String],
      required: true,
    },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },
    workMode: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
      default: "Remote",
    },
    trainings: {
      type: [trainingSchema],
      default: [],
    },

    certificates: {
      type: [certificateSchema],
      default: [],
    },

    activities: {
      type: [activitySchema],
      default: [],
    },
},
{
    timestamps:true,
}
);

export default mongoose.model("Studentprofile" , studentProfileSchema);