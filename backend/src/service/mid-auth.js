import jwt from "jsonwebtoken";

// Middleware de autenticação Testar se ta funcionando
const mid = (req, res, next) => {
    const isLoginRoute = req.path === "/login" && req.method === "POST";
    const isRegisterRoute = req.path === "/users" && req.method === "POST";
    const isResetPasswordRoute = req.path === "/password-reset" && req.method === "POST";

    if (isLoginRoute || isRegisterRoute || isResetPasswordRoute) {
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "secretkey", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido." });
        }

        req.userId = decoded.id;
        next();
    });

}
export default mid;