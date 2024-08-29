import UserService, { UserInput } from "../../services/user";

const queries = {
    getUsers: async (_: any) => {
        const res = await UserService.getUsers();
        return res;
    }
};

const mutations = {
    createUser: async (_: any, { userInput }: { userInput: UserInput }) => {
        const res = await UserService.createUser(userInput);
        return res;
    }
};

export const resolvers = {
    queries,
    mutations,
};