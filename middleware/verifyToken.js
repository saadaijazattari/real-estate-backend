import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  // FIX: Use JWT_SECRET (same as login)
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => { // Removed async
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(403).json({ message: "Token is not Valid!" });
    }
    req.userId = payload.id;
    req.isAdmin = payload.isAdmin || false;
    next();
  });
};