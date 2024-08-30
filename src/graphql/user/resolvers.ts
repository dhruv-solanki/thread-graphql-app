import UserService, { CreateUserInput, UserTokenInput } from "../../services/user";

const queries = {
    getUsers: async (_: any, parameters: any, context: any) => {
        if(context && context.user) {
            const res = await UserService.getUsers();
            return res;
        }
        throw new Error("I don't know who are you!");
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