import bcrypt from "bcrypt";
import { prismaClient } from "../lib/DB";

export interface UserInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
};

class UserService {
    public static async getUsers() {
        const users = await prismaClient.user.findMany();
        return users;
    }

    public static async createUser(payload: UserInput) {
        const { firstName, lastName, email, password } = payload;

        const securePassword = await bcrypt.hash(password, 10);

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: securePassword,
        };

        const user = await prismaClient.user.create({
            data: userData
        });
        return user.id;
    }
}

export default UserService;