import { object, string, ref } from "yup"

export const createCustomerSchema = object({
    body: object({
        username: string().required("Username is required"),
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Password must match"
        )
    })
})

export const createCustomerTokenSchema = object({
    body: object({
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    })
})