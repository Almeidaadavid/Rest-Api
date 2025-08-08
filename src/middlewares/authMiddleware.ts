import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
    id: number
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Token não informado.");
    }

    try {
        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_TOKEN ?? '') as JwtPayload

        const user = await userRepository.findOne({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(401).json('Usuário não autorizado.')
        }

        const { password: _, ...loggedUser} = user;

        req.user = loggedUser;
        next();
    } catch (error) {   
        return res.status(401).json("Usuário não autorizado");
    }
}

export default auth;