const jwt=require("jsonwebtoken")
const verifyToken=(req,res,next)=>{
    //token verification logic

    //get beares token from header of req obj
    let tokenWithBearer=req.headers["authorization"]


    //iff bearer token is existed
    if(tokenWithBearer){
        //extract token by removing first 7 chars
        let token=tokenWithBearer.slice(7,tokenWithBearer.length)
        //verify with secret key
        jwt.verify(token,"abcd",(err,decoded)=>{
            if(err){
                return res.send({message:"session expired..plz relogin to continue"})

            }
            else{
                next()
            }
        })
    }
    //if bearer token is not existed
    else{
        return res.send({message:"Unauthorized access. plz login to continue"})
    }
}
//export
module.exports=verifyToken;