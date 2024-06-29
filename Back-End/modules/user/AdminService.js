export function fun(req,res,next){
    const token= req.header('x-auth-token');
    if(!req.user.isAdmin){
        return res.satus(403).send("you're not admin")
    }
    next();

}