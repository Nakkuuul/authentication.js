import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
    throw new error("PORT is not avalilable in .env");
};

if (!process.env.MONGO_URI) {
    throw new error("MONGO_URI is not avalilable in .env");
};

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
}

export default config;