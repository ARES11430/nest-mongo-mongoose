import { HttpException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { Types } from 'mongoose'

// ! check objectId validation for req.params.fieldname
export default function validateObjectId(fieldName: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        const paramId = req.params[fieldName]

        if (!Types.ObjectId.isValid(paramId)) {
            throw new HttpException('invalid id', 404)
        }
        return next()
    }
}