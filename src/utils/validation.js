const validator=require("validator");
const validateSignUpData = (req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email ID is required");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong paasword");
    }
};

const validateEditProfileData = (req)=>{
    const allowedEditProfile = ["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];

    const isEditAllowed = Object.keys(req.body).every((field)=> 
        allowedEditProfile.includes(field)
    );
    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}