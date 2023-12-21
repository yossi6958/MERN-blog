const jwt = require("jsonwebtoken");

// פונקציית מיידלוואר / אמצעית
exports.auth = async(req,res,next) => {
  const token = req.header("x-api-key");
  // בודק שנשלח טוקן בהידר
  if(!token){
    return res.status(401).json({err:"You need send token to this endpoint/url 1111"})
  }
  try{
    // מנסה לפענח את הטוקן אם הוא לא בתוקף
    // או שיש טעות אחרת נעבור לקץ'
    const decodeToken = jwt.verify(token,"maxim");

    // שמים את האיי די המפוענח
    req.tokenData = decodeToken;
    // לעבור בפונקציה הבאה בתור בשרשור של הרואטר
    next()
  }
  catch(err){
    console.log(err);
    res.status(502).json({err:"Token invalid or expired 2222"})
  }
}
exports.authAdmin = async(req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need send token to this endpoint or url 111"})
  }
  try{

    const decodeToken = jwt.verify(token,"maxim");
    // בודק אם המשתמש הוא אדמין
    if(decodeToken.userRole != "admin"){
      return res.status(401).json("you need to be an admin to do that"+decodeToken.userRole)
    }

    req.tokenData = decodeToken;
    next()
  }
  catch(err){
    console.log(err);
    res.status(502).json({err:"Admin Token invalid or expired 222"})
  }
}