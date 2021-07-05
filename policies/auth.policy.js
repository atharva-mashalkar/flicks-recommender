const JWTService = require("../services/auth.service");

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = (req, res, next) => {
	let token;

	if (req.header("Authorization")) {
		const parts = req.header("Authorization").split(" ");

		if (parts.length === 2) {
			const scheme = parts[0];
			const credentials = parts[1];

			if (/^Bearer$/.test(scheme)) {
				token = credentials;
			} else {
				return res
					.status(403)
					.json({ msg: "Format for Authorization: Bearer [token]" });
			}
		} else {
			return res
				.status(403)
				.json({ msg: "Format for Authorization: Bearer [token]" });
		}
	} else if (req.body.token) {
		token = req.body.token;
		delete req.query.token;
	} else {
		return res.status(403).json({ msg: "No Authorization was found" });
	}
	return JWTService.verify(token, async (err, userInfo) => {
		if (err) {
			return res.status(403).json({ err });
		} else {
			token = await JWTService.refresh(token);
			res.header("Authorization", token)
		}
		req.user = userInfo;
		return next();
	});
};
