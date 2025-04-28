"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInviteBody = exports.validateStatus = exports.validateIdInURLParam = exports.validateLogin = exports.validateUser = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    role: zod_1.z.enum(["admin", "public", "tourist"]),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const idParamSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
const validateUser = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateUser = validateUser;
const validateLogin = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateLogin = validateLogin;
const validateIdInURLParam = (req, res, next) => {
    try {
        idParamSchema.parse(req.params);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateIdInURLParam = validateIdInURLParam;
const statusSchema = zod_1.z.object({
    status: zod_1.z.enum(["accept", "maybe", "no", "busy"]),
});
const validateStatus = (req, res, next) => {
    try {
        statusSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateStatus = validateStatus;
const createInviteSchema = zod_1.z.object({
    inviteeId: zod_1.z.string().uuid({ message: "Invalid invitee id format" }),
});
const validateInviteBody = (req, res, next) => {
    try {
        createInviteSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateInviteBody = validateInviteBody;
