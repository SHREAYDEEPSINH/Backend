// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const auth = async (req, res, next) => {
  
//   console.log(req.body , "auth");

//   const token = req.headers.authorization;
//   console.log(token);
//   if (!token) {
//     res.status(400).json({ message: "Please login" });
//     return;
//   }
  
//   const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
//   console.log(decoded);
  
//   if (decoded) {
//     if (req.body.email == decoded.user.email) {
//       if (await bcrypt.compare(req.body.password, decoded.user.password)) {
//         user.body.todoId = decoded._id
//         next();
//       } else {
//         res.status(400).json({ message: "unauthentication password" });
//       }
//     } else {
//       res.status(400).json({ message: "unauthentication email" });
//     }
//   } else {
//     res.status(400).json({ message: "Please login" });
//   }
// };

// module.exports = auth;




// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const auth = async (req, res, next) => {
//   try {
//     console.log(req.body  , "auth");
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(400).json({ message: "Please login" });
//     }
//     const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

//     if (!decoded) {
//       return res.status(400).json({ message: "Invalid token" });
//     }

//     console.log(decoded  , "decodedd");

//     if (req.body.email !== decoded.user.email) {
//       return res.status(400).json({ message: "Email mismatch" });
//     }
//     const passwordMatches = await bcrypt.compare(
//       req.body.password,
//       decoded.user.password
//     );

//     if (!passwordMatches) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
//     req.body.todoId = decoded.user._id;
//     next();
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Authentication failed", error: error.message });
//   }
// };

// module.exports = auth;


const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log(req.body , "auth")
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Authorization token required" });
    }

    // Extract the token after "Bearer"
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Pass the decoded user details (from token) to the request object
    req.body.todoId = decoded.user._id; // User's ID for database queries
    req.body.email = decoded.user.email; // User's email if needed in requests

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = auth;

