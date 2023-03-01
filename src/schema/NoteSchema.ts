import { object, string, array } from "yup"

const payload = {
    body: object({
        title: string().required("Title is required"),
        content: string().required("Content is required"),
        categories: array()
    })
}

const params = {
    params: object({
        noteId: string().required("noteId is required")
    })
}

export const createNoteSchema = object({
    ...payload
})

export const updateNoteSchema = object({
    ...payload,
    ...params
})