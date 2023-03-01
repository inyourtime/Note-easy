import { Request, Response, NextFunction } from "express"

export const validateRequest = (schema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            params: req.params
        })
        return next()
    } catch (error) {
        return res.status(400).send(error);
    }
}