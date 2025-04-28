"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMysqlDb = void 0;
const mysql2_1 = require("mysql2");
const connectMysqlDb = () => {
    const pool = (0, mysql2_1.createPool)({
        user: process.env.MYSQL_USER,
        host: process.env.HOST_DB,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_ROOT_PASSWORD,
        port: Number(process.env.MYSQL_PORT)
    });
    return pool;
};
exports.connectMysqlDb = connectMysqlDb;
