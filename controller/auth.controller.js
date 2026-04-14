import userModel from '../models/user.model.js'
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import config from '../src/config/config.js';

// Register
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

    const accessToken = jwt.sign({
        id: user._id
    }, config.JWT_ACCESS_TOKEN,{
        expiresIn: "15m"
    });

    const refreshToken = jwt.sign({
        id: user._id
    }, config.JWT_REFRESH_TOKEN,{
        expiresIn: "7d"
    });

    res.status(201).json({
        success: true,
        message: 'User Registered Seccessfully',
        user: {
            username: user.username,
            email: user.email,
        },
        accessToken: accessToken,
        refreshToken: refreshToken
    });
};


// Get Me

export async function getMe(req, res) {
    const accessToken = req.headers.authorization?.split(" ")[ 1 ];

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: 'Token not found'
        });
    };

    const decodedToken = jwt.verify(accessToken, config.JWT_ACCESS_TOKEN);

    const userData = await userModel.findById(decodedToken.id);

    return res.status(200).json({
        success: true,
        message: 'User Fetched Seccessfully',
        data: {
            username: userData.username,
            email: userData.email
        }
    });
};

// Access Token is Short Lived Token
// Refresh Token is Long Lived Token

// Get Access Token

export async function refreshAccessToken(req, res) {
    try{
        const incomingRefreshToken = req.headers.authorization?.split(" ")[1];

        if (!incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Token not found'
            });
        };

        const decodedToken = jwt.verify(incomingRefreshToken, config.JWT_REFRESH_TOKEN);
        const userData = await userModel.findById(decodedToken.id);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        };

        const accessToken = jwt.sign({
            id: decodedToken.id
        }, config.JWT_ACCESS_TOKEN,{
            expiresIn: "15m"
        });

        return res.status(200).json({
            success: true,
            message: 'Access Token Generated',
            accessToken: accessToken
        });
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    };
};
