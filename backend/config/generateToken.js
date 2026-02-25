import jwt from 'jsonwebtoken'


const generateToken=(UserId)=>{
    return jwt.sign({id:UserId},process.env.JWT_SECRET,{
        expiresIn:'7d',
    });
};

export default generateToken;