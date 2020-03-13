const express = require("express")
const Users = require("./users-model")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(error) {
        next(error)
    }
})

module.exports = router