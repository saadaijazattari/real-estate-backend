const bcrypt = require('bcrypt');
const prisma= require('../lib/prisma')

exports.registerUser= async(req,res) => {
    try {
        console.log("Aaya hua data:", req.body);
        const {username, email, password} = req.body
    
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                userName: username,
                email,
                password: hashedPassword
            }
        })
    res.json({
        success: true,
        message: "User registered successfully",
        user: newUser
    })
        
    } catch (error) {
        res.status(500).json({message: "Error registering user", error: error.message})
    }
}
exports.loginUser= async(req,res) => {
res.json({
    name: 'hello'
})
}
exports.logoutUser= async(req,res) => {

}