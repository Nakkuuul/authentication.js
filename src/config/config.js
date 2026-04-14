import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
    throw new error("PORT is not avalilable in .env");
};

if (!process.env.MONGO_URI) {
    throw new error("MONGO_URI is not avalilable in .env");
};

if (!process.env.JWT_ACCESS_TOKEN) {
    throw new error("JWT_ACCESS_TOKEN is not avalilable in .env");
};

if (!process.env.JWT_REFRESH_TOKEN) {
    throw new error("JWT_REFRESH_TOKEN is not avalilable in .env");
};

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN
}

export default config;