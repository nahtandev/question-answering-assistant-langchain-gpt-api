/**
 * File name: db.js
 * Description: This file initializes a database connection using Prisma
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 14/05/2023
 */

const { PrismaClient } = require('@prisma/client');
const { prismaUrl } = require('./configs').databaseConfig;

// Initialize connection
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: prismaUrl,
    },
  },
  log: ['query', 'info', 'warn'],
});

// Test database connection
(async () => {
  prisma
    .$connect()
    .then(async (success) => {
      console.log('Database service started succeful');
      await prisma.$disconnect();
    })
    .catch(async (error) => {
      console.log('Database service start failed');
      console.log('Error: ', error);
      await prisma.$disconnect();
    });
})();

module.exports = prisma;
