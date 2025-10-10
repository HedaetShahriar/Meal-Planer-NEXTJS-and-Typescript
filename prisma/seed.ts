import { PrismaClient, Role } from "$/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = "super@admin.com";
    const ExistingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!ExistingAdmin) {
        const hashedPassword = await bcrypt.hash ("Super@123",10)
        const admin =await prisma.user.create({
            data: {
                name: "Super Admin",
                email: adminEmail,
                password: hashedPassword,
                role: Role.ADMIN,
            },
        });
        console.log("Admin user created:", admin);
    }else{
        console.log("Admin user already exists:", ExistingAdmin);
    }
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});