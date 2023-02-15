const config = require("./config").config,
	nodemailer = require('nodemailer'),
	async = require('async'),
	fs = require('fs'),
	template = require('./template'),
	Chance = require('chance');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.main_key);
const request = require('request');

//Cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: "mani1995",
	api_key: "912197341565921",
	api_secret: "1BDPtw6l6ew-7yNU22D3Y6mLnSU"
});

/* Changed */
secret = 'TjkkjFIGLH6095695twIMJVg34OehKwdEC';

// Define Error Codes
const statusCode = {
	OK: 200,
	FOUR_ZERO_ONE: 401,
	TWO_ZERO_ONE: 201,
	TWO_ZERO_TWO: 202,
	TWO_ZERO_THREE: 203,
	TWO_ZERO_FOUR: 204,
	INTERNAL_SERVER_ERROR: 400,
	FOUR_ZERO_ZERO: 400,
	BAD_REQUEST: 404,
	FIVE_ZERO_ZERO: 500,
	THREE_ZERO_ZERO: 300,
	BLOCKED_FROM_ADMIN: 505,
	LOGIN_ANOTHER_DEVICE: 506,
	NUMBER_EXISTS: 205,
	USER_COUNT_PLAY: 206,
	ACCESS_TOKEN_ERR: 501
};

// Define Error Messages
const statusMessage = {
	PARAMS_MISSING: 'Mandatory Fields Missing',
	SERVER_BUSY: 'Our Servers are busy. Please try again later.',
	PAGE_NOT_FOUND: 'Page not found',
	SUCCESS: "Success.",
	USER_ALREADY_EXITS: "An account with this email already exists. Please log in.",
	USER_NOT_EXITS: "User does not exist.",
	INVALID_TOKEN: "User authentication failed.",
	INVALID_TOKEN_ADMIN: "Admin authentication failed.",
	OLD_TOKEN: "Please provide new token",
	INVALID_PASS: "Invalid password.",
	INVALID_OTP: "Invalid OTP.",
	RESEND_OTP: "OTP Expired , Please resend OTP.",
	VERIFY_NUMBER: "Please verify your mobile number before login.",
	STATUS_UPDATED: "User profile update successfully.",
	MECHANT_INSERTED: "Merchant added successfully.",
	PASSWORD_CHNAGED: "Password changed successfully.",
	DB_ERROR: "Something went Wrong.",
	EMAIL_SENT: "Password reset link has been sent on your registered email address",
	USER_ADDED: "User sign up successful",
	LOGIN_SUCCESS: "Please verify your account using the Code that has been sent to your mobile",
	EMAIL_VERIFY: "Signed up successfully. Please verify your account using the Code that has been sent to your email.",
	EMAIL_VERIFY_RESEND: "Please verify your account using the Code that has been sent to your email.",
	EMAIL_NOT_VALID: "Invalid Credentials",
	PASSWORD_NOT_VALID: "Invalid Credentials",
	CHECK_EMAIL_VERIFY: "Please verify your email.",
	LOGIN_ANOTHER_DEVICE: "You are login with another device",
	ACCESS_TOKEN_ERR: "Access Token is Invalid",
	BLOCKED_FROM_ADMIN: 'BLOCKED FROM ADMIN',
	DISABLED_FROM_ADMIN: 'ACCESS DENIED',
	PLEASE_SIGNUP: 'Please Signup.',
	MOBILE_VERIFY_RESEND: "Please verify your account using the Code that has been sent to your mobile.",
	COUNT_SUCCEED: 'Already have 4 Common Suport topic.',
	NUMBER_EXISTS: 'Mobile Number Already Registered',
	EMAIL_EXISTS: 'Email Already Registered',
	ADMIN_EMAIL_ERROR: 'Not Registered with Findemy',
	SOCIAL_OVER_NORMAL: "This user signed up using Google login. Please go back to previous screen and use 'Continue with Google'"
};

const generatePassword = (data) => {
	const Cryptr = require('cryptr');
	const cryptr = new Cryptr(process.env.main_key);
	const encryptedString = cryptr.encrypt(data);
	return encryptedString
}

const generateToken = () => {
	return Date.now() + Math.floor(Math.random() * 99999) + 1000;
}

const generateUid = () => {
	const chance = new Chance(Date.now() + Math.random());
	let randomStr = chance.string({
		length: 25,
		pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	});
	return randomStr;
}

const getDigits = () => {
	var idLength = 4;
	var chars = "1,2,3,4,5,6,7,8,9,0";
	chars = chars.split(",");
	var min = 0;
	var max = chars.length - 1;
	var id = "";
	for (var i = 0; i < idLength; i++) {
		id += chars[Math.floor(Math.random() * (max - min + 1) + min)];
	}
	// return id;
	return '1234';
}

const image_upload = async (data, callback) => {
	if (data) {
		let res_promises = data.file.map(file => new Promise((resolve, reject) => {
			cloudinary.uploader.upload(file.path, function (result) {
				resolve(result.secure_url)
			}, { resource_type: "auto" })
		}))
		Promise.all(res_promises)
			.then((result) => {
				callback(null, result)
			})
			.catch((error) => {
				callback(null, [])
			})
	}
	else {
		callback(null, [])
	}
}


let forgotPasswordAdmin = (criteria, callback) => {
	let html = template.forgotPasswordAdmin(criteria.link);

	function remove_linebreaks(str) {
		return str.replace(/[\r\n]+/gm, "");
	}
	html = remove_linebreaks(html);
	transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			"user": config.EMAIL_CONFIG.auth.user,
			"pass": config.EMAIL_CONFIG.auth.pass
		}
	})
	let messageObj = {
		from: config.EMAIL_CONFIG.auth.user,
		to: criteria.email,
		subject: criteria.subject,
		html: html,
		cc: null,
		bcc: null
	}

	transporter.sendMail(messageObj, (err, info) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, info)
		}
	})
}

module.exports = {
	secret: secret,
	generateToken: generateToken,
	generateUid: generateUid,
	getDigits: getDigits,
	statusCode: statusCode,
	statusMessage: statusMessage,
	generatePassword: generatePassword,
	image_upload: image_upload,
	forgotPasswordAdmin: forgotPasswordAdmin
}