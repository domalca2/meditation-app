import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const nuevoUsuario = await prisma.user.create({
        data: {
            name: 'Prueba',
            passwordHash:'has1234',
            joinDate: new Date(),
            emailId: null 
        },
    });
    console.log('Usuario insertado:', nuevoUsuario);
}

main()
    .catch(e => {
        console.error('Error:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
