import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
    throw new error("PORT is not avalilable in .env");
};

if (!process.env.MONGO_URI) {
    throw new error("MONGO_URI is not avalilable in .env");
};

if (!process.env.JWT_SECRET) {
    throw new error("JWT_SECRET is not avalilable in .env");
};

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}

export default config;