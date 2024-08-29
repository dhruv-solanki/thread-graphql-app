import { prismaClient } from "../../lib/DB";

interface UserInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
};

const queries = {
    getUsers: async (_: any) => {
        const users = await prismaClient.user.findMany();
        return users;
    }
};

const mutations = {
    createUser: async (_: any, { userInput }: { userInput: UserInput }) => {
        const userData = {
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            email: userInput.email,
            password: userInput.password,
        };

        await prismaClient.user.create({
            data: userData
        });
        return true;
    }
};

export const resolvers = {
    queries,
    mutations,
};