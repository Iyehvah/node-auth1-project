const express = require("express")
const Users = require("../users/users-model")
const bcrypt = require("bcryptjs")
const router = express.Router()
const { restrict , sessions } = require("../middleware/restrict")

router.post("/register", async (req, res, next) => {
    try {
        //when a user send this request after hitting the sign up! button it will grab the username out of the username box here
        const { username } = req.body

        //and when the users username is sent to our database it will search our database to see if that username is already taken here
        const user = await Users.findBy( { username } ).first()
        if(user) {
            return res.status(409).json({
                message: "Sorry, username is already in use."
            })
        }
        //IF username is NOT taken then the user will be STORED to our database
        res.status(201).json(await Users.add(req.body))
    } catch(error) {
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({username}).first()
        const passwordValidation = await bcrypt.compare(password, user.password)

        if(!user || !passwordValidation) {
            return res.status(401).json({
                message: "Invalid Credentials",
            })
        }

        req.session.user = user
        res.json({
            message: `Welcome ${user.username}`,
        })

    } catch(error) {
        next(error)
    }
})

router.get("/logout", restrict(), (req, res, next) => {
	req.session.destroy((error) => {
		if (error) {
			next(error)
		} else {
			res.json({
				message: "Logged out successfully!"
			})
		}
	})
})

module.exports = router