import Studentprofile from "../models/Studentprofile.js";

export const createStudentProfile = async(req , res) =>{
    try{
        const { 
            career ,institution, skills, skillLevel,workMode, trainings, certificates , activities 
        } = req.body;
        const userId = req.user.id;
        const existingProfile = await Studentprofile.findOne({userId});
        if(existingProfile){
            return res.status(400).json({
                message: "Student profile already exists"
            });
        }

        console.log("REQ.FILE:", req.file);
console.log("REQ.BODY:", req.body);
        const resume = req.file ? req.file.path : null;
        const studentProfile = await Studentprofile.create({
            userId, resume , career ,
            institution:institution ? JSON.parse(institution):[],
            skills:skills?JSON.parse(skills):[], 
            skillLevel, workMode,
             trainings:trainings?JSON.parse(trainings):[], certificates,
            activities:activities?JSON.parse(activities):[]
        });
        res.status(200).json({
            message:"profile created successfully",
            profile:studentProfile
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'failed to create profile',
            error:err.message
        });
    }
}


export const getStudentProfile = async (req , res) => {
     try{
        const userId = req.user.id;
        const profile = await Studentprofile.findOne({userId}).populate("userId", "name email mobile");
        if (!profile) {
            return res.status(404).json({
                message: "Student profile not found"
            });
        }
         res.status(200).json({
            message: "Profile fetched successfully",
            profile
        });
     } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to fetch profile",
            error: err.message
        });
    }
}


export const getSameInstituteStudents = async (req, res) => {
    try {
        const userId = req.user.id;

        const myProfile = await Studentprofile.findOne({ userId });

        if (!myProfile) {
            return res.status(404).json({
                message: "Your student profile not found"
            });
        }

        const collegeName = myProfile.institution.collegeName;

        const students = await Studentprofile
            .find({
                "institution.collegeName": collegeName
            })
            .populate("userId", "name email mobile role");

        res.status(200).json({
            message: "Students fetched successfully",
            collegeName,
            students
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to fetch students",
            error: err.message
        });
    }
};