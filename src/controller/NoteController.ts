import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Category } from "../entity/Category"
import { Customer } from "../entity/Customer"
import { HistoryNote } from "../entity/HistoryNote"
import { Note } from "../entity/Note"

export const createNoteHandler = async (req: Request, res: Response) => { // response config
    const { title, content, categories } = req.body
    // @ts-ignore
    const { customer_id } = req.user

    try {
        const customer = await AppDataSource.getRepository(Customer).findOneBy({
            id: customer_id
        })
        
        const newNote = new Note()
        newNote.title = title
        newNote.content = content
        newNote.customer = customer

        if (categories) {
            let categories_buf = []
            for (const category of categories) {
                const category_ins = await AppDataSource
                    .getRepository(Category)
                    .createQueryBuilder("category")
                    .where("category.name = :categoryName", { categoryName: category })
                    .getOne()
                categories_buf.push(category_ins)
            }
            newNote.categories = categories_buf
        }

        await AppDataSource.getRepository(Note).save(newNote)
        return res.status(201).json({
            message: "success"
        })

    } catch (error) {
        return res.status(409).send(error.message)
    }

}

export const readAllNotesHandler = async (req: Request, res: Response) => {
    try {
        const notes = await AppDataSource.getRepository(Note).find({
            select: {
                customer: {
                    id: true,
                    username: true
                },
            },
            relations: {
                customer: true,
                categories: true
            },
        })

        return res.json(notes)

    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const readOneNoteHandler = async (req: Request, res: Response) => {

    const { noteId } = req.params
    try {
        const note = await AppDataSource.getRepository(Note).findOne({
            where: {
                id: Number(noteId)
            },
            select: {
                customer: {
                    id: true,
                    username: true
                },
            },
            relations: {
                customer: true,
                categories: true
            },
        })

        return res.json(note)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const readAllNoteOfAllCustomerHandler = async (req: Request, res: Response) => {
    try {
        const customer_notes = await AppDataSource.getRepository(Customer).find({
            select: {
                id: true,
                username: true,
                email: true
            },
            relations: {
                notes: true
            }
        })

        return res.json(customer_notes)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const readAllNoteOfOneCustomerHandler = async (req: Request, res: Response) => {

    const customer_id = parseInt(req.params.customerId)
    try {
        const customer_notes = await AppDataSource.getRepository(Customer).findOne({
            where: {
                id: customer_id
            },
            select: {
                id: true,
                username: true,
                email: true
            },
            relations: {
                notes: true
            }
        })

        return res.json(customer_notes)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const addExistNoteCategoryHandler = async (req: Request, res: Response) => {
    const { noteId, categoryId } = req.body
    try {
        const note = await AppDataSource
            .getRepository(Note)
            .createQueryBuilder("note")
            .leftJoinAndSelect("note.categories", "category")
            .where("note.id = :noteId", { noteId: noteId })
            .getOne()

        // console.log(note)
        const category = await AppDataSource
            .getRepository(Category)
            .createQueryBuilder("category")
            .where("category.id = :categoryId", { categoryId: categoryId })
            .getOne()
        // console.log(category)
        note.categories.push(category)
        const result = await AppDataSource.getRepository(Note).save(note)

        return res.json(result)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}

export const updateNoteHandler = async (req: Request, res: Response) => {

    const noteId = parseInt(req.params.noteId)
    const { title, content } = req.body
    try {

        const note = await AppDataSource.getRepository(Note).findOneBy({
            id: noteId
        })
        // console.log(note)

        const newHistoryNote = new HistoryNote()
        newHistoryNote.title = note.title
        newHistoryNote.content = note.content
        newHistoryNote.version = note.version
        newHistoryNote.updatedAt = note.updatedAt
        newHistoryNote.note = note

        const updatedNote = await AppDataSource.getRepository(Note).create({
            ...note,
            content: content,
            title: title,
            version: note.version + 1
        })
        await AppDataSource.getRepository(HistoryNote).save(newHistoryNote)
        const result = await AppDataSource.getRepository(Note).save(updatedNote)
        return res.json(result)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}

