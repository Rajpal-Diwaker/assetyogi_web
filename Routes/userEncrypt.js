const express = require('express'),
    router = express.Router(),
    authenticate = require('../middleware/token'),
    userService = require('../Services/userEncrypt/userEncrypt');

/* Without Login Api's */

router.get('/homeScreenNoLogin', (req, res) => {
    userService.homeScreenNoLogin((data) => {
        res.send(data);
    });
});

router.get('/courseDetailsNoLogin/:course_id', (req, res) => {
    userService.courseDetailsNoLogin(req.params, (data) => {
        res.send(data);
    });
});

/* ------------------------------- End -------------------------------- */

router.post('/signIn', (req, res) => {
    userService.signIn(req.body, (data) => {
        res.send(data);
    });
});

router.get('/verifyOTP', (req, res) => {
    userService.verifyOTP(req.query, req.headers.access_token, (data) => {
        res.send(data);
    });
});

router.get('/verifyOTPWebsite', (req, res) => {
    userService.verifyOTPWebsite(req.query, (data) => {
        res.send(data);
    });
});

router.post('/addProfile', (req, res) => {
    userService.addProfile(req.body, req.headers.access_token, (data) => {
        res.send(data);
    });
});

router.get('/homeScreen', authenticate.verifyToken, (req, res) => {
    userService.homeScreen(req, req.headers.access_token, (data) => {
        res.send(data);
    });
});

router.get('/courseDetails/:course_id', authenticate.verifyToken, (req, res) => {
    userService.courseDetails(req.params, req.headers.access_token, (data) => {
        res.send(data);
    });
});

router.get('/categoryDetails/:category_id', authenticate.verifyToken, (req, res) => {
    userService.categoryDetails(req.params, req.headers.access_token, (data) => {
        res.send(data);
    });
});

router.get('/logout', (req, res) => {
    userService.logout(req.headers.access_token, (data) => {
        res.send(data);
    });
});

router.get('/getTemplate/:screen', (req, res) => {
    userService.getTemplate(req.params, (data) => {
        res.send(data);
    });
});

router.post('/addStuff', authenticate.verifyToken, (req, res) => {
    userService.addStuff(req.body, req.headers.access_token, (data) => {
        res.send(data);
    });
});

router.get('/stuffs', authenticate.verifyToken, (req, res) => {
    userService.stuffs(req, req.headers.access_token, (data) => {
        res.send(data);
    });
});
module.exports = router;