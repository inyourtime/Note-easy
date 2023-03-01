import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Category } from "../entity/Category"

export const createCategoryHandler = async (req: Request, res: Response) => {

    const { name } = req.body
    try {
        const category_exist =  await AppDataSource.getRepository(Category).findOneBy({
            name: name
        })
        if (category_exist) {
            return res.status(400).json("this category is already have")
        }

        const newCategory = new Category()
        newCategory.name = name
        const result = await AppDataSource.getRepository(Category).save(newCategory)

        return res.status(201).json({
            message: "success",
            category: result
        })

    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const readAllCategoryHandler = async (req: Request, res: Response) => {
    try {
        const categories = await AppDataSource
                .getRepository(Category)
                .createQueryBuilder("category")
                .getMany()

        return res.json(categories)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const readAllCategoryNoteHandler = async (req: Request, res: Response) => {
    try {
        const category_note = await AppDataSource.getRepository(Category).find({
            relations: {
                notes: true
            }
        })

        return res.json(category_note)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}