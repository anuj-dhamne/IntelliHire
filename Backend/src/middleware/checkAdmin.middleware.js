export const checkAdmin = (req, res, next) => {
    console.log(" user in checkAdmin : ",req.user);
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access Denied" });
      }
      next();
    };
  
  
    