import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/DB";

const JWT_SECRET = "$ECRE!";

export interface CreateUserInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
};

export interface UserTokenInput {
    email: string,
    password: string
}

class UserService {
    public static async getUsers() {
        const users = await prismaClient.user.findMany();
        return users;
    }

    public static async createUser(payload: CreateUserInput) {
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

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } });
    }

    public static async getUserToken(payload: UserTokenInput) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);

        if(!user) throw new Error("User not found");

        // check if password matches with DB
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) throw new Error("Invalid password");

        // generate token
        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;
    }
}

export default UserService;