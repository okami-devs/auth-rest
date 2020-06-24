const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');

const db = require('../db');
const users = db.get('users');
users.createIndex('username', {unique: true});

const router = express.Router();

const userSchema = Joi.object({
	username: Joi.string().alphanum().min(6).max(20).required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
})

var hash = '';

const index = (req, res, next) => {
	res.json({
		message: '🔐'
	});
};

const signUp = (req, res, next) => {
	const {error, value} = userSchema.validate(req.body);
	if(!error) {		
		bcrypt.hash(value.password, 10, (err, hash) => {
			users.insert({username: value.username, password: hash}).then((usr) =>{
				res.json({
					message: 'Succesfully created ✅!',
					data: {
						username: usr.username
					}
				});
			}).catch(() => {
				const error = new Error('The users is already created');
				next(error);
			});
		});
	}else {
		next(error);
	}
};

const login = (req, res, next) => {
	const user = req.body;
	users.findOne({username: user.username}).then((usr) => {
		console.log(usr);
		bcrypt.compare(user.password, usr.password, (err, ans) => {
			if(ans === true){
				res.json({
					message: 'Succesfull login ✅!',
					data: {
						username: usr.username
					}
				});
			} else {
				const error = new Error('Please check your username or password');
				next(error);
			}
		});
	}).catch((e) => next(e));
};

router.get('/', index);
router.post('/signUp', signUp);
router.post('/login', login);

module.exports = router;
