import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthController {
    async login(req: Request, res: Response) {
        const {email, password} = req.body;

        const user = await userRepository.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(400).json('Email ou senha inválidos.');
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json('Email ou senha inválidos.');
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_TOKEN ?? '', {
            expiresIn: '1d'
        });

        const {password: _, ...userLogin} = user;

        return res.json({
            user: userLogin,
            token: token,
        });
    }
}