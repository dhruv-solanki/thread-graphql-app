import UserService, { CreateUserInput, UserTokenInput } from "../../services/user";

const queries = {
    getUsers: async (_: any) => {
        const res = await UserService.getUsers();
        return res;
    },
    getUserToken: async (_: any, {userTokenInput }: { userTokenInput: UserTokenInput }) => {
        const token = await UserService.getUserToken(userTokenInput);
        return token;
    }
};

const mutations = {
    createUser: async (_: any, { userInput }: { userInput: CreateUserInput }) => {
        const res = await UserService.createUser(userInput);
        return res;
    }
};

export const resolvers = {
    queries,
    mutations,
};