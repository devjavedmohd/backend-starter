// const users = []; // temporary storage

// export function createUser(user) {
//     users.push(user);
//     return user;
// }

// export function findUserByEmail(email) {
//     return users.find((user) => user.email === email);
// }

// import { PrismaClient } from '@prisma/client';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function createUser(data) {
    return await prisma.user.create({ data })
}

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { email },
        include: { posts: true }
    })
}