let express = require('express'),
    router = express.Router(),
    authenticate = require('../middleware/token'),
    adminServices = require('../Services/adminServices/admin');

/* Admin Info Management */

router.post('/login', (req, res) => {
    adminServices.adminLogin(req.body, (data) => {
        res.send(data);
    });
});

router.post('/resetPassword', (req, res) => {
    adminServices.resetPassword(req.body, (data) => {
        res.send(data);
    });
});

router.get('/forgotPassword', (req, res) => {
    adminServices.forgotPassword(req.query, (data) => {
        res.send(data);
    });
});

router.get('/forgotPassword', (req, res) => {
    adminServices.forgotPassword(req.query, (data) => {
        res.send(data);
    });
});

router.get('/verifyToken', (req, res) => {
    adminServices.tokenVerify(req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

/* ------- END -------- */



/* App User Management */

router.get('/userLists', (req, res) => {
    adminServices.userLists(req.query, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.get('/actionUser', (req, res) => {
    adminServices.actionUser(req.query, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

/* ------- END -------- */


/* Featured Category */
router.post('/featureCategoryList', (req, res) => {
    adminServices.featureCategoryList(req.body, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.post('/addFeatureCategory', (req, res) => {
    adminServices.addFeatureCategory(req.body, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.post('/editFeatureCategory', (req, res) => {
    adminServices.editFeatureCategory(req.body, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.get('/actionCategory', (req, res) => {
    adminServices.actionCategory(req.query, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.post('/changePositionCategory', (req, res) => {
    adminServices.changePositionCategory(req.body, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});
/* ------- END -------- */


/* Course Management */

router.post('/courseLists', (req, res) => {
    adminServices.courseLists(req.body, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.post('/addCourse', (req, res) => {
    adminServices.addCourse(req, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.post('/editCourse', (req, res) => {
    adminServices.editCourse(req, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.get('/courseDetails/:course_id', (req, res) => {
    adminServices.courseDetails(req.params, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.get('/actionCourses', (req, res) => {
    adminServices.actionCourses(req.query, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});
/* ------- END -------- */

/* Banners Management */
router.post('/bannerList', (req, res) => {
    adminServices.bannerList(req.body, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.post('/addBanner', (req, res) => {
    adminServices.addBanner(req, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.post('/editBanner', (req, res) => {
    adminServices.editBanner(req, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});

router.get('/actionBanner', (req, res) => {
    adminServices.actionBanner(req.query, req.headers.accesstoken, (data) => {
        res.send(data);
    });
});
/* ------- END -------- */
module.exports = router;