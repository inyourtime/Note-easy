import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const privateKey = "safnjskldnafdmajklbgjnbwiadkl243534"

    const jwtToken = req.header('token')
    if (!jwtToken) {
        return next()
    }

    try {
        const payload = jwt.verify(jwtToken, privateKey)
        // console.log(payload)
        // @ts-ignore
        req.user = payload
        return next()
    } catch (error) {
        return next()
    }
}