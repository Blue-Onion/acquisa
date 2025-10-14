import logger from '#config/logger.js';
import { createUser } from '#services/auth.service.js';
import { signUpSchema } from '#utils/auth.validation.js';
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
    const token = jwtToken({
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
    if (!error.message === 'User already exists') {
      return res.status(409).json({ message: 'User already exists' });
    }
    next(error);
  }
};
