import { Router } from "express"
import { requiresUser } from "../middleware/requiresUser"
import {
    createNoteHandler,
    readAllNotesHandler,
    readAllNoteOfAllCustomerHandler,
    readAllNoteOfOneCustomerHandler,
    addExistNoteCategoryHandler,
    readOneNoteHandler,
    updateNoteHandler,
} from "../controller/NoteController"
import {
    createNoteSchema, 
    updateNoteSchema
} from "../schema/NoteSchema"
import { validateRequest } from "../middleware/validateRequest"
import { readHistoryOfOneNote } from "../controller/HistoryNoteController"


const router = Router()

router.get("/api/notes/customer", readAllNoteOfAllCustomerHandler)
router.get("/api/notes/customer/:customerId", readAllNoteOfOneCustomerHandler)
router.get("/api/notes", readAllNotesHandler)
router.get("/api/notes/:noteId", readOneNoteHandler)
router.put("/api/notes/category", requiresUser, addExistNoteCategoryHandler)
router.post("/api/notes", [requiresUser, validateRequest(createNoteSchema)], createNoteHandler)
router.put("/api/notes/:noteId", [requiresUser, validateRequest(updateNoteSchema)], updateNoteHandler)
router.get("/api/notes/history/:noteId", readHistoryOfOneNote)
router.delete("/notes/:noteId") // not yet done

export default router
