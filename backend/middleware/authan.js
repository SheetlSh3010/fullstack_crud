const jwt = require('jsonwebtoken')
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token)
    if(token){
        jwt.verify(token,"sheetal",(err,decoded)=>{
            
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({data:'please login first'})
            }
        })
    }else{
        res.send({data:'please login first'})
    }
}
module.exports={
    auth
}