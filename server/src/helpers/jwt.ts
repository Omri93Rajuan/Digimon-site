import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define interface for token payload
interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

// Ensure secret key exists
const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key';

// Generate token
const generateAuthToken = (user: { _id: any; isAdmin: boolean }): string => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin }, 
    SECRET_KEY, 
    { 
      expiresIn: '1h'
    }
  );
};

// Verify user
const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  // Check if cookies exist
  if (!req.headers.cookie) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Access denied. No cookies found.' 
    });
  }

  // Get token from cookies
  const token = req.cookies['auth_token'];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    // Try to verify the token
    const decoded = jwt.verify(token, SECRET_KEY, {
      algorithms: ['HS256']
    }) as TokenPayload;

    // Add decoded user to request
    (req as any).user = decoded;

    // Continue to next middleware
    next();

  } catch (error) {
    console.error('Token verification error:', error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Token expired. Please log in again.' 
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid or malformed token.' 
      });
    }

    return res.status(500).json({ 
      status: 'error', 
      message: 'Internal error during authentication.' 
    });
  }
};

// Admin check middleware
const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  // First verify that the user is authenticated
  verifyUser(req, res, () => {
    // Check if user exists and is admin
    const user = (req as any).user;
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Admin privileges required.'
      });
    }

    // User is admin, proceed
    next();
  });
};

export { generateAuthToken, verifyUser, verifyAdmin };