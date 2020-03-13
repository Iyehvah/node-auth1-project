const express = require("express")
const helmet = require("helmet")
const usersRouter = require("./users/users-router")
const welcomeRouter = require("./welcome/welcome-router")
const authRouter = require("./auth/auth-router")
const server = express()
const port   = process.env.PORT || 3000

server.use(helmet())
server.use(express.json())

//ROUTES
server.use("/users", usersRouter)
server.use("/welcome", welcomeRouter)
server.use("/auth", authRouter)

server.get("/", (req, res, next) => {
    res.json({
        message: "welcome to roberts API"
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something wewnt wrong"
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})