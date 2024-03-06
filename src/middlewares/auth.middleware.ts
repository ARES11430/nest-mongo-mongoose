import { HttpException, NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { JWT_PRIVATE_KEY } from '../config/configs'

import * as jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

@Injectable()
export class Authentication implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const token = req.header('x-auth-token')
        if (!token) throw new HttpException('this page does not exist', 404)

        if (!JWT_PRIVATE_KEY) throw new HttpException('please provide a jwt secret', 404)

        try {
            const decoded = jwt.verify(token, JWT_PRIVATE_KEY)
            req.user = decoded
            next()

        } catch (error) {
            throw new HttpException('invalid token', 400)
        }
    }
}

@Injectable()
export class IsAdmin implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        if (!req.user || !req.user.isAdmin) {
            throw new HttpException('this page does not exist', 404)
        }
        next()
    }
}