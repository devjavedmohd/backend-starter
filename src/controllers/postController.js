import { prisma } from '../models/prismaClient.js'; // create and export prisma client once

export async function createPost(req, res) {
    const { title, content } = req.body;
    const userEmail = req.user.email; // from auth middleware

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: { email: userEmail }
                }
            }
        });
        res.status(201).json({ message: "Post created", post });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
}

export async function getPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            include: { author: { select: { name: true, email: true } } }
        });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
}
