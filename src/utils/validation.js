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

module.exports = {
    validateSignUpData
}