// server/lib/prisma.js
const { PrismaClient } = require('@prisma/client'); // Default node_modules import

const prisma = new PrismaClient();

module.exports = prisma;
