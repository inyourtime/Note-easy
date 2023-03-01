import * as express from "express"
import { AppDataSource } from "./data-source"
import AuthRoute from "./route/AuthRoute"
import NoteRoute from "./route/NoteRoute"
import CategoryRoute from "./route/CategoryRoute"
import { deserializeUser } from "./middleware/deserializeUser"


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    // app.use(bodyParser.json())

    // register express routes from defined application routes
    app.use(deserializeUser)
    app.use(AuthRoute)
    app.use(NoteRoute)
    app.use(CategoryRoute)

    // start express server
    app.listen(3000)
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
