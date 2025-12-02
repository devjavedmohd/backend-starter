import jwt from 'jsonwebtoken';
// import { findUserByEmail } from '../models/userModel.js';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function auth(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(' ')[1];
    // console.log("Token:", token);

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = findUserByEmail(decoded.email);
        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // Remove sensitive fields like password before attaching
        const { password, ...safeUser } = user;

        // req.user = {
        //     name: user.name,
        //     email: user.email
        // };
        req.user = safeUser;
        next();
    }
    catch (err) {
        console.log("JWT verify error:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
}

export function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: insufficient permissions" });
        }
        next();
    };
}

