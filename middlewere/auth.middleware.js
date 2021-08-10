const  jwt = require('jsonwebtoken')
require('dotenv').config()

//   мидел веа это обичная функция (прослойка)которая позволяет перехватывать данные и делать логику

module.exports = (req, res, next)=>{
    //  проверка на доступность сервера
    if(req.method === 'OPTIONS')
    return next()

    try {
        // Bearer Token
        const token  = req.headers.authorization.split(' ')[1]
        if(!token){
          return res.status(401).json({message: 'not authorization'})
        }
        // если токен есть для этого нам нужно его раскодировать
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message: 'not authorization'})
    }
}