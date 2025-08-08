import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

type JwtPayload = {
        id: number
    }

export class UserController {
    async create(req: Request, res: Response) {
        const {name, email, password} = req.body

        const UserExist = await userRepository.findOneBy({email: email});
        
        if (UserExist) {
            return res.status(400).json('Email já existe');
            // throw new BadRequest()
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name: name,
            email: email,
            password: hashPassword
        });

        await userRepository.save(newUser);

        const {password: _, ...user} = newUser;

        return res.status(201).json(user);
    }

    async getProfile(req: Request, res: Response) {
        const userPayload = req.user;
        return res.json(userPayload);
    }
}