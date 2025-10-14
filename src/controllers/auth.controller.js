import logger from '#config/logger.js';
import { createUser, authenticateUser } from '#services/auth.service.js';
import { signUpSchema, signInSchema } from '#utils/auth.validation.js';
import { cookies } from '#utils/cookies.js';
import { formarValidationError } from '#utils/format.js';
import { jwtToken } from '#utils/jwt.js';
export const signUp = async (req, res, next) => {
  try {
    const ValidationResult = signUpSchema.safeParse(req.body);

    if (!ValidationResult.success) {
      return res.status(400).json({
        error: 'Valdiation Failed',
        details: formarValidationError(ValidationResult.error),
      });
    }
    logger.info('Validation successful', ValidationResult.data);
    const { name, email, role, password } = ValidationResult.data;
    logger.info(`Creating user with email: ${email}`);

    const user = await createUser({
      name,
      email,
      password,
      role,
    });
    const token = jwtToken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    cookies.set(res, 'token', token);
    //auth logic
    logger.info('token', token);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Sign Up error', error);
    if (error.message === 'User already exists') {
      return res.status(409).json({ message: 'User already exists' });
    }
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const validationResult = signInSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation Failed',
        details: formarValidationError(validationResult.error),
      });
    }

    logger.info('Sign-in validation successful', validationResult.data);
    const { email, password } = validationResult.data;
    logger.info(`Attempting to sign in user with email: ${email}`);

    const user = await authenticateUser({ email, password });
    
    const token = jwtToken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    
    cookies.set(res, 'token', token);
    logger.info(`User signed in successfully: ${email}`);

    res.status(200).json({
      message: 'User signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Sign In error', error);
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    logger.info('User signing out');
    
    cookies.clear(res, 'token');
    logger.info('User signed out successfully');

    res.status(200).json({
      message: 'User signed out successfully',
    });
  } catch (error) {
    logger.error('Sign Out error', error);
    next(error);
  }
};
