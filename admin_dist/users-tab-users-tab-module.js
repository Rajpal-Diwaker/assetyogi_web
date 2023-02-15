(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-tab-users-tab-module"],{

/***/ "./src/app/users-tab/users-list/users-list.component.css":
/*!***************************************************************!*\
  !*** ./src/app/users-tab/users-list/users-list.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-avatar {\r\n    position: relative;\r\n    width: 200px;\r\n    height: 200px;\r\n    overflow: hidden;\r\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n}\r\n#green {\r\n    color: #333;\r\n    background-color: #0cec13;\r\n    border-color: #ccc;\r\n}\r\n.card-avatar img {\r\n    position: absolute;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    top: 50%;\r\n    left: 50%;\r\n    max-width: 100%;\r\n}\r\n.card-title{\r\n    max-width: 100%;\r\n    word-break: break-all;\r\n    margin-left: 10px;\r\n}\r\n.card-body{\r\n    text-align: center;\r\n}\r\n.card-body h4{\r\n    text-align: center;\r\n    margin: 5px auto;\r\n}\r\n.welcome_text .fa-trash {\r\n    margin-left: 15px;\r\n}\r\n.search_box {\r\n    width: 100%;\r\n    float: right;\r\n    margin-right: 25px;\r\n    margin-top: 25px;\r\n}\r\n.search_box,\r\n.search_box .form-group {\r\n    position: relative;\r\n    margin-left: 10px;\r\n    float: left;\r\n}\r\n.search_box input {\r\n    padding: 5px 25px;\r\n}\r\n.search_box .fa {\r\n    position: absolute;\r\n    top: 10px;\r\n    left: 7px;\r\n}\r\n.btn-success {\r\n    width: 150px;\r\n    color: #ffffff;\r\n    padding: 11px;\r\n    font-weight: bold;\r\n    font-size: 18px;\r\n    box-shadow: 5px 10px 18px #f5f5f5;\r\n    border: 0;\r\n    border-radius: 8px;\r\n    background-color: #5c67b8a3;\r\n    margin-bottom: 20px;\r\n}\r\n.btn-success_del {\r\n    width: 112px;\r\n    color: #ffffff;\r\n    padding: 11px;\r\n    font-weight: bold;\r\n    font-size: 18px;\r\n    box-shadow: 5px 10px 18px #f5f5f5;\r\n    border: 0;\r\n    border-radius: 8px;\r\n    background-color: #ff0000a3;\r\n    margin-bottom: 20px;\r\n}\r\n.btn-default {\r\n    background-color: blue;\r\n    color: #ffff;\r\n    padding: 10px 29px;\r\n    outline: none;\r\n    box-shadow: none;\r\n    border: 0;\r\n    border-radius: 6px;\r\n    font-weight: bold;\r\n    float: right;\r\n}\r\n.table>thead>tr>th {\r\n    vertical-align: bottom;\r\n    border-bottom: 2px solid #ddd;\r\n    font-size: 16px;\r\n    text-align: center;\r\n}\r\n.table>tbody>tr>td,\r\n.table>tbody>tr>th,\r\n.table>tfoot>tr>td,\r\n.table>tfoot>tr>th,\r\n.table>thead>tr>td,\r\n.table>thead>tr>th {\r\n    padding: 8px;\r\n    line-height: 1.42857143;\r\n    vertical-align: top;\r\n    border-top: 1px solid #ddd;\r\n    text-align: center;\r\n    font-size: 14px;\r\n}\r\n.welcome .welcome_text {\r\n    padding: 0;\r\n}\r\nagm-map {\r\n    height: 300px;\r\n}\r\n#mixedExample{\r\n    position: relative;\r\n    z-index: 99999;\r\n}\r\n#mixedExample .closebtn{\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    font-size: 17px;\r\n}\r\n#mixedExample .closebtn .fa{\r\n    color: #fff;\r\n}\r\n#expModalAdd1 .modal-header h4{\r\n    font-family: 'Montserrat-SemiBold';\r\n    text-align: center;\r\n    font-size: 21px;\r\n}\r\n#expModalAdd1 .modal-body p  {\r\n    font-family: 'Montserrat-Medium';\r\n    font-size: 19px;\r\n    text-align: center;\r\n    line-height: 40px;\r\n    color: #6d6d6d;\r\n}\r\n#expModalAdd1 .modal-footer {\r\n    text-align: center;\r\n    padding: 0;\r\n    border: 0px;\r\n    background: #dfdfdf;\r\n}\r\n#expModalAdd1 .modal-footer button  {\r\n    font-family: 'Montserrat-SemiBold';\r\n    font-size: 21px;\r\n    color: #000;\r\n    text-align: center;\r\n    border: 0px;\r\n    border-radius: 4px;\r\n    padding: 9px;\r\n    background: #dfdfdf;\r\n    box-shadow: none;\r\n    outline: none;\r\n    width: 50%;\r\n    border-top-left-radius: 0px;\r\n    border-top-right-radius: 0px;\r\n    display: inline-block;\r\n}\r\n#expModalAdd1 .modal-footer button.yes {\r\n    color: #fff;\r\n    background-image: -ms-linear-gradient( -91deg, rgb(84, 115, 247) 1%, rgb(58, 224, 195) 95%);\r\n    box-shadow: -2.025px 8.769px 7px 0px rgba(58, 224, 195, 0.27);\r\n}\r\n#expModalAdd1 .modal-header{\r\n    padding:2px;\r\n    }\r\n#expModalAdd1 .modal-body h5{\r\n    margin: 0;\r\n    margin-bottom: 10px;\r\n    }\r\n#expModalAdd1 .modal-footer{\r\n    background: #dfdfdf;\r\n    border:0;\r\n    padding: 0;\r\n    }\r\n#expModalAdd1 .modal-footer button {\r\n    color: #000;\r\n    text-align: center;\r\n    background: #dfdfdf;\r\n    width: 49.4%;\r\n    display: inline-block;\r\n    padding: 5px;\r\n    }\r\n#expModalAdd1 .modal-footer button.yes {\r\n    color: #fff;\r\n    background:#3ae0e0;\r\n    box-shadow: -2.025px 8.769px 7px 0px rgba(58, 224, 195, 0.27);\r\n    }\r\n.tablebox{\r\n    max-height: 450px;\r\n    overflow-y: auto;\r\n}\r\n.referralbtn{\r\n    background: #4a9de3;\r\n    padding: 5px 8px;\r\n    color: #fff;\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n}\r\n.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td{\r\n    vertical-align: middle;\r\n}\r\n.welcome{\r\n    padding: 5px;\r\n    margin-top: 0;\r\n}\r\n.welcome .welcome_text{\r\n    padding: 0;\r\n}\r\n.tablebox{\r\nmax-height: 700px;\r\noverflow-y: auto;\r\n}\r\n.datebxxx{\r\n    position: relative;\r\n    display:inline-block;\r\n    margin-right: 10px;\r\n}\r\n.datebxxx input{\r\n    width: 200px;\r\n}\r\n.resetbtn{\r\n    position: absolute;\r\n    right: 2%;\r\n    top: 13%;\r\n}\r\nmdb-carousel-item{\r\n    float: left!important;\r\n    width: 100%!important;\r\n    height: 200px!important;\r\n}\r\nmdb-carousel-item video{\r\n    float: left!important;\r\n    width: 100%!important;\r\n    height: 200px!important;\r\n}\r\n#myModal .modal-content{\r\n    background: #000;\r\n}\r\n#myModal .modal-header{\r\n    padding: 0;\r\n    border: 0;\r\n}\r\n#myModal .modal-header .close {\r\n    margin-top: 0px;\r\n    margin-right: 5px;\r\n    opacity: 1;\r\n    color: #fff;\r\n}\r\n#myModal .videobox{\r\n    position: relative;\r\n    width: 31%;\r\n    display: inline-block;\r\n    margin: 8px 5px;;\r\n}\r\n#myModal .videobox img, #myModal .videobox video{\r\n    max-width:100%;\r\n    vertical-align: top;\r\n}\r\n#videoModal .modal-content{\r\n    background: #000;\r\n}\r\n#videoModal .modal-header{\r\n    padding: 0;\r\n    border: 0;\r\n}\r\n#videoModal .modal-header .close {\r\n    margin-top: 0px;\r\n    margin-right: 5px;\r\n    opacity: 1;\r\n    color: #fff;\r\n}\r\n#videoModal .videobox{\r\n    position: relative;\r\n    width: 31%;\r\n    display: inline-block;\r\n    margin: 8px 5px;;\r\n}\r\n#videoModal .videobox img, #videoModal .videobox video{\r\n    max-width:100%;\r\n    vertical-align: top;\r\n}\r\n.imgwrap img{\r\n    max-width:100%;\r\n}\r\n@media only screen and (max-width: 1800px){\r\n.tablebox {\r\nmax-height: 600px;\r\n}\r\n}\r\n@media only screen and (max-width: 1600px){\r\n.tablebox {\r\nmax-height: 550px;\r\n}\r\n}\r\n@media only screen and (max-width: 1400px){\r\n.tablebox {\r\nmax-height: 500px;\r\n}\r\n}\r\n@media only screen and (max-width: 1270px){\r\n    .search_box{\r\n        width: 40%;\r\n    }\r\n}\r\n@media only screen and (max-width: 1120px){\r\n\r\n    .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{\r\n        font-size: 12px;\r\n    }\r\n    .search_box{\r\n        width: 45%;\r\n    }\r\n    .form-control {\r\n        height: 25px;\r\n        font-size: 10px;\r\n    }\r\n    .report_mnth .bootstrap-select>.dropdown-toggle{\r\n        font-size: 14px!important;\r\n        padding-top: 2px;\r\n    }\r\n    .report_mnth .bootstrap-select.btn-group .dropdown-toggle .caret {\r\n        margin-top: -8px;\r\n    }\r\n    .search_box .fa {\r\n        top: 8px;\r\n        font-size: 10px;\r\n    }\r\n    \r\n}\r\n.searc.form-group{\r\n    position: relative;\r\n}\r\n.searc.form-group .fa{\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 16px;\r\n}\r\n.searc1.form-group .fa{\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 195px;\r\n}\r\n.icon{\r\n    margin: 0px 5px;\r\n}\r\n.icon i.fa{\r\n    margin: 0;\r\n}"

/***/ }),

