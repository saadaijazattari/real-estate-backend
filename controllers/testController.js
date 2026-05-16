import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = (req, res) => { // Removed async
  console.log(req.userId);
  res.status(200).json({ message: "You are Authenticated", userId: req.userId });
};

export const shouldBeAdmin = (req, res) => { // Removed async
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  // FIX: Use JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => { // Removed async
    if (err) {
      console.error("Admin verification error:", err.message);
      return res.status(403).json({ message: "Token is not Valid!" });
    }
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized! Admin access required." });
    }
    
    res.status(200).json({ message: "You are Authenticated as Admin", userId: payload.id });
  });
};