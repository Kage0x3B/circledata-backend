import dotenv from "dotenv";

dotenv.config();

export default {
    publicUrl: process.env.PUBLIC_URL || "http://localhost:9000",
    hostname: process.env.HOSTNAME || "localhost",
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 9000,
    dev: process.env.NODE_ENV === "development",
    jwt: {
        secret: process.env.JWT_SECRET,
        shortExp: process.env.JWT_SHORT_EXP || "30m",
        longExpMonths: process.env.JWT_LONG_EXP_MONTHS ? parseInt(process.env.JWT_LONG_EXP_MONTHS, 10) : 3,
        longExpHours: process.env.JWT_LONG_EXP_HOURS ? parseInt(process.env.JWT_LONG_EXP_HOURS, 10) : 3
    },
    saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 8,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT, 10) : 10
    }
};
