const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mySecret@09'
const userCollection = require('./Models/Usermodels')


async function checkToken(req,res, next){
    let token = req.cookies.token || req.headers.authorization;
    console.log(token)
    
 try {
    let decoded = await jwt.verify(token,JWT_SECRET);
    console.log(decoded._id)
    let user = await userCollection.findById(decoded._id);
    req.user = user
    next();
 } catch (error) {
    return res.status(401).json({message:"unauthorized",error:error.message})
 }
}

module.exports = checkToken 