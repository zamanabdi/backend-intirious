 const jwtProvider = require("../config/jwtProvider.js");
 const userService = require("../services/user.service.js");


// const authenticate = async(req,res,next) => {
//     try {
//         const token = await req.headers.authorization?.split(" ")[1];
//         if(!token){
//             return res.status(404).send({error:"token not found..."})
//         }

//         const userId = jwtProvider.getUserIdFromToken(token);
//         const user = userService.findUserById(userId);

//         req.user = user;
        
//     } catch (error) {
//         return res.status(500).send({error:error.message});
        
//     }
//     next()
// }

// module.exports = authenticate;


const authenticate = async(req,res,next)=>{

    //Bearer token...
    try {
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return req.status(404).send({message:"token not found"})
        }

        const userId=jwtProvider.getUserIdFromToken(token);
        const user=await userService.findUserById(userId);

        req.user=user;
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
    next();
}

module.exports=authenticate;