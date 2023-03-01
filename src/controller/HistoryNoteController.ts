import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Note } from "../entity/Note"

export const readHistoryOfOneNote = async (req: Request, res: Response) => {

    const noteId = parseInt(req.params.noteId)
    try {
        const his_note = await AppDataSource.getRepository(Note).findOne({
            where: {
                id: noteId
            },
            select: {
                customer: {
                    id: true,
                    username: true
                },
            },
            relations: {
                history_notes: true,
                customer: true
            }
        })

        return res.json(his_note)
    } catch (error) {
        return res.status(409).send(error.message)
    }
}