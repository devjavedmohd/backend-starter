import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../models/prismaClient.js'; // create and export prisma client once

// import { createUser, findUserByEmail } from '../models/userModel.js'

// User registeration api
export async function register(req, res) {
    const { name, email, password } = req.body;
    // const existing = findUserByEmail(email);
    const existing = await prisma.user.findUnique({
        where: { email }
    })

    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    // const user = createUser({ name, email, password: hashed });
    // console.log(user)
    // res.json({
    //     message: "Registered",
    //     user: {
    //         name: name,
    //         email: email
    //     }
    // });
    const user = await prisma.user.create({
        data: { name, email, password: hashed, role: 'USER' },
    });

    res.status(201).json({ message: "User registered successfully", user });
}

// User login api
export async function login(req, res) {
    const { email, password } = req.body;

    // const user = findUserByEmail(email);
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res.json({ message: `Logged in with user: (${user.name}, ${user.email})`, token });
}

export async function profile(req, res) {
    res.json({ message: "Profile", user: req.user });
}

export async function posts(req, res) {

}