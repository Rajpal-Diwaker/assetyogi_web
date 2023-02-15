(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/space.validator.ts":
/*!************************************!*\
  !*** ./src/app/space.validator.ts ***!
  \************************************/
/*! exports provided: SpaceValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceValidator", function() { return SpaceValidator; });
var SpaceValidator = /** @class */ (function () {
    function SpaceValidator() {
    }
    SpaceValidator.cannotContainSpace = function (control) {
        if (control.value.trim() == '') {
            return { cannotContainSpace: true };
        }
        // if ((control.value as string).indexOf(' ') >= 0) {
        //     return { cannotContainSpace: true }
        // }
        return null;
    };
    return SpaceValidator;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map