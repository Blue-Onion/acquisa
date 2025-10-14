import logger from '#config/logger.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import  {db}  from '#config/database.js';
import { user } from '#models/user.model.js';

export const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  } catch (error) {
    logger.error('Create user error:', error);
    throw error;
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    logger.error('Error comparing password:', error);
    throw new Error('Error comparing password');
  }
};

export const authenticateUser = async ({ email, password }) => {
  try {
    logger.info(`Authenticating user with email: ${email}`);
    
    // Find user by email
    const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1);
    
    if (existingUser.length === 0) {
      logger.info(`User not found with email: ${email}`);
      throw new Error('Invalid credentials');
    }
    
    const foundUser = existingUser[0];
    
    // Compare password
    const isPasswordValid = await comparePassword(password, foundUser.password);
    
    if (!isPasswordValid) {
      logger.info(`Invalid password for user: ${email}`);
      throw new Error('Invalid credentials');
    }
    
    logger.info(`User authenticated successfully: ${email}`);
    
    // Return user without password
    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      created_at: foundUser.created_at,
      updated_at: foundUser.updated_at
    };
  } catch (error) {
    logger.error('Authentication error:', error);
    throw error;
  }
};


export const createUser=async({name,email,password,role='user'})=>{
  try {
    
    logger.info('Creating user with email:',email);
    logger.info('Creating user with name:',name);
    logger.info('Creating user with password:',password);
    logger.info('Creating user with role:',role);
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
};