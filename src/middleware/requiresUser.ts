import { Request, Response, NextFunction } from "express"

export const requiresUser = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user
    if (!user) {
        return res.sendStatus(403)
    }

    return next()

}