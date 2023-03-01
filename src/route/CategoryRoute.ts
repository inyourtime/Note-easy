import { Router } from "express"
import { requiresUser } from "../middleware/requiresUser"
import { 
    createCategoryHandler,
    readAllCategoryHandler, 
    readAllCategoryNoteHandler
} from "../controller/CategoryController"

const router = Router()

router.post("/api/category", requiresUser, createCategoryHandler)
router.get("/api/category", readAllCategoryHandler)
router.get("/api/category/note", readAllCategoryNoteHandler)

export default router
