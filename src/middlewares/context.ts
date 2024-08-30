import UserService from "../services/user";

async function contextMiddleware({ req, res }: { req: any, res: any }) {
    const token = req.headers["token"];
    try {
        const user = UserService.decodeJWTToken(token);
        return { user };
    } catch(error) {
        return {};
    }
}

export default contextMiddleware;