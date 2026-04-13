import userModel from '../models/user.model.js'
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import config from '../src/config/config.js';

export async function register(req, res){
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isAlreadyRegistered) {
        return res.status(409).json({
            success: false,
            message: 'Username or Email already exist'
        });
    };

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
});

    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET,{
        expiresIn: "1d"
    });

    res.status(201).json({
        success: true,
        message: 'User Registered Seccessfully',
        user: {
            username: user.username,
            email: user.email,
        },
        token: token
    });
};