/***/ "./src/app/users-tab/users-list/users-list.component.html":
/*!****************************************************************!*\
  !*** ./src/app/users-tab/users-list/users-list.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"wrapper\">\r\n\r\n    <!-- Modal End Here -->\r\n    <app-adminsidebar></app-adminsidebar>\r\n    <app-adminheader></app-adminheader>\r\n    <!-- Welcome Section Start Here -->\r\n    <section class=\"dashboard_header_wrap content_wrapper clearfix toggled\">\r\n\r\n\r\n        <!-- Dashboard Section Start Here-->\r\n        <div *ngIf=\"!trash\" class=\"dashboard_data_wrap\">\r\n            <div class=\"dahaboard_heading\" style=\"border-bottom: 1px solid;\r\n            padding-bottom: 10px;\">\r\n                <p>App User Management</p>\r\n            </div>\r\n            <div class=\"dahaboard_heading\">\r\n                <button (click)=\"generateExcel()\" type=\"button\" class=\"btn\">Export</button>\r\n\r\n                <button (click)=\"toTrash(true)\" type=\"button\" class=\"btn btn-style\">Trash</button>\r\n            </div>\r\n            <div class=\"serachdiv_wrap\">\r\n                <i class=\"fa fa-search\" aria-hidden=\"true\" (click)=search()></i>\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Search name, number, email\"\r\n                    (keyup)=searchText($event.target.value,$event)>\r\n            </div>\r\n\r\n\r\n            <div class=\"dashbord_cont_wrapper\">\r\n                <div class=\"dashboard_wrap\">\r\n                    <div>\r\n                        <table class=\"table\">\r\n                            <thead class=\"thead-dark\">\r\n                                <tr>\r\n                                    <th>S.no</th>\r\n                                    <th>User Name<span><i class=\"fa fa-arrow-up\" (click)=listSort(1,1)\r\n                                                style=\"cursor : pointer\"></i><i class=\"fa fa-arrow-down\"\r\n                                                (click)=listSort(-1,1) style=\"cursor : pointer\"></i></span></th>\r\n                                    <th>Email</th>\r\n                                    <th>Subscription Type<span><i class=\"fa fa-arrow-up\" style=\"cursor : pointer\"\r\n                                                (click)=listSort(1,2)></i><i class=\"fa fa-arrow-down\"\r\n                                                style=\"cursor : pointer\" (click)=listSort(1,2)></i></span>\r\n                                    </th>\r\n                                    <th>Mobile</th>\r\n                                    <th>Age<span><i class=\"fa fa-arrow-up\" (click)=listSort(1,3)\r\n                                                style=\"cursor : pointer\"></i><i class=\"fa fa-arrow-down\"\r\n                                                (click)=listSort(-1,3) style=\"cursor : pointer\"></i></span></th>\r\n                                    <th>Signup Date<span><i class=\"fa fa-arrow-up\" (click)=listSort(1,4)\r\n                                                style=\"cursor : pointer\"></i><i class=\"fa fa-arrow-down\"\r\n                                                (click)=listSort(-1,4) style=\"cursor : pointer\"></i></span></th>\r\n                                    <th>Status</th>\r\n                                    <th>Action</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of list ;let i = index;\">\r\n                                    <td>{{i+1}}.</td>\r\n                                    <td>{{item?.user_name ? item?.user_name : '--'}}</td>\r\n                                    <td>{{item?.email ? item?.email : '--'}}</td>\r\n                                    <td>Free Trial</td>\r\n                                    <td>{{item?.country_code}} {{item?.phone}}</td>\r\n                                    <td>{{item?.age ? item?.age : '--'}}</td>\r\n                                    <td>{{item?.created_at | date : 'mediumDate'}}</td>\r\n\r\n                                    <!-- Active Or Inactive Status -->\r\n                                    <td *ngIf=\"item?.status=='1'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(71, 230, 23)!important;font-weight: bold\">\r\n                                        ENABLED\r\n                                    </td>\r\n                                    <td *ngIf=\"item?.status =='2'\" class=\"text-primary cursor\"\r\n                                        style=\"color: red!important; font-weight: bold\">\r\n                                        DELETED\r\n                                    </td>\r\n                                    <td *ngIf=\"item?.status =='0'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(255, 136, 0)!important; font-weight: bold\">\r\n                                        DISABLED\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"pos_rel actiondiv\">\r\n                                            <button class=\"dropdown-toggle btn btn-secondary\" data-toggle=\"dropdown\"\r\n                                                role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Action <span\r\n                                                    class=\"caret\"></span></button>\r\n                                            <ul class=\"dropdown-menu\">\r\n                                                <li><a class=\"dropdown-item\" (click)=viewModal(item)>VIEW</a></li>\r\n                                                <li><a class=\"dropdown-item\" href=\"#\">EDIT</a></li>\r\n                                                <li *ngIf=\"item.status != '1'\"><a class=\"dropdown-item\"\r\n                                                        (click)=actionModal(item,1)>ENABLE</a></li>\r\n                                                <li *ngIf=\"item.status == '1'\"><a class=\"dropdown-item\"\r\n                                                        (click)=actionModal(item,0)>DISABLE</a></li>\r\n                                                <li *ngIf=\"item.status == '1' || item.status == '0'\"><a\r\n                                                        class=\"dropdown-item\" (click)=actionModal(item,2)>DELETE</a>\r\n                                                </li>\r\n                                            </ul>\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Dashboard Section Start Here-->\r\n\r\n\r\n        <!-- For Trash Users -->\r\n        <div *ngIf=\"trash\" class=\"dashboard_data_wrap\">\r\n            <div class=\"dahaboard_heading\" style=\"border-bottom: 1px solid;\r\n            padding-bottom: 10px;\">\r\n                <p>App Trash User Management</p>\r\n            </div>\r\n\r\n            <div class=\"dahaboard_heading\">\r\n                <button (click)=\"generateExcel()\" type=\"button\" class=\"btn\">Export CSV</button>\r\n\r\n                <button (click)=\"toTrash(false)\" type=\"button\" class=\"btn btn-style\">Back</button>\r\n            </div>\r\n            <div class=\"serachdiv_wrap\">\r\n                <i class=\"fa fa-search\" aria-hidden=\"true\" (click)=search()></i>\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Search for name/email/phone\"\r\n                    (keyup)=searchText($event.target.value,$event)>\r\n            </div>\r\n\r\n\r\n            <div class=\"dashbord_cont_wrapper\">\r\n                <div class=\"dashboard_wrap\">\r\n                    <div>\r\n                        <table class=\"table\">\r\n                            <thead class=\"thead-dark\">\r\n                                <tr>\r\n                                    <th>S.no</th>\r\n                                    <th>User Name</th>\r\n                                    <th>Email</th>\r\n                                    <th>Subscription Type</th>\r\n                                    <th>Mobile</th>\r\n                                    <th>Age</th>\r\n                                    <th>Signup Date</th>\r\n                                    <th>Status</th>\r\n                                    <th>Action</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of list ;let i = index;\">\r\n                                    <td>{{i+1}}.</td>\r\n                                    <td>{{item?.user_name ? item?.user_name : '--'}}</td>\r\n                                    <td>{{item?.email ? item?.email : '--'}}</td>\r\n                                    <td>Free Trial</td>\r\n                                    <td>{{item?.country_code}} {{item?.phone}}</td>\r\n                                    <td>{{item?.age ? item?.age : '--'}}</td>\r\n                                    <td>{{item?.created_at | date : 'mediumDate'}}</td>\r\n\r\n                                    <!-- Active Or Inactive Status -->\r\n                                    <td *ngIf=\"item?.status=='1'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(71, 230, 23)!important;font-weight: bold\">\r\n                                        ENABLED\r\n                                    </td>\r\n                                    <td *ngIf=\"item?.status =='2'\" class=\"text-primary cursor\"\r\n                                        style=\"color: red!important; font-weight: bold\">\r\n                                        DELETED\r\n                                    </td>\r\n                                    <td *ngIf=\"item?.status =='0'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(255, 136, 0)!important; font-weight: bold\">\r\n                                        DISABLED\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"pos_rel actiondiv\">\r\n                                            <button class=\"dropdown-toggle btn btn-secondary\" data-toggle=\"dropdown\"\r\n                                                role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Action <span\r\n                                                    class=\"caret\"></span></button>\r\n                                            <ul class=\"dropdown-menu\">\r\n                                                <li><a class=\"dropdown-item\" (click)=viewModal(item)>VIEW</a></li>\r\n                                                <li><a class=\"dropdown-item\" href=\"#\">EDIT</a></li>\r\n                                                <li *ngIf=\"item.status != '1'\"><a class=\"dropdown-item\"\r\n                                                        (click)=actionModal(item,1)>ENABLE</a></li>\r\n                                                <li *ngIf=\"item.status == '1'\"><a class=\"dropdown-item\"\r\n                                                        (click)=actionModal(item,0)>DELETE</a></li>\r\n                                                <li *ngIf=\"item.status == '1'\"><a class=\"dropdown-item\"\r\n                                                        (click)=actionModal(item,2)>BLOCK</a></li>\r\n                                            </ul>\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Trash Users Here-->\r\n\r\n        <!-- View Modal -->\r\n        <div class=\"modal fade\" id=\"viewModal\" role=\"dialog\">\r\n            <div class=\"modal-dialog\">\r\n\r\n                <!-- Modal content-->\r\n                <div class=\"modal-content\">\r\n\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"userview_wrap\">\r\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\r\n                                style=\"font-size: 25px;\">&times;</button>\r\n                            <div class=\"usernamediv\" style=\"border-bottom: 1px solid;\r\n                            padding-bottom: 10px;\">\r\n                                <div class=\"img_name_div\">\r\n                                    <div class=\"userimg\">\r\n                                        <img src=\"assets\\images\\user.png\">\r\n                                    </div>\r\n                                    <span><b>{{view_user.user_name}}</b></span>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"userdetail_wrap\">\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Email</p>\r\n                                    <span><a (click)=email(view_user.email)\r\n                                            style=\"cursor: pointer;\">{{view_user.email}}</a></span>\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Subscription Type</p>\r\n                                    <span>Free Trail</span>\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Location</p>\r\n                                    <span>{{view_user.location ? view_user.location : '--'}}</span>\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Date of Birth</p>\r\n                                    <span>{{view_user.dob ? (view_user.dob | date : 'mediumDate') : '--'}}</span>\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Signup Date</p>\r\n                                    <span>{{view_user.created_at | date : 'mediumDate'}}</span>\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Status</p>\r\n                                    <span *ngIf=\"view_user?.status=='1'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(71, 230, 23)!important;font-weight: bold\">\r\n                                        Active\r\n                                    </span>\r\n                                    <span *ngIf=\"view_user?.status =='0'\" class=\"text-primary cursor\"\r\n                                        style=\"color: red!important; font-weight: bold\">\r\n                                        INACTIVE\r\n                                    </span>\r\n\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Gender</p>\r\n                                    <span>{{view_user.gender ? view_user.gender : '--'}}</span>\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Mobile</p>\r\n                                    <span>{{view_user?.country_code}} {{view_user?.phone}}</span>\r\n                                </div>\r\n                                <div class=\"dtldiv\">\r\n                                    <p>Course Purchased</p>\r\n                                    <span>0</span>\r\n                                </div>\r\n\r\n                                <div class=\"closebtn\">\r\n                                    <button type=\"button\" style=\"margin: auto;display: block;\" data-dismiss=\"modal\"\r\n                                        class=\"btn btn-style\">Close</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n        <!-- View Modal -->\r\n\r\n        <!-- Delete Modal -->\r\n        <div class=\"modal fade\" id=\"dltModal\" role=\"dialog\">\r\n            <div class=\"modal-dialog\">\r\n                <!-- Modal content-->\r\n                <div class=\"modal-content\">\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"dlt_mdl_wrap\">\r\n                            <h3>User Management</h3>\r\n                            <div class=\"dtlcont\">\r\n                                <p>{{heading}}</p>\r\n                            </div>\r\n                            <div class=\"bottombtn\">\r\n                                <button type=\"button\" class=\"btn btn-danger\" (click)=\"actionUser()\"\r\n                                    data-dismiss=\"modal\">{{button_name}}</button>\r\n                                <button type=\"button\" class=\"btn btn-block\" data-dismiss=\"modal\">Cancel</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Delete Modal -->\r\n\r\n    </section>\r\n\r\n    <!-- Welcome Section End Here -->\r\n</div>"

/***/ }),

