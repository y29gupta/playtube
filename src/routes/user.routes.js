import {Router} from "express"
import {  registerUser,userLogin ,userLogout} from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middlware.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)

    router.route('/login').post(userLogin)
    router.route('/logout').post(verifyJWT,userLogout)


export default router