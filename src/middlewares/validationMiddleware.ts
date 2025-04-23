import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "public", "tourist"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const idParamSchema = z.object({
  id: z.string(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateIdInURLParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};



const statusSchema = z.object({
  status: z.enum(["accept", "maybe", "no", "busy"]),
});

export const validateStatus = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    statusSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

const inviteStatusEnum = z.enum(["pending"]);
const createInviteSchema = z.object({
  userId: z.string().uuid({ message: "Invalid userId format" }),
  status: inviteStatusEnum,
  qrCode: z.string().url({ message: "Invalid QR code URL" }),
  isCheckIn: z.boolean(),
  checkInAt: z.null().or(z.string().datetime()).optional(),
});

export const validateInviteBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    createInviteSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

