import * as jwt from "jsonwebtoken"

const privateKey = "safnjskldnafdmajklbgjnbwiadkl243534"

export function sign(object: Object, option?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, option)
}