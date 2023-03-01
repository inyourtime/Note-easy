import { Router } from "express"
import { signup, signin, healthcheck, customerDetails } from "../controller/AuthController"
import { requiresUser } from "../middleware/requiresUser"
import { validateRequest } from "../middleware/validateRequest"
import {
    createCustomerSchema,
    createCustomerTokenSchema
} from "../schema/CustomerSchema"

const router = Router()

router.get("/healthcheck", healthcheck)
router.post("/api/customer", validateRequest(createCustomerSchema), signup)
router.post("/api/customer/signin", validateRequest(createCustomerTokenSchema), signin)
router.get("/api/customer", requiresUser, customerDetails)

export default router
