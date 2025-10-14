import logger from "#config/logger.js";
import bcrypt from 'bcrypt'
import { eq } from "drizzle-orm";
import  {db}  from "#config/database.js";
import { user } from "#models/user.model.js";

export const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  } catch (error) {
    logger.error(error);
    throw new Error('Error hashing password');
  }
};


export const createUser=async({name,email,password,role="user"})=>{
try {
    
    logger.info("Creating user with email:",email);
    logger.info("Creating user with name:",name);
    logger.info("Creating user with password:",password);
    logger.info("Creating user with role:",role);
    const existingUser=await db.select().from(user).where(eq(user.email,email)).limit(1);
    if(existingUser.length>0) throw new Error('User already exists');
    const hashedPassword=await hashPassword(password);
    const [newUser]=await db.insert(user).values({
        name,
        email,
        password:hashedPassword,
        role
    }).returning({
        id:user.id,
        name:user.name,
        role:user.role,
        email:user.email,
        created_at:user.created_at,
    });
    logger.info(`User created with email: ${email}`);
    return newUser;
  } catch (error) {
    logger.error(error);
    throw new Error('Error hashing password');
  }
}