/***/ "./src/app/users-tab/users-list/users-list.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/users-tab/users-list/users-list.component.ts ***!
  \**************************************************************/
/*! exports provided: UsersListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersListComponent", function() { return UsersListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../admin.service */ "./src/app/admin.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common.service */ "./src/app/common.service.ts");
/* harmony import */ var _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-gallery/core */ "./node_modules/@ngx-gallery/core/fesm5/ngx-gallery-core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var exceljs_dist_exceljs_min_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! exceljs/dist/exceljs.min.js */ "./node_modules/exceljs/dist/exceljs.min.js");
/* harmony import */ var exceljs_dist_exceljs_min_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(exceljs_dist_exceljs_min_js__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { ExcelService } from '../../excel.service';


var UsersListComponent = /** @class */ (function () {
    function UsersListComponent(_fb, gallery, adminService, toastr, formBuilder, _router, commonservice) {
        this._fb = _fb;
        this.gallery = gallery;
        this.adminService = adminService;
        this.toastr = toastr;
        this.formBuilder = formBuilder;
        this._router = _router;
        this.commonservice = commonservice;
        this.loading = false;
        this.error = false;
        this.list = [];
        this.trash = false;
        this.view_user = {};
        this.heading = "Are you sure, you want to delete this category? After successful deletion, this will not be available in the category listing and under the featured section";
        this.action = 1;
        this.button_name = "Delete";
        this.editStatus = false;
        this.query = {
            search: '',
            filter: '',
            check: '',
            date: 0,
            age: 0,
        };
    }
    UsersListComponent.prototype.ngOnInit = function () {
        this.getUsersList();
    };
    UsersListComponent.prototype.listSort = function (val, type) {
        /*For Date Sort*/
        if (type == '4') {
            this.query.date = val;
            this.query.age = 0;
            this.getUsersList();
        }
        /*For Name Sort*/
        if (type == '1') {
            if (val == 1 || val == '1') {
                this.list.sort(function (a, b) {
                    var x = a.user_name.toUpperCase(), y = b.user_name.toUpperCase();
                    return x == y ? 0 : x > y ? 1 : -1;
                });
            }
            else {
                this.list.sort(function (a, b) {
                    var x = a.user_name.toUpperCase(), y = b.user_name.toUpperCase();
                    return x == y ? 0 : x < y ? 1 : -1;
                });
            }
        }
        /*For Subscription Sort*/
        if (type == '2') {
            return;
        }
        /*For Age Sort*/
        if (type == '3') {
            this.query.age = val;
            this.query.date = 0;
            this.getUsersList();
        }
    };
    UsersListComponent.prototype.toTrash = function (val) {
        this.trash = val;
        this.getUsersList();
    };
    UsersListComponent.prototype.viewModal = function (val) {
        $('#viewModal').modal('show');
        this.view_user = val;
        if (this.view_user.email != "") {
            this.view_user.view_user_link = "mailto:".concat(this.view_user.email);
        }
    };
    UsersListComponent.prototype.email = function (val) {
        window.location.href = "mailto:".concat(val);
    };
    UsersListComponent.prototype.actionModal = function (val, head) {
        $('#dltModal').modal('show');
        this.view_user = val;
        this.action = head;
        if (head == 0 || head == '0') {
            this.button_name = 'Disable';
            this.heading = "Are you sure, you want to disable this user? After successful disabling, this will not be available in the user listing and under the user section";
        }
        else if (head == 2 || head == '2') {
            this.button_name = 'Delete';
            this.heading = "Are you sure, you want to delete this user? After successful deleteing, this will not be available in the user listing and under the user section";
        }
        else {
            this.button_name = 'Enable';
            this.heading = "Are you sure, you want to enabled this user? After successful enabling, this will be available in the user listing and under the feature user section";
        }
    };
    UsersListComponent.prototype.actionUser = function () {
        var _this = this;
        this.adminService.getApi("admin/actionUser?user_id=" + this.view_user.user_id + "&status=" + this.action, 1).subscribe(function (response) {
            _this.getUsersList();
            if (_this.action == 0 || _this.action == '0') {
                _this.toastr.success("User Disabled Successfully.");
            }
            else if (_this.action == 2 || _this.action == '2') {
                _this.toastr.success("User Deleted Successfully.");
            }
            else {
                _this.toastr.success("User Enabled Successfully.");
            }
        }, function (error) { });
    };
    UsersListComponent.prototype.search = function () {
        if ((this.query.search).trim() == "") {
            this.toastr.error("Enter Name, Number or Email !");
            return;
        }
        this.getUsersList();
    };
    UsersListComponent.prototype.searchText = function (val, event) {
        this.query.search = val;
        if ((event.target.value).trim() == '') {
            this.getUsersList();
            return event.target.value = "";
        }
        if (val == "") {
            this.getUsersList();
        }
        if (event.code == 'Enter') {
            this.getUsersList();
        }
    };
    UsersListComponent.prototype.getUsersList = function () {
        var _this = this;
        this.loading = true;
        var obj = "?search=" + this.query.search + "&trash=" + this.trash + "&date=" + this.query.date + "&age=" + this.query.age;
        this.adminService.getApi("admin/userLists" + obj, 1).subscribe(function (response) {
            if (response['code'] == 200 && response['result'].length > 0) {
                _this.list = response['result'];
                _this.loading = false;
            }
            else {
                _this.list = [];
                _this.loading = false;
            }
        }, function (error) {
            _this.list = [];
            _this.loading = false;
        });
    };
    UsersListComponent.prototype.formatDate = function (d) {
        var year = new Date(d).getFullYear();
        var date = new Date(d).getDate() < 10 ? "0" + new Date(d).getDate() : new Date(d).getDate();
        var month = new Date(d).getMonth() + 1 < 10 ? "0" + (new Date(d).getMonth() + 1) : new Date(d).getMonth() + 1;
        var full_date = year + "-" + month + "-" + date;
        return full_date;
    };
    UsersListComponent.prototype.generateExcel = function () {
        var _this = this;
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////// For Tab 0 ////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var header = ['S.no', 'User Name', 'Email', 'Subscription Type', 'Mobile', 'Age', 'Signup Date', 'Status'];
        var workbook = new exceljs_dist_exceljs_min_js__WEBPACK_IMPORTED_MODULE_9__["Workbook"]();
        var worksheet = workbook.addWorksheet('Profile');
        worksheet.addRow(header);
        worksheet.getRow(1).font = { name: 'Comic Sans MS', cellspacing: 100, family: 4, size: 12, bold: true, color: { argb: '	FF0000' }, };
        var count = 1;
        this.list.forEach(function (element) {
            var data_info = [
                count,
                element.user_name,
                element.email,
                'Trial',
                element.mobile,
                element.age,
                _this.formatDate(element.created_at),
                element.status == '1' ? 'ACTIVE' : 'INACTIVE'
            ];
            worksheet.addRow(data_info);
            count++;
        });
        for (var i = 1; header.length > i; i++) {
            worksheet.getColumn(i).width = 25;
        }
        workbook.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            Object(file_saver__WEBPACK_IMPORTED_MODULE_8__["saveAs"])(blob, 'User.xlsx');
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    };
    UsersListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]
            ]
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users-list',
            template: __webpack_require__(/*! ./users-list.component.html */ "./src/app/users-tab/users-list/users-list.component.html"),
            styles: [__webpack_require__(/*! ./users-list.component.css */ "./src/app/users-tab/users-list/users-list.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_6__["Gallery"], _admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], UsersListComponent);
    return UsersListComponent;
}());



/***/ }),

