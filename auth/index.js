const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
var hash = '';

const index = (req, res, next) => {
	res.json({
		message: '🔐'
	});
};

const signUp = (req, res, next) => {
	const user = req.body;
	bcrypt.hash(user.password, 10, (err, hash) => {
		user.password = hash;
		this.hash = hash;
		res.json({
			message: 'Succesfully created ✅!',
			data: {
				username: user.username
			}
		});
	});
};

const login = (req, res, next) => {
	const user = req.body;
	bcrypt.compare(user.password, this.hash, (err, ans) => {
		if(ans === true){
			res.json({
				message: 'Succesfull login ✅!',
				data: {
					username: user.username
				}
			});
		} else {
			res.json({
				message: 'Failed login ✅!',
			});
		}
	});
};

router.get('/', index);
router.post('/signUp', signUp);
router.post('/login', login);

module.exports = router;
