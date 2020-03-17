const sessions = {}


function restrict() {

	return async (req, res, next) => {
		try {
			const authError = {
				message: "Invalid Credentials",
			}
			//install express session to get this shortened code block
			if(!req.session || !req.session.user) {
				return res.status(401).json(authError)
			}
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	sessions,
	restrict,
}