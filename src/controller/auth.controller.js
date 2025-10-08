import logger from "#config/logger.js";
import { formarValidationError } from "#utils/format.js";

export const signUp=(req,res,next)=>{
try {
    const ValidationResult=signUpSchema.safeParse(req.body);
    if(!ValidationResult.success){
        return res.status(400).json({
            error:"Valdiation Failed",
            details:formarValidationError(ValidationResult.error)
        });
    }
    const {name,email,role}=ValidationResult.data;
    //auth logic

    res.status(201).json({message:"User created successfully",user:{
        id:1,
        name,
        email,
        role
    }});
} catch (error) {
    logger.error("Sign Up error",error);
    if(!error.message==="User already exists"){
        return res.status(409).json({message:"User already exists"});

    }
    next(error)
}
}