/***/ "./src/app/users-tab/users-tab-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/users-tab/users-tab-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: UsersTabRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersTabRoutingModule", function() { return UsersTabRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users-list/users-list.component */ "./src/app/users-tab/users-list/users-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: "", component: _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_2__["UsersListComponent"] },
];
var UsersTabRoutingModule = /** @class */ (function () {
    function UsersTabRoutingModule() {
    }
    UsersTabRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UsersTabRoutingModule);
    return UsersTabRoutingModule;
}());



/***/ }),

/***/ "./src/app/users-tab/users-tab.module.ts":
/*!***********************************************!*\
  !*** ./src/app/users-tab/users-tab.module.ts ***!
  \***********************************************/
/*! exports provided: UsersTabModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersTabModule", function() { return UsersTabModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_layout_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_shared/layout.module */ "./src/app/_shared/layout.module.ts");
/* harmony import */ var _shared_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_shared/material.module */ "./src/app/_shared/material.module.ts");
/* harmony import */ var _shared_multiple_select_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_shared/multiple-select.module */ "./src/app/_shared/multiple-select.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_shared/shared.module */ "./src/app/_shared/shared.module.ts");
/* harmony import */ var _shared_tag_chips_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_shared/tag-chips.module */ "./src/app/_shared/tag-chips.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var _users_tab_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./users-tab-routing.module */ "./src/app/users-tab/users-tab-routing.module.ts");
/* harmony import */ var _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./users-list/users-list.component */ "./src/app/users-tab/users-list/users-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var UsersTabModule = /** @class */ (function () {
    function UsersTabModule() {
    }
    UsersTabModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_9__["UsersListComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _users_tab_routing_module__WEBPACK_IMPORTED_MODULE_8__["UsersTabRoutingModule"],
                _shared_layout_module__WEBPACK_IMPORTED_MODULE_2__["SharedLayoutModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                _shared_multiple_select_module__WEBPACK_IMPORTED_MODULE_4__["multiSelectModule"],
                _shared_tag_chips_module__WEBPACK_IMPORTED_MODULE_6__["TaginputModule"],
                _shared_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__["CKEditorModule"]
            ]
        })
    ], UsersTabModule);
    return UsersTabModule;
}());



/***/ })

}]);
//# sourceMappingURL=users-tab-users-tab-module.js.map