import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
    throw new error("PORT is not avalilable in .env");
}

export const config = {
    PORT: process.env.PORT
}