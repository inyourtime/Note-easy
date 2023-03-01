import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Customer } from "../entity/Customer"
import { validate } from "class-validator"
import { sign } from "../utils/jwtGen"
import * as bcrypt from "bcrypt"


export const healthcheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send("ok")
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body

        const customerExist = await AppDataSource.getRepository(Customer).findOneBy({
            username: username
        })

        if (customerExist) {
            return res.json({
                "error": "username is already exist"
            })
        }

        const newCustomer = Object.assign(new Customer(), {
            username,
            email,
            password
        })

        const err = await validate(newCustomer)
        if (err.length > 0) {
            res.json({
                "error": "Input data validate failed"
            })
        } else {
            const result = await AppDataSource.getRepository(Customer).save(newCustomer)
            return res.status(201).json({
                status: "success",
                customer: {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    registerAt: result.registerAt
                } 
            })
        }
    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    try {
        const customerExist = await AppDataSource.getRepository(Customer).findOneBy({
            email: email
        })
        if (!customerExist) {
            return res.status(401).json({
                message: "Email or password is incorrect"
            })
        }
        // console.log(customerExist)

        const match = await bcrypt.compare(password, customerExist.password)
        if (!match) {
            return res.status(401).json({
                message: "Email or password is incorrect"
            })
        }

        const payload = {
            customer_id: customerExist.id,
            customer_username: customerExist.username,
            customer_email: customerExist.email
        }

        const token = sign(payload, { expiresIn: '1hr' })

        return res.json({
            status: "success",
            token: token
        })

    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const customerDetails = async (req: Request, res: Response, next: NextFunction) => {
    // const {_id, username, email} = req.body
    // @ts-ignore
    const user = req.user
    // console.log(user)
    res.json({
        customer: user
    })
}
