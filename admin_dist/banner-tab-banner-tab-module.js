(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["banner-tab-banner-tab-module"],{

/***/ "./node_modules/ngx-image-cropper/fesm5/ngx-image-cropper.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ngx-image-cropper/fesm5/ngx-image-cropper.js ***!
  \*******************************************************************/
/*! exports provided: ImageCropperComponent, ImageCropperModule, base64ToFile, resizeCanvas, ɵa, ɵb, ɵc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageCropperComponent", function() { return ImageCropperComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageCropperModule", function() { return ImageCropperModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64ToFile", function() { return base64ToFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resizeCanvas", function() { return resizeCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return CropService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return CropperPositionService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return LoadImageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/ngx-image-cropper/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");





/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces/move-start.interface.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MoveStart() { }
if (false) {}
/** @enum {string} */
var MoveTypes = {
    Move: "move",
    Resize: "resize",
    Pinch: "pinch",
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/resize.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Hermite resize - fast image resize/resample using Hermite filter.
 * https://github.com/viliusle/Hermite-resize
 */
/**
 * @param {?} canvas
 * @param {?} width
 * @param {?} height
 * @return {?}
 */
function resizeCanvas(canvas, width, height) {
    /** @type {?} */
    var width_source = canvas.width;
    /** @type {?} */
    var height_source = canvas.height;
    width = Math.round(width);
    height = Math.round(height);
    /** @type {?} */
    var ratio_w = width_source / width;
    /** @type {?} */
    var ratio_h = height_source / height;
    /** @type {?} */
    var ratio_w_half = Math.ceil(ratio_w / 2);
    /** @type {?} */
    var ratio_h_half = Math.ceil(ratio_h / 2);
    /** @type {?} */
    var ctx = canvas.getContext('2d');
    if (ctx) {
        /** @type {?} */
        var img = ctx.getImageData(0, 0, width_source, height_source);
        /** @type {?} */
        var img2 = ctx.createImageData(width, height);
        /** @type {?} */
        var data = img.data;
        /** @type {?} */
        var data2 = img2.data;
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                /** @type {?} */
                var x2 = (i + j * width) * 4;
                /** @type {?} */
                var center_y = j * ratio_h;
                /** @type {?} */
                var weight = 0;
                /** @type {?} */
                var weights = 0;
                /** @type {?} */
                var weights_alpha = 0;
                /** @type {?} */
                var gx_r = 0;
                /** @type {?} */
                var gx_g = 0;
                /** @type {?} */
                var gx_b = 0;
                /** @type {?} */
                var gx_a = 0;
                /** @type {?} */
                var xx_start = Math.floor(i * ratio_w);
                /** @type {?} */
                var yy_start = Math.floor(j * ratio_h);
                /** @type {?} */
                var xx_stop = Math.ceil((i + 1) * ratio_w);
                /** @type {?} */
                var yy_stop = Math.ceil((j + 1) * ratio_h);
                xx_stop = Math.min(xx_stop, width_source);
                yy_stop = Math.min(yy_stop, height_source);
                for (var yy = yy_start; yy < yy_stop; yy++) {
                    /** @type {?} */
                    var dy = Math.abs(center_y - yy) / ratio_h_half;
                    /** @type {?} */
                    var center_x = i * ratio_w;
                    /** @type {?} */
                    var w0 = dy * dy;
                    for (var xx = xx_start; xx < xx_stop; xx++) {
                        /** @type {?} */
                        var dx = Math.abs(center_x - xx) / ratio_w_half;
                        /** @type {?} */
                        var w = Math.sqrt(w0 + dx * dx);
                        if (w >= 1) {
                            //pixel too far
                            continue;
                        }
                        //hermite filter
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        /** @type {?} */
                        var pos_x = 4 * (xx + yy * width_source);
                        //alpha
                        gx_a += weight * data[pos_x + 3];
                        weights_alpha += weight;
                        //colors
                        if (data[pos_x + 3] < 255)
                            weight = weight * data[pos_x + 3] / 250;
                        gx_r += weight * data[pos_x];
                        gx_g += weight * data[pos_x + 1];
                        gx_b += weight * data[pos_x + 2];
                        weights += weight;
                    }
                }
                data2[x2] = gx_r / weights;
                data2[x2 + 1] = gx_g / weights;
                data2[x2 + 2] = gx_b / weights;
                data2[x2 + 3] = gx_a / weights_alpha;
            }
        }
        canvas.width = width;
        canvas.height = height;
        //draw
        ctx.putImageData(img2, 0, 0);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/crop.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CropService = /** @class */ (function () {
    function CropService() {
    }
    /**
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.crop = /**
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        var imagePosition = this.getImagePosition(sourceImage, loadedImage, cropper, settings);
        /** @type {?} */
        var width = imagePosition.x2 - imagePosition.x1;
        /** @type {?} */
        var height = imagePosition.y2 - imagePosition.y1;
        /** @type {?} */
        var cropCanvas = (/** @type {?} */ (document.createElement('canvas')));
        cropCanvas.width = width;
        cropCanvas.height = height;
        /** @type {?} */
        var ctx = cropCanvas.getContext('2d');
        if (!ctx) {
            return;
        }
        if (settings.backgroundColor != null) {
            ctx.fillStyle = settings.backgroundColor;
            ctx.fillRect(0, 0, width, height);
        }
        /** @type {?} */
        var scaleX = (settings.transform.scale || 1) * (settings.transform.flipH ? -1 : 1);
        /** @type {?} */
        var scaleY = (settings.transform.scale || 1) * (settings.transform.flipV ? -1 : 1);
        /** @type {?} */
        var transformedImage = loadedImage.transformed;
        ctx.setTransform(scaleX, 0, 0, scaleY, transformedImage.size.width / 2, transformedImage.size.height / 2);
        ctx.translate(-imagePosition.x1 / scaleX, -imagePosition.y1 / scaleY);
        ctx.rotate((settings.transform.rotate || 0) * Math.PI / 180);
        ctx.drawImage(transformedImage.image, -transformedImage.size.width / 2, -transformedImage.size.height / 2);
        /** @type {?} */
        var output = {
            width: width, height: height,
            imagePosition: imagePosition,
            cropperPosition: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, cropper)
        };
        if (settings.containWithinAspectRatio) {
            output.offsetImagePosition = this.getOffsetImagePosition(sourceImage, loadedImage, cropper, settings);
        }
        /** @type {?} */
        var resizeRatio = this.getResizeRatio(width, height, settings);
        if (resizeRatio !== 1) {
            output.width = Math.round(width * resizeRatio);
            output.height = settings.maintainAspectRatio
                ? Math.round(output.width / settings.aspectRatio)
                : Math.round(height * resizeRatio);
            resizeCanvas(cropCanvas, output.width, output.height);
        }
        output.base64 = cropCanvas.toDataURL('image/' + settings.format, this.getQuality(settings));
        return output;
    };
    /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getImagePosition = /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        var sourceImageElement = sourceImage.nativeElement;
        /** @type {?} */
        var ratio = loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
        /** @type {?} */
        var out = {
            x1: Math.round(cropper.x1 * ratio),
            y1: Math.round(cropper.y1 * ratio),
            x2: Math.round(cropper.x2 * ratio),
            y2: Math.round(cropper.y2 * ratio)
        };
        if (!settings.containWithinAspectRatio) {
            out.x1 = Math.max(out.x1, 0);
            out.y1 = Math.max(out.y1, 0);
            out.x2 = Math.min(out.x2, loadedImage.transformed.size.width);
            out.y2 = Math.min(out.y2, loadedImage.transformed.size.height);
        }
        return out;
    };
    /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getOffsetImagePosition = /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        var canvasRotation = settings.canvasRotation + loadedImage.exifTransform.rotate;
        /** @type {?} */
        var sourceImageElement = sourceImage.nativeElement;
        /** @type {?} */
        var ratio = loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
        /** @type {?} */
        var offsetX;
        /** @type {?} */
        var offsetY;
        if (canvasRotation % 2) {
            offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.height) / 2;
            offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.width) / 2;
        }
        else {
            offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.width) / 2;
            offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.height) / 2;
        }
        /** @type {?} */
        var out = {
            x1: Math.round(cropper.x1 * ratio) - offsetX,
            y1: Math.round(cropper.y1 * ratio) - offsetY,
            x2: Math.round(cropper.x2 * ratio) - offsetX,
            y2: Math.round(cropper.y2 * ratio) - offsetY
        };
        if (!settings.containWithinAspectRatio) {
            out.x1 = Math.max(out.x1, 0);
            out.y1 = Math.max(out.y1, 0);
            out.x2 = Math.min(out.x2, loadedImage.transformed.size.width);
            out.y2 = Math.min(out.y2, loadedImage.transformed.size.height);
        }
        return out;
    };
    /**
     * @param {?} width
     * @param {?} height
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getResizeRatio = /**
     * @param {?} width
     * @param {?} height
     * @param {?} settings
     * @return {?}
     */
    function (width, height, settings) {
        /** @type {?} */
        var ratioWidth = settings.resizeToWidth / width;
        /** @type {?} */
        var ratioHeight = settings.resizeToHeight / height;
        /** @type {?} */
        var ratios = new Array();
        if (settings.resizeToWidth > 0) {
            ratios.push(ratioWidth);
        }
        if (settings.resizeToHeight > 0) {
            ratios.push(ratioHeight);
        }
        /** @type {?} */
        var result = ratios.length === 0 ? 1 : Math.min.apply(Math, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(ratios));
        if (result > 1 && !settings.onlyScaleDown) {
            return result;
        }
        return Math.min(result, 1);
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getQuality = /**
     * @param {?} settings
     * @return {?}
     */
    function (settings) {
        return Math.min(1, Math.max(0, settings.imageQuality / 100));
    };
    CropService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ CropService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function CropService_Factory() { return new CropService(); }, token: CropService, providedIn: "root" });
    return CropService;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces/cropper.settings.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CropperSettings = /** @class */ (function () {
    function CropperSettings() {
        // From options
        this.format = 'png';
        this.maintainAspectRatio = true;
        this.transform = {};
        this.aspectRatio = 1;
        this.resizeToWidth = 0;
        this.resizeToHeight = 0;
        this.cropperMinWidth = 0;
        this.cropperMinHeight = 0;
        this.cropperMaxHeight = 0;
        this.cropperMaxWidth = 0;
        this.cropperStaticWidth = 0;
        this.cropperStaticHeight = 0;
        this.canvasRotation = 0;
        this.initialStepSize = 3;
        this.roundCropper = false;
        this.onlyScaleDown = false;
        this.imageQuality = 92;
        this.autoCrop = true;
        this.backgroundColor = undefined;
        this.containWithinAspectRatio = false;
        this.hideResizeSquares = false;
        this.alignImage = 'center';
        // Internal
        this.cropperScaledMinWidth = 20;
        this.cropperScaledMinHeight = 20;
        this.cropperScaledMaxWidth = 20;
        this.cropperScaledMaxHeight = 20;
        this.stepSize = this.initialStepSize;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    CropperSettings.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        Object.keys(options)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k in _this; }))
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return _this[k] = options[k]; }));
        this.validateOptions();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CropperSettings.prototype.setOptionsFromChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        Object.keys(changes)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k in _this; }))
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return _this[k] = changes[k].currentValue; }));
        this.validateOptions();
    };
    /**
     * @private
     * @return {?}
     */
    CropperSettings.prototype.validateOptions = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.maintainAspectRatio && !this.aspectRatio) {
            throw new Error('`aspectRatio` should > 0 when `maintainAspectRatio` is enabled');
        }
    };
    return CropperSettings;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/exif.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Black 2x1 JPEG, with the following meta information set:
// - EXIF Orientation: 6 (Rotated 90° CCW)
// Source: https://github.com/blueimp/JavaScript-Load-Image
/** @type {?} */
var testAutoOrientationImageURL = 'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
    'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
    'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
    'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' +
    'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' +
    'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
/**
 * @return {?}
 */
function supportsAutomaticRotation() {
    return new Promise((/**
     * @param {?} resolve
     * @return {?}
     */
    function (resolve) {
        /** @type {?} */
        var img = new Image();
        img.onload = (/**
         * @return {?}
         */
        function () {
            // Check if browser supports automatic image orientation:
            /** @type {?} */
            var supported = img.width === 1 && img.height === 2;
            resolve(supported);
        });
        img.src = testAutoOrientationImageURL;
    }));
}
/**
 * @param {?} exifRotationOrBase64Image
 * @return {?}
 */
function getTransformationsFromExifData(exifRotationOrBase64Image) {
    if (typeof exifRotationOrBase64Image === 'string') {
        exifRotationOrBase64Image = getExifRotation(exifRotationOrBase64Image);
    }
    switch (exifRotationOrBase64Image) {
        case 2:
            return { rotate: 0, flip: true };
        case 3:
            return { rotate: 2, flip: false };
        case 4:
            return { rotate: 2, flip: true };
        case 5:
            return { rotate: 1, flip: true };
        case 6:
            return { rotate: 1, flip: false };
        case 7:
            return { rotate: 3, flip: true };
        case 8:
            return { rotate: 3, flip: false };
        default:
            return { rotate: 0, flip: false };
    }
}
/**
 * @param {?} imageBase64
 * @return {?}
 */
function getExifRotation(imageBase64) {
    /** @type {?} */
    var view = new DataView(base64ToArrayBuffer(imageBase64));
    if (view.getUint16(0, false) != 0xFFD8) {
        return -2;
    }
    /** @type {?} */
    var length = view.byteLength;
    /** @type {?} */
    var offset = 2;
    while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8)
            return -1;
        /** @type {?} */
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
            if (view.getUint32(offset += 2, false) != 0x45786966) {
                return -1;
            }
            /** @type {?} */
            var little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            /** @type {?} */
            var tags = view.getUint16(offset, little);
            offset += 2;
            for (var i = 0; i < tags; i++) {
                if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                    return view.getUint16(offset + (i * 12) + 8, little);
                }
            }
        }
        else if ((marker & 0xFF00) != 0xFF00) {
            break;
        }
        else {
            offset += view.getUint16(offset, false);
        }
    }
    return -1;
}
/**
 * @param {?} imageBase64
 * @return {?}
 */
function base64ToArrayBuffer(imageBase64) {
    imageBase64 = imageBase64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    /** @type {?} */
    var binaryString = atob(imageBase64);
    /** @type {?} */
    var len = binaryString.length;
    /** @type {?} */
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/load-image.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LoadImageBase64() { }
if (false) {}
var LoadImageService = /** @class */ (function () {
    function LoadImageService() {
        this.autoRotateSupported = supportsAutomaticRotation();
    }
    /**
     * @param {?} file
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadImageFile = /**
     * @param {?} file
     * @param {?} cropperSettings
     * @return {?}
     */
    function (file, cropperSettings) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var fileReader = new FileReader();
            fileReader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.loadImage(event.target.result, file.type, cropperSettings)
                    .then(resolve)
                    .catch(reject);
            });
            fileReader.readAsDataURL(file);
        }));
    };
    /**
     * @private
     * @param {?} imageBase64
     * @param {?} imageType
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadImage = /**
     * @private
     * @param {?} imageBase64
     * @param {?} imageType
     * @param {?} cropperSettings
     * @return {?}
     */
    function (imageBase64, imageType, cropperSettings) {
        if (!this.isValidImageType(imageType)) {
            return Promise.reject(new Error('Invalid image type'));
        }
        return this.loadBase64Image(imageBase64, cropperSettings);
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    LoadImageService.prototype.isValidImageType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return /image\/(png|jpg|jpeg|bmp|gif|tiff|webp)/.test(type);
    };
    /**
     * @param {?} url
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadImageFromURL = /**
     * @param {?} url
     * @param {?} cropperSettings
     * @return {?}
     */
    function (url, cropperSettings) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var img = new Image();
            img.onerror = (/**
             * @return {?}
             */
            function () { return reject; });
            img.onload = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var canvas = document.createElement('canvas');
                /** @type {?} */
                var context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                _this.loadBase64Image(canvas.toDataURL(), cropperSettings).then(resolve);
            });
            img.crossOrigin = 'anonymous';
            img.src = url;
        }));
    };
    /**
     * @param {?} imageBase64
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadBase64Image = /**
     * @param {?} imageBase64
     * @param {?} cropperSettings
     * @return {?}
     */
    function (imageBase64, cropperSettings) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var originalImage = new Image();
            originalImage.onload = (/**
             * @return {?}
             */
            function () { return resolve({
                originalImage: originalImage,
                originalBase64: imageBase64
            }); });
            originalImage.onerror = reject;
            originalImage.src = imageBase64;
        })).then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.transformImageBase64(res, cropperSettings); }));
    };
    /**
     * @private
     * @param {?} res
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.transformImageBase64 = /**
     * @private
     * @param {?} res
     * @param {?} cropperSettings
     * @return {?}
     */
    function (res, cropperSettings) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var autoRotate, exifTransform, loadedImage;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.autoRotateSupported];
                    case 1:
                        autoRotate = _a.sent();
                        return [4 /*yield*/, getTransformationsFromExifData(autoRotate ? -1 : res.originalBase64)];
                    case 2:
                        exifTransform = _a.sent();
                        if (!res.originalImage || !res.originalImage.complete) {
                            return [2 /*return*/, Promise.reject(new Error('No image loaded'))];
                        }
                        loadedImage = {
                            original: {
                                base64: res.originalBase64,
                                image: res.originalImage,
                                size: {
                                    width: res.originalImage.naturalWidth,
                                    height: res.originalImage.naturalHeight
                                }
                            },
                            exifTransform: exifTransform
                        };
                        return [2 /*return*/, this.transformLoadedImage(loadedImage, cropperSettings)];
                }
            });
        });
    };
    /**
     * @param {?} loadedImage
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.transformLoadedImage = /**
     * @param {?} loadedImage
     * @param {?} cropperSettings
     * @return {?}
     */
    function (loadedImage, cropperSettings) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var canvasRotation, originalSize, transformedSize, canvas, ctx, transformedBase64, transformedImage;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canvasRotation = cropperSettings.canvasRotation + loadedImage.exifTransform.rotate;
                        originalSize = {
                            width: loadedImage.original.image.naturalWidth,
                            height: loadedImage.original.image.naturalHeight
                        };
                        if (canvasRotation === 0 && !loadedImage.exifTransform.flip && !cropperSettings.containWithinAspectRatio) {
                            return [2 /*return*/, {
                                    original: {
                                        base64: loadedImage.original.base64,
                                        image: loadedImage.original.image,
                                        size: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, originalSize)
                                    },
                                    transformed: {
                                        base64: loadedImage.original.base64,
                                        image: loadedImage.original.image,
                                        size: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, originalSize)
                                    },
                                    exifTransform: loadedImage.exifTransform
                                }];
                        }
                        transformedSize = this.getTransformedSize(originalSize, loadedImage.exifTransform, cropperSettings);
                        canvas = document.createElement('canvas');
                        canvas.width = transformedSize.width;
                        canvas.height = transformedSize.height;
                        ctx = canvas.getContext('2d');
                        ctx.setTransform(loadedImage.exifTransform.flip ? -1 : 1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
                        ctx.rotate(Math.PI * (canvasRotation / 2));
                        ctx.drawImage(loadedImage.original.image, -originalSize.width / 2, -originalSize.height / 2);
                        transformedBase64 = canvas.toDataURL();
                        return [4 /*yield*/, this.loadImageFromBase64(transformedBase64)];
                    case 1:
                        transformedImage = _a.sent();
                        return [2 /*return*/, {
                                original: {
                                    base64: loadedImage.original.base64,
                                    image: loadedImage.original.image,
                                    size: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, originalSize)
                                },
                                transformed: {
                                    base64: transformedBase64,
                                    image: transformedImage,
                                    size: {
                                        width: transformedImage.width,
                                        height: transformedImage.height
                                    }
                                },
                                exifTransform: loadedImage.exifTransform
                            }];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    LoadImageService.prototype.loadImageFromBase64 = /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    function (imageBase64) {
        return new Promise(((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var image = new Image();
            image.onload = (/**
             * @return {?}
             */
            function () { return resolve(image); });
            image.onerror = reject;
            image.src = imageBase64;
        })));
    };
    /**
     * @private
     * @param {?} originalSize
     * @param {?} exifTransform
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.getTransformedSize = /**
     * @private
     * @param {?} originalSize
     * @param {?} exifTransform
     * @param {?} cropperSettings
     * @return {?}
     */
    function (originalSize, exifTransform, cropperSettings) {
        /** @type {?} */
        var canvasRotation = cropperSettings.canvasRotation + exifTransform.rotate;
        if (cropperSettings.containWithinAspectRatio) {
            if (canvasRotation % 2) {
                /** @type {?} */
                var minWidthToContain = originalSize.width * cropperSettings.aspectRatio;
                /** @type {?} */
                var minHeightToContain = originalSize.height / cropperSettings.aspectRatio;
                return {
                    width: Math.max(originalSize.height, minWidthToContain),
                    height: Math.max(originalSize.width, minHeightToContain)
                };
            }
            else {
                /** @type {?} */
                var minWidthToContain = originalSize.height * cropperSettings.aspectRatio;
                /** @type {?} */
                var minHeightToContain = originalSize.width / cropperSettings.aspectRatio;
                return {
                    width: Math.max(originalSize.width, minWidthToContain),
                    height: Math.max(originalSize.height, minHeightToContain)
                };
            }
        }
        if (canvasRotation % 2) {
            return {
                height: originalSize.width,
                width: originalSize.height
            };
        }
        return {
            width: originalSize.width,
            height: originalSize.height
        };
    };
    LoadImageService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ LoadImageService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function LoadImageService_Factory() { return new LoadImageService(); }, token: LoadImageService, providedIn: "root" });
    return LoadImageService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/cropper-position.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CropperPositionService = /** @class */ (function () {
    function CropperPositionService() {
    }
    /**
     * @param {?} sourceImage
     * @param {?} cropperPosition
     * @param {?} settings
     * @return {?}
     */
    CropperPositionService.prototype.resetCropperPosition = /**
     * @param {?} sourceImage
     * @param {?} cropperPosition
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, cropperPosition, settings) {
        if (!(sourceImage === null || sourceImage === void 0 ? void 0 : sourceImage.nativeElement)) {
            return;
        }
        /** @type {?} */
        var sourceImageElement = sourceImage.nativeElement;
        if (settings.cropperStaticHeight && settings.cropperStaticWidth) {
            cropperPosition.x1 = 0;
            cropperPosition.x2 = sourceImageElement.offsetWidth > settings.cropperStaticWidth ?
                settings.cropperStaticWidth : sourceImageElement.offsetWidth;
            cropperPosition.y1 = 0;
            cropperPosition.y2 = sourceImageElement.offsetHeight > settings.cropperStaticHeight ?
                settings.cropperStaticHeight : sourceImageElement.offsetHeight;
        }
        else {
            /** @type {?} */
            var cropperWidth = Math.min(settings.cropperScaledMaxWidth, sourceImageElement.offsetWidth);
            /** @type {?} */
            var cropperHeight = Math.min(settings.cropperScaledMaxHeight, sourceImageElement.offsetHeight);
            if (!settings.maintainAspectRatio) {
                cropperPosition.x1 = 0;
                cropperPosition.x2 = cropperWidth;
                cropperPosition.y1 = 0;
                cropperPosition.y2 = cropperHeight;
            }
            else if (cropperWidth / settings.aspectRatio < cropperHeight) {
                cropperPosition.x1 = 0;
                cropperPosition.x2 = cropperWidth;
                /** @type {?} */
                var cropperHeightWithAspectRatio = cropperWidth / settings.aspectRatio;
                cropperPosition.y1 = (sourceImageElement.offsetHeight - cropperHeightWithAspectRatio) / 2;
                cropperPosition.y2 = cropperPosition.y1 + cropperHeightWithAspectRatio;
            }
            else {
                cropperPosition.y1 = 0;
                cropperPosition.y2 = cropperHeight;
                /** @type {?} */
                var cropperWidthWithAspectRatio = cropperHeight * settings.aspectRatio;
                cropperPosition.x1 = (sourceImageElement.offsetWidth - cropperWidthWithAspectRatio) / 2;
                cropperPosition.x2 = cropperPosition.x1 + cropperWidthWithAspectRatio;
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @return {?}
     */
    CropperPositionService.prototype.move = /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @return {?}
     */
    function (event, moveStart, cropperPosition) {
        /** @type {?} */
        var diffX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        var diffY = this.getClientY(event) - moveStart.clientY;
        cropperPosition.x1 = moveStart.x1 + diffX;
        cropperPosition.y1 = moveStart.y1 + diffY;
        cropperPosition.x2 = moveStart.x2 + diffX;
        cropperPosition.y2 = moveStart.y2 + diffY;
    };
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    CropperPositionService.prototype.resize = /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    function (event, moveStart, cropperPosition, maxSize, settings) {
        /** @type {?} */
        var moveX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        var moveY = this.getClientY(event) - moveStart.clientY;
        switch (moveStart.position) {
            case 'left':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                break;
            case 'topleft':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'top':
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'topright':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'right':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                break;
            case 'bottomright':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'bottom':
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'bottomleft':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'center':
                /** @type {?} */
                var scale = event.scale;
                /** @type {?} */
                var newWidth = Math.min(Math.max(settings.cropperScaledMinWidth, (Math.abs(moveStart.x2 - moveStart.x1)) * scale), settings.cropperScaledMaxWidth);
                /** @type {?} */
                var newHeight = Math.min(Math.max(settings.cropperScaledMinHeight, (Math.abs(moveStart.y2 - moveStart.y1)) * scale), settings.cropperScaledMaxHeight);
                cropperPosition.x1 = moveStart.clientX - newWidth / 2;
                cropperPosition.x2 = moveStart.clientX + newWidth / 2;
                cropperPosition.y1 = moveStart.clientY - newHeight / 2;
                cropperPosition.y2 = moveStart.clientY + newHeight / 2;
                if (cropperPosition.x1 < 0) {
                    cropperPosition.x2 -= cropperPosition.x1;
                    cropperPosition.x1 = 0;
                }
                else if (cropperPosition.x2 > maxSize.width) {
                    cropperPosition.x1 -= (cropperPosition.x2 - maxSize.width);
                    cropperPosition.x2 = maxSize.width;
                }
                if (cropperPosition.y1 < 0) {
                    cropperPosition.y2 -= cropperPosition.y1;
                    cropperPosition.y1 = 0;
                }
                else if (cropperPosition.y2 > maxSize.height) {
                    cropperPosition.y1 -= (cropperPosition.y2 - maxSize.height);
                    cropperPosition.y2 = maxSize.height;
                }
                break;
        }
        if (settings.maintainAspectRatio) {
            this.checkAspectRatio(moveStart.position, cropperPosition, maxSize, settings);
        }
    };
    /**
     * @param {?} position
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    CropperPositionService.prototype.checkAspectRatio = /**
     * @param {?} position
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    function (position, cropperPosition, maxSize, settings) {
        /** @type {?} */
        var overflowX = 0;
        /** @type {?} */
        var overflowY = 0;
        switch (position) {
            case 'top':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'bottom':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : (overflowX / settings.aspectRatio);
                }
                break;
            case 'topleft':
                cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(0 - cropperPosition.x1, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x1 += (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'topright':
                cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'right':
            case 'bottomright':
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'left':
            case 'bottomleft':
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(0 - cropperPosition.x1, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x1 += (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'center':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                /** @type {?} */
                var overflowX1 = Math.max(0 - cropperPosition.x1, 0);
                /** @type {?} */
                var overflowX2 = Math.max(cropperPosition.x2 - maxSize.width, 0);
                /** @type {?} */
                var overflowY1 = Math.max(cropperPosition.y2 - maxSize.height, 0);
                /** @type {?} */
                var overflowY2 = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX1 > 0 || overflowX2 > 0 || overflowY1 > 0 || overflowY2 > 0) {
                    cropperPosition.x1 += (overflowY1 * settings.aspectRatio) > overflowX1 ? (overflowY1 * settings.aspectRatio) : overflowX1;
                    cropperPosition.x2 -= (overflowY2 * settings.aspectRatio) > overflowX2 ? (overflowY2 * settings.aspectRatio) : overflowX2;
                    cropperPosition.y1 += (overflowY2 * settings.aspectRatio) > overflowX2 ? overflowY2 : overflowX2 / settings.aspectRatio;
                    cropperPosition.y2 -= (overflowY1 * settings.aspectRatio) > overflowX1 ? overflowY1 : overflowX1 / settings.aspectRatio;
                }
                break;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CropperPositionService.prototype.getClientX = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX) || 0;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CropperPositionService.prototype.getClientY = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientY : event.clientY) || 0;
    };
    CropperPositionService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ CropperPositionService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function CropperPositionService_Factory() { return new CropperPositionService(); }, token: CropperPositionService, providedIn: "root" });
    return CropperPositionService;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/keyboard.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} key
 * @return {?}
 */
function getPositionForKey(key) {
    switch (key) {
        case 'ArrowUp':
            return 'top';
        case 'ArrowRight':
            return 'right';
        case 'ArrowDown':
            return 'bottom';
        case 'ArrowLeft':
        default:
            return 'left';
    }
}
/**
 * @param {?} key
 * @return {?}
 */
function getInvertedPositionForKey(key) {
    switch (key) {
        case 'ArrowUp':
            return 'bottom';
        case 'ArrowRight':
            return 'left';
        case 'ArrowDown':
            return 'top';
        case 'ArrowLeft':
        default:
            return 'right';
    }
}
/**
 * @param {?} key
 * @param {?} stepSize
 * @return {?}
 */
function getEventForKey(key, stepSize) {
    switch (key) {
        case 'ArrowUp':
            return { clientX: 0, clientY: stepSize * -1 };
        case 'ArrowRight':
            return { clientX: stepSize, clientY: 0 };
        case 'ArrowDown':
            return { clientX: 0, clientY: stepSize };
        case 'ArrowLeft':
        default:
            return { clientX: stepSize * -1, clientY: 0 };
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/component/image-cropper.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImageCropperComponent = /** @class */ (function () {
    function ImageCropperComponent(cropService, cropperPositionService, loadImageService, sanitizer, cd) {
        this.cropService = cropService;
        this.cropperPositionService = cropperPositionService;
        this.loadImageService = loadImageService;
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.Hammer = typeof window !== 'undefined'
            ? (/** @type {?} */ (((/** @type {?} */ (window))).Hammer))
            : null;
        this.settings = new CropperSettings();
        this.setImageMaxSizeRetries = 0;
        this.marginLeft = '0px';
        this.moveTypes = MoveTypes;
        this.imageVisible = false;
        this.format = this.settings.format;
        this.transform = {};
        this.maintainAspectRatio = this.settings.maintainAspectRatio;
        this.aspectRatio = this.settings.aspectRatio;
        this.resizeToWidth = this.settings.resizeToWidth;
        this.resizeToHeight = this.settings.resizeToHeight;
        this.cropperMinWidth = this.settings.cropperMinWidth;
        this.cropperMinHeight = this.settings.cropperMinHeight;
        this.cropperMaxHeight = this.settings.cropperMaxHeight;
        this.cropperMaxWidth = this.settings.cropperMaxWidth;
        this.cropperStaticWidth = this.settings.cropperStaticWidth;
        this.cropperStaticHeight = this.settings.cropperStaticHeight;
        this.canvasRotation = this.settings.canvasRotation;
        this.initialStepSize = this.settings.initialStepSize;
        this.roundCropper = this.settings.roundCropper;
        this.onlyScaleDown = this.settings.onlyScaleDown;
        this.imageQuality = this.settings.imageQuality;
        this.autoCrop = this.settings.autoCrop;
        this.backgroundColor = this.settings.backgroundColor;
        this.containWithinAspectRatio = this.settings.containWithinAspectRatio;
        this.hideResizeSquares = this.settings.hideResizeSquares;
        this.cropper = {
            x1: -100,
            y1: -100,
            x2: 10000,
            y2: 10000
        };
        this.alignImage = this.settings.alignImage;
        this.disabled = false;
        this.imageCropped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.startCropImage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.imageLoaded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.cropperReady = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.loadImageFailed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.reset();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ImageCropperComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        this.onChangesUpdateSettings(changes);
        this.onChangesInputImage(changes);
        if (this.loadedImage && this.loadedImage.original.image.complete
            && (changes.containWithinAspectRatio || changes.canvasRotation)) {
            this.loadImageService
                .transformLoadedImage(this.loadedImage, this.settings)
                .then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.setLoadedImage(res); }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.loadImageError(err); }));
        }
        if (changes.cropper || changes.maintainAspectRatio || changes.aspectRatio) {
            this.setMaxSize();
            this.setCropperScaledMinSize();
            this.setCropperScaledMaxSize();
            if (this.maintainAspectRatio && (changes.maintainAspectRatio || changes.aspectRatio)) {
                this.resetCropperPosition();
            }
            else if (changes.cropper) {
                this.checkCropperPosition(false);
                this.doAutoCrop();
            }
            this.cd.markForCheck();
        }
        if (changes.transform) {
            this.transform = this.transform || {};
            this.setCssTransform();
            this.doAutoCrop();
        }
    };
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    ImageCropperComponent.prototype.onChangesUpdateSettings = /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.settings.setOptionsFromChanges(changes);
        if (this.settings.cropperStaticHeight && this.settings.cropperStaticWidth) {
            this.settings.setOptions({
                hideResizeSquares: true,
                cropperMinWidth: this.settings.cropperStaticWidth,
                cropperMinHeight: this.settings.cropperStaticHeight,
                cropperMaxHeight: this.settings.cropperStaticHeight,
                cropperMaxWidth: this.settings.cropperStaticWidth,
                maintainAspectRatio: false
            });
        }
    };
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    ImageCropperComponent.prototype.onChangesInputImage = /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.imageChangedEvent || changes.imageURL || changes.imageBase64 || changes.imageFile) {
            this.reset();
        }
        if (changes.imageChangedEvent && this.isValidImageChangedEvent()) {
            this.loadImageFile(this.imageChangedEvent.target.files[0]);
        }
        if (changes.imageURL && this.imageURL) {
            this.loadImageFromURL(this.imageURL);
        }
        if (changes.imageBase64 && this.imageBase64) {
            this.loadBase64Image(this.imageBase64);
        }
        if (changes.imageFile && this.imageFile) {
            this.loadImageFile(this.imageFile);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.isValidImageChangedEvent = /**
     * @private
     * @return {?}
     */
    function () {
        return this.imageChangedEvent
            && this.imageChangedEvent.target
            && this.imageChangedEvent.target.files
            && this.imageChangedEvent.target.files.length > 0;
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.setCssTransform = /**
     * @private
     * @return {?}
     */
    function () {
        this.safeTransformStyle = this.sanitizer.bypassSecurityTrustStyle('scaleX(' + (this.transform.scale || 1) * (this.transform.flipH ? -1 : 1) + ')' +
            'scaleY(' + (this.transform.scale || 1) * (this.transform.flipV ? -1 : 1) + ')' +
            'rotate(' + (this.transform.rotate || 0) + 'deg)');
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.settings.stepSize = this.initialStepSize;
        this.activatePinchGesture();
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.reset = /**
     * @private
     * @return {?}
     */
    function () {
        this.imageVisible = false;
        this.loadedImage = null;
        this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg'
            + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU'
            + 'AAarVyFEAAAAASUVORK5CYII=';
        this.moveStart = {
            active: false,
            type: null,
            position: null,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            clientX: 0,
            clientY: 0
        };
        this.maxSize = {
            width: 0,
            height: 0
        };
        this.cropper.x1 = -100;
        this.cropper.y1 = -100;
        this.cropper.x2 = 10000;
        this.cropper.y2 = 10000;
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    ImageCropperComponent.prototype.loadImageFile = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _this = this;
        this.loadImageService
            .loadImageFile(file, this.settings)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.setLoadedImage(res); }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.loadImageError(err); }));
    };
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    ImageCropperComponent.prototype.loadBase64Image = /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    function (imageBase64) {
        var _this = this;
        this.loadImageService
            .loadBase64Image(imageBase64, this.settings)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.setLoadedImage(res); }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.loadImageError(err); }));
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    ImageCropperComponent.prototype.loadImageFromURL = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        this.loadImageService
            .loadImageFromURL(url, this.settings)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.setLoadedImage(res); }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.loadImageError(err); }));
    };
    /**
     * @private
     * @param {?} loadedImage
     * @return {?}
     */
    ImageCropperComponent.prototype.setLoadedImage = /**
     * @private
     * @param {?} loadedImage
     * @return {?}
     */
    function (loadedImage) {
        this.loadedImage = loadedImage;
        this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loadedImage.transformed.base64);
        this.cd.markForCheck();
    };
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    ImageCropperComponent.prototype.loadImageError = /**
     * @private
     * @param {?} error
     * @return {?}
     */
    function (error) {
        console.error(error);
        this.loadImageFailed.emit();
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.imageLoadedInView = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.loadedImage != null) {
            this.imageLoaded.emit(this.loadedImage);
            this.setImageMaxSizeRetries = 0;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.checkImageMaxSizeRecursively(); }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.checkImageMaxSizeRecursively = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.setImageMaxSizeRetries > 40) {
            this.loadImageFailed.emit();
        }
        else if (this.sourceImageLoaded()) {
            this.setMaxSize();
            this.setCropperScaledMinSize();
            this.setCropperScaledMaxSize();
            this.resetCropperPosition();
            this.cropperReady.emit(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.maxSize));
            this.cd.markForCheck();
        }
        else {
            this.setImageMaxSizeRetries++;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.checkImageMaxSizeRecursively(); }), 50);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.sourceImageLoaded = /**
     * @private
     * @return {?}
     */
    function () {
        return this.sourceImage && this.sourceImage.nativeElement && this.sourceImage.nativeElement.offsetWidth > 0;
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        if (!this.loadedImage) {
            return;
        }
        this.resizeCropperPosition();
        this.setMaxSize();
        this.setCropperScaledMinSize();
        this.setCropperScaledMaxSize();
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.activatePinchGesture = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.Hammer) {
            /** @type {?} */
            var hammer = new this.Hammer(this.wrapper.nativeElement);
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinchmove', this.onPinch.bind(this));
            hammer.on('pinchend', this.pinchStop.bind(this));
            hammer.on('pinchstart', this.startPinch.bind(this));
        }
        else if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])()) {
            console.warn('[NgxImageCropper] Could not find HammerJS - Pinch Gesture won\'t work');
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.resizeCropperPosition = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceImageElement = this.sourceImage.nativeElement;
        if (this.maxSize.width !== sourceImageElement.offsetWidth || this.maxSize.height !== sourceImageElement.offsetHeight) {
            this.cropper.x1 = this.cropper.x1 * sourceImageElement.offsetWidth / this.maxSize.width;
            this.cropper.x2 = this.cropper.x2 * sourceImageElement.offsetWidth / this.maxSize.width;
            this.cropper.y1 = this.cropper.y1 * sourceImageElement.offsetHeight / this.maxSize.height;
            this.cropper.y2 = this.cropper.y2 * sourceImageElement.offsetHeight / this.maxSize.height;
        }
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.resetCropperPosition = /**
     * @return {?}
     */
    function () {
        this.cropperPositionService.resetCropperPosition(this.sourceImage, this.cropper, this.settings);
        this.doAutoCrop();
        this.imageVisible = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.keyboardAccess = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.changeKeyboardStepSize(event);
        this.keyboardMoveCropper(event);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.changeKeyboardStepSize = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.key >= '1' && event.key <= '9') {
            this.settings.stepSize = +event.key;
            return;
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.keyboardMoveCropper = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyboardWhiteList = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
        if (!(keyboardWhiteList.includes(event.key))) {
            return;
        }
        /** @type {?} */
        var moveType = event.shiftKey ? MoveTypes.Resize : MoveTypes.Move;
        /** @type {?} */
        var position = event.altKey ? getInvertedPositionForKey(event.key) : getPositionForKey(event.key);
        /** @type {?} */
        var moveEvent = getEventForKey(event.key, this.settings.stepSize);
        event.preventDefault();
        event.stopPropagation();
        this.startMove({ clientX: 0, clientY: 0 }, moveType, position);
        this.moveImg(moveEvent);
        this.moveStop();
    };
    /**
     * @param {?} event
     * @param {?} moveType
     * @param {?=} position
     * @return {?}
     */
    ImageCropperComponent.prototype.startMove = /**
     * @param {?} event
     * @param {?} moveType
     * @param {?=} position
     * @return {?}
     */
    function (event, moveType, position) {
        if (position === void 0) { position = null; }
        if (this.moveStart && this.moveStart.active && this.moveStart.type === MoveTypes.Pinch) {
            return;
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        this.moveStart = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ active: true, type: moveType, position: position, clientX: this.cropperPositionService.getClientX(event), clientY: this.cropperPositionService.getClientY(event) }, this.cropper);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.startPinch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.safeImgDataUrl) {
            return;
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        this.moveStart = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ active: true, type: MoveTypes.Pinch, position: 'center', clientX: this.cropper.x1 + (this.cropper.x2 - this.cropper.x1) / 2, clientY: this.cropper.y1 + (this.cropper.y2 - this.cropper.y1) / 2 }, this.cropper);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.moveImg = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.moveStart.active) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (this.moveStart.type === MoveTypes.Move) {
                this.cropperPositionService.move(event, this.moveStart, this.cropper);
                this.checkCropperPosition(true);
            }
            else if (this.moveStart.type === MoveTypes.Resize) {
                if (!this.cropperStaticWidth && !this.cropperStaticHeight) {
                    this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
                }
                this.checkCropperPosition(false);
            }
            this.cd.detectChanges();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.onPinch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.moveStart.active) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (this.moveStart.type === MoveTypes.Pinch) {
                this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
                this.checkCropperPosition(false);
            }
            this.cd.detectChanges();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.setMaxSize = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.sourceImage) {
            /** @type {?} */
            var sourceImageElement = this.sourceImage.nativeElement;
            this.maxSize.width = sourceImageElement.offsetWidth;
            this.maxSize.height = sourceImageElement.offsetHeight;
            this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.setCropperScaledMinSize = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.loadedImage && this.loadedImage.transformed && this.loadedImage.transformed.image) {
            this.setCropperScaledMinWidth();
            this.setCropperScaledMinHeight();
        }
        else {
            this.settings.cropperScaledMinWidth = 20;
            this.settings.cropperScaledMinHeight = 20;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.setCropperScaledMinWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.settings.cropperScaledMinWidth = this.cropperMinWidth > 0
            ? Math.max(20, this.cropperMinWidth / this.loadedImage.transformed.image.width * this.maxSize.width)
            : 20;
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.setCropperScaledMinHeight = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.maintainAspectRatio) {
            this.settings.cropperScaledMinHeight = Math.max(20, this.settings.cropperScaledMinWidth / this.aspectRatio);
        }
        else if (this.cropperMinHeight > 0) {
            this.settings.cropperScaledMinHeight = Math.max(20, this.cropperMinHeight / this.loadedImage.transformed.image.height * this.maxSize.height);
        }
        else {
            this.settings.cropperScaledMinHeight = 20;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.setCropperScaledMaxSize = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.loadedImage && this.loadedImage.transformed && this.loadedImage.transformed.image) {
            /** @type {?} */
            var ratio = this.loadedImage.transformed.size.width / this.maxSize.width;
            this.settings.cropperScaledMaxWidth = this.cropperMaxWidth > 20 ? this.cropperMaxWidth / ratio : this.maxSize.width;
            this.settings.cropperScaledMaxHeight = this.cropperMaxHeight > 20 ? this.cropperMaxHeight / ratio : this.maxSize.height;
            if (this.maintainAspectRatio) {
                if (this.settings.cropperScaledMaxWidth > this.settings.cropperScaledMaxHeight * this.aspectRatio) {
                    this.settings.cropperScaledMaxWidth = this.settings.cropperScaledMaxHeight * this.aspectRatio;
                }
                else if (this.settings.cropperScaledMaxWidth < this.settings.cropperScaledMaxHeight * this.aspectRatio) {
                    this.settings.cropperScaledMaxHeight = this.settings.cropperScaledMaxWidth / this.aspectRatio;
                }
            }
        }
        else {
            this.settings.cropperScaledMaxWidth = this.maxSize.width;
            this.settings.cropperScaledMaxHeight = this.maxSize.height;
        }
    };
    /**
     * @private
     * @param {?=} maintainSize
     * @return {?}
     */
    ImageCropperComponent.prototype.checkCropperPosition = /**
     * @private
     * @param {?=} maintainSize
     * @return {?}
     */
    function (maintainSize) {
        if (maintainSize === void 0) { maintainSize = false; }
        if (this.cropper.x1 < 0) {
            this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
            this.cropper.x1 = 0;
        }
        if (this.cropper.y1 < 0) {
            this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
            this.cropper.y1 = 0;
        }
        if (this.cropper.x2 > this.maxSize.width) {
            this.cropper.x1 -= maintainSize ? (this.cropper.x2 - this.maxSize.width) : 0;
            this.cropper.x2 = this.maxSize.width;
        }
        if (this.cropper.y2 > this.maxSize.height) {
            this.cropper.y1 -= maintainSize ? (this.cropper.y2 - this.maxSize.height) : 0;
            this.cropper.y2 = this.maxSize.height;
        }
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.moveStop = /**
     * @return {?}
     */
    function () {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.doAutoCrop();
        }
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.pinchStop = /**
     * @return {?}
     */
    function () {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.doAutoCrop();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.doAutoCrop = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.autoCrop) {
            this.crop();
        }
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.crop = /**
     * @return {?}
     */
    function () {
        if (this.sourceImage && this.sourceImage.nativeElement && this.loadedImage.transformed.image != null) {
            this.startCropImage.emit();
            /** @type {?} */
            var output = this.cropService.crop(this.sourceImage, this.loadedImage, this.cropper, this.settings);
            if (output != null) {
                this.imageCropped.emit(output);
            }
            return output;
        }
        return null;
    };
    ImageCropperComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'image-cropper',
                    template: "<div [style.background]=\"imageVisible && backgroundColor\"\n     #wrapper\n>\n    <img\n      #sourceImage\n      class=\"source-image\"\n      *ngIf=\"safeImgDataUrl\"\n      [src]=\"safeImgDataUrl\"\n      [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n      [style.transform]=\"safeTransformStyle\"\n      (load)=\"imageLoadedInView()\"\n    />\n    <div\n        class=\"overlay\"\n        [style.width.px]=\"maxSize.width\"\n        [style.height.px]=\"maxSize.height\"\n        [style.margin-left]=\"alignImage === 'center' ? marginLeft : null\"\n    ></div>\n    <div class=\"cropper\"\n         *ngIf=\"imageVisible\"\n         [class.rounded]=\"roundCropper\"\n         [style.top.px]=\"cropper.y1\"\n         [style.left.px]=\"cropper.x1\"\n         [style.width.px]=\"cropper.x2 - cropper.x1\"\n         [style.height.px]=\"cropper.y2 - cropper.y1\"\n         [style.margin-left]=\"alignImage === 'center' ? marginLeft : null\"\n         [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n         (keydown)=\"keyboardAccess($event)\"\n         tabindex=\"0\"\n    >\n        <div\n            (mousedown)=\"startMove($event, moveTypes.Move)\"\n            (touchstart)=\"startMove($event, moveTypes.Move)\"\n            class=\"move\">\n        </div>\n        <ng-container *ngIf=\"!hideResizeSquares\">\n            <span class=\"resize topleft\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'topleft')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'topleft')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize top\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize topright\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'topright')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'topright')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize right\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize bottomright\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'bottomright')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'bottomright')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize bottom\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize bottomleft\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'bottomleft')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'bottomleft')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize left\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize-bar top\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'top')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'top')\">\n            </span>\n            <span class=\"resize-bar right\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'right')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'right')\">\n            </span>\n            <span class=\"resize-bar bottom\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'bottom')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'bottom')\">\n            </span>\n            <span class=\"resize-bar left\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'left')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'left')\">\n            </span>\n        </ng-container>\n    </div>\n</div>\n",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
                    styles: [":host{display:flex;position:relative;width:100%;max-width:100%;max-height:100%;overflow:hidden;padding:5px;text-align:center}:host>div{width:100%;position:relative}:host>div img.source-image{max-width:100%;max-height:100%;transform-origin:center}:host .overlay{position:absolute;pointer-events:none;touch-action:none;outline:var(--cropper-overlay-color,#fff) solid 100vw;top:0;left:0}:host .cropper{position:absolute;display:flex;color:#53535c;background:0 0;outline:rgba(255,255,255,.3) solid 100vw;outline:var(--cropper-outline-color,rgba(255,255,255,.3)) solid 100vw;touch-action:none}:host .cropper:after{position:absolute;content:\"\";top:0;bottom:0;left:0;right:0;pointer-events:none;border:1px dashed;opacity:.75;color:inherit;z-index:1}:host .cropper .move{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}:host .cropper:focus .move{border-color:#1e90ff;border-width:2px}:host .cropper .resize{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}:host .cropper .resize .square{display:inline-block;background:#53535c;width:6px;height:6px;border:1px solid rgba(255,255,255,.5);box-sizing:content-box}:host .cropper .resize.topleft{top:-12px;left:-12px;cursor:nwse-resize}:host .cropper .resize.top{top:-12px;left:calc(50% - 12px);cursor:ns-resize}:host .cropper .resize.topright{top:-12px;right:-12px;cursor:nesw-resize}:host .cropper .resize.right{top:calc(50% - 12px);right:-12px;cursor:ew-resize}:host .cropper .resize.bottomright{bottom:-12px;right:-12px;cursor:nwse-resize}:host .cropper .resize.bottom{bottom:-12px;left:calc(50% - 12px);cursor:ns-resize}:host .cropper .resize.bottomleft{bottom:-12px;left:-12px;cursor:nesw-resize}:host .cropper .resize.left{top:calc(50% - 12px);left:-12px;cursor:ew-resize}:host .cropper .resize-bar{position:absolute;z-index:1}:host .cropper .resize-bar.top{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}:host .cropper .resize-bar.right{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}:host .cropper .resize-bar.bottom{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}:host .cropper .resize-bar.left{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}:host .cropper.rounded{outline-color:transparent}:host .cropper.rounded:after{border-radius:100%;box-shadow:0 0 0 100vw rgba(255,255,255,.3);box-shadow:0 0 0 100vw var(--cropper-outline-color,rgba(255,255,255,.3))}@media (orientation:portrait){:host .cropper{outline-width:100vh}:host .cropper.rounded:after{box-shadow:0 0 0 100vh rgba(255,255,255,.3);box-shadow:0 0 0 100vh var(--cropper-outline-color,rgba(255,255,255,.3))}}:host .cropper.rounded .move{border-radius:100%}:host.disabled .cropper .move,:host.disabled .cropper .resize,:host.disabled .cropper .resize-bar{display:none}"]
                }] }
    ];
    /** @nocollapse */
    ImageCropperComponent.ctorParameters = function () { return [
        { type: CropService },
        { type: CropperPositionService },
        { type: LoadImageService },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
    ]; };
    ImageCropperComponent.propDecorators = {
        wrapper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['wrapper', { static: true },] }],
        sourceImage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['sourceImage', { static: false },] }],
        imageChangedEvent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        imageURL: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        imageBase64: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        imageFile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        format: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        transform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        maintainAspectRatio: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        aspectRatio: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        resizeToWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        resizeToHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cropperMinWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cropperMinHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cropperMaxHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cropperMaxWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cropperStaticWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cropperStaticHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        canvasRotation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        initialStepSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        roundCropper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onlyScaleDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        imageQuality: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        autoCrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        backgroundColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        containWithinAspectRatio: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        hideResizeSquares: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cropper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        alignImage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"], args: ['style.text-align',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"], args: ['class.disabled',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        imageCropped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        startCropImage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        imageLoaded: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        cropperReady: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        loadImageFailed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['window:resize',] }],
        moveImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['document:mousemove', ['$event'],] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['document:touchmove', ['$event'],] }],
        moveStop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['document:mouseup',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['document:touchend',] }]
    };
    return ImageCropperComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/image-cropper.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImageCropperModule = /** @class */ (function () {
    function ImageCropperModule() {
    }
    ImageCropperModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]
                    ],
                    declarations: [
                        ImageCropperComponent
                    ],
                    exports: [
                        ImageCropperComponent
                    ]
                },] }
    ];
    return ImageCropperModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/blob.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} base64Image
 * @return {?}
 */
function base64ToFile(base64Image) {
    /** @type {?} */
    var split = base64Image.split(',');
    /** @type {?} */
    var type = split[0].replace('data:', '').replace(';base64', '');
    /** @type {?} */
    var byteString = atob(split[1]);
    /** @type {?} */
    var ab = new ArrayBuffer(byteString.length);
    /** @type {?} */
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: type });
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-image-cropper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-image-cropper.js.map


/***/ }),

/***/ "./node_modules/ngx-image-cropper/node_modules/tslib/tslib.es6.js":
/*!************************************************************************!*\
  !*** ./node_modules/ngx-image-cropper/node_modules/tslib/tslib.es6.js ***!
  \************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/app/banner-tab/banner-list/banner-list.component.css":
/*!******************************************************************!*\
  !*** ./src/app/banner-tab/banner-list/banner-list.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-avatar {\r\n    position: relative;\r\n    width: 200px;\r\n    height: 200px;\r\n    overflow: hidden;\r\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n}\r\n#green {\r\n    color: #333;\r\n    background-color: #0cec13;\r\n    border-color: #ccc;\r\n}\r\n.card-avatar img {\r\n    position: absolute;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    top: 50%;\r\n    left: 50%;\r\n    max-width: 100%;\r\n}\r\n.card-title{\r\n    max-width: 100%;\r\n    word-break: break-all;\r\n    margin-left: 10px;\r\n}\r\n.card-body{\r\n    text-align: center;\r\n}\r\n.card-body h4{\r\n    text-align: center;\r\n    margin: 5px auto;\r\n}\r\n.welcome_text .fa-trash {\r\n    margin-left: 15px;\r\n}\r\n.search_box {\r\n    width: 100%;\r\n    float: right;\r\n    margin-right: 25px;\r\n    margin-top: 25px;\r\n}\r\n.search_box,\r\n.search_box .form-group {\r\n    position: relative;\r\n    margin-left: 10px;\r\n    float: left;\r\n}\r\n.search_box input {\r\n    padding: 5px 25px;\r\n}\r\n.search_box .fa {\r\n    position: absolute;\r\n    top: 10px;\r\n    left: 7px;\r\n}\r\n.btn-success {\r\n    width: 150px;\r\n    color: #ffffff;\r\n    padding: 11px;\r\n    font-weight: bold;\r\n    font-size: 18px;\r\n    box-shadow: 5px 10px 18px #f5f5f5;\r\n    border: 0;\r\n    border-radius: 8px;\r\n    background-color: #5c67b8a3;\r\n    margin-bottom: 20px;\r\n}\r\n.btn-success_del {\r\n    width: 112px;\r\n    color: #ffffff;\r\n    padding: 11px;\r\n    font-weight: bold;\r\n    font-size: 18px;\r\n    box-shadow: 5px 10px 18px #f5f5f5;\r\n    border: 0;\r\n    border-radius: 8px;\r\n    background-color: #ff0000a3;\r\n    margin-bottom: 20px;\r\n}\r\n.btn-default {\r\n    background-color: blue;\r\n    color: #ffff;\r\n    padding: 10px 29px;\r\n    outline: none;\r\n    box-shadow: none;\r\n    border: 0;\r\n    border-radius: 6px;\r\n    font-weight: bold;\r\n    float: right;\r\n}\r\n.table>thead>tr>th {\r\n    vertical-align: bottom;\r\n    border-bottom: 2px solid #ddd;\r\n    font-size: 16px;\r\n    text-align: center;\r\n}\r\n.table>tbody>tr>td,\r\n.table>tbody>tr>th,\r\n.table>tfoot>tr>td,\r\n.table>tfoot>tr>th,\r\n.table>thead>tr>td,\r\n.table>thead>tr>th {\r\n    padding: 8px;\r\n    line-height: 1.42857143;\r\n    vertical-align: top;\r\n    border-top: 1px solid #ddd;\r\n    text-align: center;\r\n    font-size: 14px;\r\n}\r\n.welcome .welcome_text {\r\n    padding: 0;\r\n}\r\nagm-map {\r\n    height: 300px;\r\n}\r\n#mixedExample{\r\n    position: relative;\r\n    z-index: 99999;\r\n}\r\n#mixedExample .closebtn{\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    font-size: 17px;\r\n}\r\n#mixedExample .closebtn .fa{\r\n    color: #fff;\r\n}\r\n#expModalAdd1 .modal-header h4{\r\n    font-family: 'Montserrat-SemiBold';\r\n    text-align: center;\r\n    font-size: 21px;\r\n}\r\n#expModalAdd1 .modal-body p  {\r\n    font-family: 'Montserrat-Medium';\r\n    font-size: 19px;\r\n    text-align: center;\r\n    line-height: 40px;\r\n    color: #6d6d6d;\r\n}\r\n#expModalAdd1 .modal-footer {\r\n    text-align: center;\r\n    padding: 0;\r\n    border: 0px;\r\n    background: #dfdfdf;\r\n}\r\n#expModalAdd1 .modal-footer button  {\r\n    font-family: 'Montserrat-SemiBold';\r\n    font-size: 21px;\r\n    color: #000;\r\n    text-align: center;\r\n    border: 0px;\r\n    border-radius: 4px;\r\n    padding: 9px;\r\n    background: #dfdfdf;\r\n    box-shadow: none;\r\n    outline: none;\r\n    width: 50%;\r\n    border-top-left-radius: 0px;\r\n    border-top-right-radius: 0px;\r\n    display: inline-block;\r\n}\r\n#expModalAdd1 .modal-footer button.yes {\r\n    color: #fff;\r\n    background-image: -ms-linear-gradient( -91deg, rgb(84, 115, 247) 1%, rgb(58, 224, 195) 95%);\r\n    box-shadow: -2.025px 8.769px 7px 0px rgba(58, 224, 195, 0.27);\r\n}\r\n#expModalAdd1 .modal-header{\r\n    padding:2px;\r\n    }\r\n#expModalAdd1 .modal-body h5{\r\n    margin: 0;\r\n    margin-bottom: 10px;\r\n    }\r\n#expModalAdd1 .modal-footer{\r\n    background: #dfdfdf;\r\n    border:0;\r\n    padding: 0;\r\n    }\r\n#expModalAdd1 .modal-footer button {\r\n    color: #000;\r\n    text-align: center;\r\n    background: #dfdfdf;\r\n    width: 49.4%;\r\n    display: inline-block;\r\n    padding: 5px;\r\n    }\r\n#expModalAdd1 .modal-footer button.yes {\r\n    color: #fff;\r\n    background:#3ae0e0;\r\n    box-shadow: -2.025px 8.769px 7px 0px rgba(58, 224, 195, 0.27);\r\n    }\r\n.tablebox{\r\n    max-height: 450px;\r\n    overflow-y: auto;\r\n}\r\n.referralbtn{\r\n    background: #4a9de3;\r\n    padding: 5px 8px;\r\n    color: #fff;\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n}\r\n.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td{\r\n    vertical-align: middle;\r\n}\r\n.welcome{\r\n    padding: 5px;\r\n    margin-top: 0;\r\n}\r\n.welcome .welcome_text{\r\n    padding: 0;\r\n}\r\n.tablebox{\r\nmax-height: 700px;\r\noverflow-y: auto;\r\n}\r\n.datebxxx{\r\n    position: relative;\r\n    display:inline-block;\r\n    margin-right: 10px;\r\n}\r\n.datebxxx input{\r\n    width: 200px;\r\n}\r\n.resetbtn{\r\n    position: absolute;\r\n    right: 2%;\r\n    top: 13%;\r\n}\r\nmdb-carousel-item{\r\n    float: left!important;\r\n    width: 100%!important;\r\n    height: 200px!important;\r\n}\r\nmdb-carousel-item video{\r\n    float: left!important;\r\n    width: 100%!important;\r\n    height: 200px!important;\r\n}\r\n#myModal .modal-content{\r\n    background: #000;\r\n}\r\n#myModal .modal-header{\r\n    padding: 0;\r\n    border: 0;\r\n}\r\n#myModal .modal-header .close {\r\n    margin-top: 0px;\r\n    margin-right: 5px;\r\n    opacity: 1;\r\n    color: #fff;\r\n}\r\n#myModal .videobox{\r\n    position: relative;\r\n    width: 31%;\r\n    display: inline-block;\r\n    margin: 8px 5px;;\r\n}\r\n#myModal .videobox img, #myModal .videobox video{\r\n    max-width:100%;\r\n    vertical-align: top;\r\n}\r\n#videoModal .modal-content{\r\n    background: #000;\r\n}\r\n#videoModal .modal-header{\r\n    padding: 0;\r\n    border: 0;\r\n}\r\n#videoModal .modal-header .close {\r\n    margin-top: 0px;\r\n    margin-right: 5px;\r\n    opacity: 1;\r\n    color: #fff;\r\n}\r\n#videoModal .videobox{\r\n    position: relative;\r\n    width: 31%;\r\n    display: inline-block;\r\n    margin: 8px 5px;;\r\n}\r\n#videoModal .videobox img, #videoModal .videobox video{\r\n    max-width:100%;\r\n    vertical-align: top;\r\n}\r\n.imgwrap img{\r\n    max-width:100%;\r\n}\r\n@media only screen and (max-width: 1800px){\r\n.tablebox {\r\nmax-height: 600px;\r\n}\r\n}\r\n@media only screen and (max-width: 1600px){\r\n.tablebox {\r\nmax-height: 550px;\r\n}\r\n}\r\n@media only screen and (max-width: 1400px){\r\n.tablebox {\r\nmax-height: 500px;\r\n}\r\n}\r\n@media only screen and (max-width: 1270px){\r\n    .search_box{\r\n        width: 40%;\r\n    }\r\n}\r\n@media only screen and (max-width: 1120px){\r\n\r\n    .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{\r\n        font-size: 12px;\r\n    }\r\n    .search_box{\r\n        width: 45%;\r\n    }\r\n    .form-control {\r\n        height: 25px;\r\n        font-size: 10px;\r\n    }\r\n    .report_mnth .bootstrap-select>.dropdown-toggle{\r\n        font-size: 14px!important;\r\n        padding-top: 2px;\r\n    }\r\n    .report_mnth .bootstrap-select.btn-group .dropdown-toggle .caret {\r\n        margin-top: -8px;\r\n    }\r\n    .search_box .fa {\r\n        top: 8px;\r\n        font-size: 10px;\r\n    }\r\n    \r\n}\r\n.searc.form-group{\r\n    position: relative;\r\n}\r\n.searc.form-group .fa{\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 16px;\r\n}\r\n.searc1.form-group .fa{\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 195px;\r\n}\r\n.icon{\r\n    margin: 0px 5px;\r\n}\r\n.icon i.fa{\r\n    margin: 0;\r\n}"

/***/ }),

/***/ "./src/app/banner-tab/banner-list/banner-list.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/banner-tab/banner-list/banner-list.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"wrapper\">\r\n\r\n    <!-- Modal End Here -->\r\n    <app-adminsidebar></app-adminsidebar>\r\n    <app-adminheader></app-adminheader>\r\n    <!-- Welcome Section Start Here -->\r\n    <section class=\"dashboard_header_wrap content_wrapper clearfix toggled\">\r\n        <!-- Dashboard Section Start Here-->\r\n        <div class=\"dashboard_data_wrap\">\r\n            <div class=\"dahaboard_heading\" style=\"border-bottom: 1px solid;\r\n            padding-bottom: 10px;\">\r\n                <p>Banners Management</p>\r\n            </div>\r\n            <div>.</div>\r\n            <div class=\"dahaboard_heading\">\r\n                <!-- <button (click)=\"viewEmptyModal()\" type=\"button\" class=\"btn btn-style\">Add a banner for Empty\r\n                    Screen</button> -->\r\n\r\n                <button (click)=\"viewModal()\" type=\"button\" class=\"btn btn-style\">Add New Banner</button>\r\n            </div>\r\n            <div class=\"serachdiv_wrap\">\r\n                <i class=\"fa fa-search\" aria-hidden=\"true\" (click)=search()></i>\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Search Banner Title Here\"\r\n                    (keyup)=searchText($event.target.value,$event)>\r\n            </div>\r\n            <div class=\"dashbord_cont_wrapper\">\r\n\r\n                <div class=\"dashboard_wrap\">\r\n                    <div>\r\n                        <table class=\"table\">\r\n                            <thead class=\"thead-dark\">\r\n                                <tr>\r\n                                    <th>S.no</th>\r\n                                    <th>Banner Title <span><i class=\"fa fa-arrow-up\" (click)=listSort(1)\r\n                                                style=\"cursor : pointer\"></i><i class=\"fa fa-arrow-down\"\r\n                                                (click)=listSort(-1) style=\"cursor : pointer\"></i></span></th>\r\n                                    <th>Date of Publish</th>\r\n                                    <th>End Date</th>\r\n                                    <th>Views</th>\r\n                                    <th>Status</th>\r\n                                    <th>Action</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of list ;let i = index;\">\r\n                                    <td>{{i+1}}.</td>\r\n                                    <td>{{item?.banner_title}}</td>\r\n                                    <td>{{item?.start_date | date : 'mediumDate'}}</td>\r\n                                    <td>{{item?.end_date | date : 'mediumDate'}}</td>\r\n                                    <td>0</td>\r\n                                    <td *ngIf=\"item?.message=='PUBLISHED'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(71, 230, 23)!important;font-weight: bold\">\r\n                                        PUBLISHED\r\n                                    </td>\r\n                                    <td *ngIf=\"item?.message =='SCHEDULED'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(255, 136, 0)!important; font-weight: bold\">\r\n                                        SCHEDULED\r\n                                    </td>\r\n                                    <td *ngIf=\"item?.message =='EXPIRED'\" class=\"text-primary cursor\"\r\n                                        style=\"color: rgb(255, 0, 0)!important; font-weight: bold\">\r\n                                        EXPIRED\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"pos_rel actiondiv\">\r\n                                            <button class=\"dropdown-toggle btn btn-secondary\" data-toggle=\"dropdown\"\r\n                                                role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Action <span\r\n                                                    class=\"caret\"></span></button>\r\n                                            <ul class=\"dropdown-menu\">\r\n                                                <li><a class=\"dropdown-item\" (click)=viewCategory(item)>VIEW</a></li>\r\n                                                <li><a class=\"dropdown-item\" (click)=\"editModal(item)\">EDIT</a></li>\r\n                                                <li *ngIf=\"item.status == '1'\"><a class=\"dropdown-item\"\r\n                                                        (click)=actionModal(item,0)>DELETE</a></li>\r\n                                            </ul>\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Dashboard Section Start Here-->\r\n\r\n    </section>\r\n\r\n\r\n    <!-- View Modal -->\r\n    <div class=\"modal fade\" id=\"addBannerModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <!-- Modal content-->\r\n            <form class=\"\" [formGroup]='myGroup'>\r\n\r\n                <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\r\n                            style=\"font-size: 25px;\">&times;</button>\r\n\r\n                        <h4>{{category_heading}}</h4>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"addcategory_wrap\">\r\n\r\n                            <div class=\"form-group\">\r\n                                <label>Banner Title :</label>\r\n                                <div class=\"inputdiv\">\r\n                                    <div class=\"form-group\">\r\n                                        <input class=\"form-control\" [formControl]=\"myGroup.controls['banner_title']\"\r\n                                            maxlength=\"200\" (keyup)=enterText($event,1)\r\n                                            placeholder=\"Enter Banner Title\">\r\n                                    </div>\r\n\r\n                                    <div class=\"errorDiv\" *ngIf=\"submitted && f.banner_title.errors\"\r\n                                        class=\"invalid-feedback\">\r\n                                        <div style=\"color: red;\"\r\n                                            *ngIf=\"f.banner_title.errors.required || f.banner_title.errors.cannotContainSpace\">\r\n                                            Please Enter Banner Title !</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n\r\n                                <div class=\"col-md-12\">\r\n                                    <div class=\"col-md-6\">\r\n\r\n                                        <label>Banner Publish Date :</label>\r\n                                        <input type=\"date\" name=\"begin\" placeholder=\"dd-mm-yyyy\" value=\"\"\r\n                                            [min]=current_date on-change=selectStartDate($event.target.value)\r\n                                            formControlName=\"start_date\">\r\n\r\n                                        <div class=\"errorDiv\" *ngIf=\"submitted && f.start_date.errors\"\r\n                                            class=\"invalid-feedback\">\r\n                                            <div style=\"color: red;\" *ngIf=\"f.start_date.errors.required\">\r\n                                                Please Select Publish Date !</div>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                    <div class=\"col-md-6\">\r\n\r\n                                        <label>Banner End Date :</label>\r\n                                        <input type=\"date\" name=\"begin\" placeholder=\"dd-mm-yyyy\" value=\"\"\r\n                                            [min]=min_end_date on-change=selectEndDate($event.target.value)\r\n                                            formControlName=\"end_date\">\r\n\r\n                                        <div class=\"errorDiv\" *ngIf=\"submitted && f.end_date.errors\"\r\n                                            class=\"invalid-feedback\">\r\n                                            <div style=\"color: red;\" *ngIf=\"f.end_date.errors.required\">\r\n                                                Please Select End Date !</div>\r\n                                        </div>\r\n\r\n                                    </div>\r\n\r\n                                </div>\r\n                            </div>\r\n                            <div>.</div>\r\n\r\n\r\n                            <div class=\"form-group\">\r\n                                <label>Text over Banner :</label>\r\n                                <div class=\"inputdiv\">\r\n                                    <div class=\"form-group\">\r\n                                        <input class=\"form-control\" [formControl]=\"myGroup.controls['text_over_banner']\"\r\n                                            maxlength=\"200\" (keyup)=enterText($event,2)\r\n                                            placeholder=\"Enter Text over Banner\">\r\n                                    </div>\r\n\r\n                                    <div class=\"errorDiv\" *ngIf=\"submitted && f.text_over_banner.errors\"\r\n                                        class=\"invalid-feedback\">\r\n                                        <div style=\"color: red;\"\r\n                                            *ngIf=\"f.text_over_banner.errors.required || f.banner_title.errors.cannotContainSpace\">\r\n                                            Please Enter Text Over Banner !</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\">\r\n                                <div class=\"formdiv\">\r\n                                    <label>Banner Preview Type:</label>\r\n                                    <div class=\"inputdiv\">\r\n                                        <select class=\"form-control\"\r\n                                            [formControl]=\"myGroup.controls['banner_file_type']\"\r\n                                            (click)=setMedia($event.target.value)>\r\n                                            <option value=\"\">Banner Preview Type:</option>\r\n                                            <option value=\"image\">Image</option>\r\n                                            <option value=\"video\">Video</option>\r\n                                        </select>\r\n\r\n                                        <div class=\"errorDiv\" *ngIf=\"submitted && f.banner_file_type.errors\"\r\n                                            class=\"invalid-feedback\">\r\n                                            <div style=\"color: red;\" *ngIf=\"f.banner_file_type.errors.required\">\r\n                                                Please Select Banner Preview Type !</div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"form-group\" *ngIf=\"accept_media\">\r\n\r\n                                <div class=\"col-md-12\">\r\n                                    <div class=\"col-md-6\">\r\n                                        <label>Banner File:</label>\r\n                                        <div class=\"formdiv\">\r\n                                            <div class=\"col-xs-12 col-sm-12 col-md-12\">\r\n                                                <div class=\"fileinput fileinput-new uploade_img_large\"\r\n                                                    data-provides=\"fileinput\">\r\n\r\n                                                    <label for=\"fileupload\">\r\n                                                        <span class=\"upload\">\r\n\r\n                                                            <!-- Check Conditions for Display Files -->\r\n                                                            <img *ngIf=\"accept_media_type == 'image'\" [src]=url alt=\"\"\r\n                                                                style=\"height: 191px;width: 340px;\" />\r\n\r\n\r\n                                                            <video [src]=url *ngIf=\"accept_media_type == 'video'\"\r\n                                                                width=\"340\" height=\"191\" controls>\r\n                                                                <source [src]=url type=\"video/mp4\">\r\n                                                                Your browser does not support the video tag.\r\n                                                            </video>\r\n\r\n                                                        </span>\r\n                                                    </label>\r\n\r\n\r\n                                                    <input *ngIf=\"accept_media_type == 'video'\" type=\"file\"\r\n                                                        id=\"fileupload\" name=\"...\" formControlName=\"banner_file\"\r\n                                                        accept=\"video/mp4,video/x-m4v,video/*\"\r\n                                                        (change)='onFileChanged($event)'>\r\n\r\n                                                    <input *ngIf=\"accept_media_type == 'image'\" type=\"file\"\r\n                                                        id=\"fileupload\" name=\"...\" formControlName=\"banner_file\"\r\n                                                        accept=\"image/*\" (change)='onFileChanged($event)'>\r\n\r\n\r\n                                                    <div class=\"errorDiv\" *ngIf=\"submitted && f.banner_file.errors\"\r\n                                                        class=\"invalid-feedback\">\r\n                                                        <div style=\"color: red;\" *ngIf=\"f.banner_file.errors.required\">\r\n                                                            Please Select Banner File !</div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                            </div>\r\n\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                            <div>.</div>\r\n\r\n                            <div class=\"form-group\" *ngIf=\"accept_media\">\r\n\r\n                                <div class=\"col-md-12\">\r\n                                    <div class=\"col-md-6\" *ngIf=\"accept_media_type=='video'\">\r\n                                        <div class=\"formdiv\">\r\n                                            <label>Preview Thumbnail:</label>\r\n                                            <div class=\"col-xs-12 col-sm-12 col-md-8\">\r\n                                                <div class=\"fileinput fileinput-new uploade_img_large\"\r\n                                                    data-provides=\"fileinput\">\r\n\r\n                                                    <label for=\"fileupload1\">\r\n                                                        <span class=\"upload\">\r\n                                                            <img [src]=url_cover alt=\"\"\r\n                                                                style=\"height: 191px;width: 340px;\" />\r\n                                                        </span>\r\n                                                    </label>\r\n\r\n                                                    <input type=\"file\" id=\"fileupload1\" name=\"...\"\r\n                                                        formControlName=\"banner_file_thumbnail\"\r\n                                                        (change)='onFileChangedCover($event)' accept=\"image/*\">\r\n\r\n                                                    <div class=\"errorDiv\"\r\n                                                        *ngIf=\"submitted && f.banner_file_thumbnail.errors\"\r\n                                                        class=\"invalid-feedback\">\r\n                                                        <div style=\"color: red;\"\r\n                                                            *ngIf=\"f.banner_file_thumbnail.errors.required\">\r\n                                                            Please Select Banner File Thumbnail !</div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                            </div>\r\n\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n\r\n\r\n\r\n                            <div>.</div>\r\n                            <div class=\"form-group\">\r\n                                <label>Click Type :</label>\r\n                                <div class=\"inputdiv\">\r\n                                    <select class=\"form-control\" [formControl]=\"myGroup.controls['item_type']\"\r\n                                        (click)=itemList($event.target.value)>\r\n                                        <option value=\"\">Select Source</option>\r\n                                        <option value=\"courses\">Courses</option>\r\n                                        <!-- <option value=\"insights\">Insights</option> -->\r\n                                    </select>\r\n\r\n                                    <div class=\"errorDiv\" *ngIf=\"submitted && f.item_type.errors\"\r\n                                        class=\"invalid-feedback\">\r\n                                        <div style=\"color: red;\" *ngIf=\"f.item_type.errors.required\">\r\n                                            Please Select Banner Click Type !</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"form-group\">\r\n                                <label>Click Type Item Id :</label>\r\n                                <div class=\"inputdiv\">\r\n                                    <ng-multiselect-dropdown name=\"city\" [placeholder]=\"'Select Courses'\"\r\n                                        [data]=\"item_list\" formControlName=\"item_id\"\r\n                                        [settings]=\"dropdownSettingsCourses\">\r\n                                    </ng-multiselect-dropdown>\r\n\r\n                                    <div class=\"errorDiv\" *ngIf=\"submitted && f.item_id.errors\"\r\n                                        class=\"invalid-feedback\">\r\n                                        <div style=\"color: red;\" *ngIf=\"f.item_id.errors.required\">\r\n                                            Please Select Banner Click Type Item Id !</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"btndiv\">\r\n                                <ng-container *ngIf=\"!loading; else loader\">\r\n                                    <button type=\"button\" class=\"btn btn-style\" (click)=\"addBanner(myGroup.value)\"\r\n                                        type=\"submit\">Submit\r\n                                    </button>\r\n\r\n\r\n                                    <button type=\"button\" class=\"btn btn-style\" data-dismiss=\"modal\"\r\n                                        type=\"submit\">Cancel\r\n                                    </button>\r\n\r\n\r\n                                </ng-container>\r\n                                <ng-template #loader>\r\n                                    <i class=\"fa fa-spinner fa-spin\"\r\n                                        style=\"position: absolute; font-size:25px; left:40%; color: rgb(35, 87, 5);\"></i>\r\n                                </ng-template>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <!-- View Modal -->\r\n\r\n    <!-- View Empty Modal -->\r\n    <div class=\"modal fade\" id=\"addBannerEmpty\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <!-- Modal content-->\r\n            <form class=\"\" [formGroup]='myGroup'>\r\n\r\n                <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\r\n                            style=\"font-size: 25px;\">&times;</button>\r\n\r\n                        <h4>{{category_heading}}</h4>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"addcategory_wrap\">\r\n\r\n                            <div class=\"form-group\">\r\n                                <label>Banner Title :</label>\r\n                                <div class=\"inputdiv\">\r\n                                    <div class=\"form-group\">\r\n                                        <input class=\"form-control\" [formControl]=\"myGroup.controls['banner_title']\"\r\n                                            maxlength=\"200\">\r\n                                    </div>\r\n\r\n                                    <div class=\"errorDiv\" *ngIf=\"submitted && f.banner_title.errors\"\r\n                                        class=\"invalid-feedback\">\r\n                                        <div style=\"color: red;\" *ngIf=\"f.banner_title.errors.required\">\r\n                                            Please Enter Banner Title !</div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\">\r\n                                <label>Banner File:</label>\r\n                                <div class=\"formdiv\">\r\n\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-12\">\r\n                                        <div class=\"fileinput fileinput-new uploade_img_large\"\r\n                                            data-provides=\"fileinput\">\r\n\r\n                                            <label for=\"fileupload\">\r\n                                                <span class=\"upload\">\r\n                                                    <img [src]=url alt=\"\" style=\"height: 220px;width: 220px;\" />\r\n                                                </span>\r\n                                            </label>\r\n\r\n                                            <input style=\"margin-left: 50px;\" type=\"file\" id=\"fileupload\" name=\"...\"\r\n                                                formControlName=\"banner_file\" (change)='onFileChanged($event)'\r\n                                                accept=\"image/*\">\r\n\r\n                                            <h6>Note : Current Size: {{size}} MB ( Max size: 3 MB )\r\n                                            </h6>\r\n\r\n                                            <div class=\"errorDiv\" *ngIf=\"size > 3\" class=\"invalid-feedback\">\r\n                                                <div style=\"color: red;\">\r\n                                                    Exceed Max Size !</div>\r\n                                            </div>\r\n\r\n                                            <div class=\"errorDiv\" *ngIf=\"submitted && f.banner_file.errors\"\r\n                                                class=\"invalid-feedback\">\r\n                                                <div style=\"color: red;\" *ngIf=\"f.banner_file.errors.required\">\r\n                                                    Please Select Banner File !</div>\r\n                                            </div>\r\n\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\">\r\n                                .\r\n                            </div>\r\n\r\n                            <div class=\"btndiv\">\r\n                                <ng-container *ngIf=\"!loading; else loader\">\r\n                                    <button type=\"button\" class=\"btn btn-style\" (click)=\"addBanner(myGroup.value)\"\r\n                                        type=\"submit\">Submit\r\n                                    </button>\r\n\r\n\r\n                                    <button type=\"button\" class=\"btn btn-style\" data-dismiss=\"modal\"\r\n                                        type=\"submit\">Cancel\r\n                                    </button>\r\n\r\n\r\n                                </ng-container>\r\n                                <ng-template #loader>\r\n                                    <i class=\"fa fa-spinner fa-spin\"\r\n                                        style=\"position: absolute; font-size:25px; left:40%; color: rgb(35, 87, 5);\"></i>\r\n                                </ng-template>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <!-- View  Empty Modal -->\r\n\r\n\r\n\r\n    <!-- Delete Modal -->\r\n    <div class=\"modal fade\" id=\"dltModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <!-- Modal content-->\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-body\">\r\n                    <div class=\"dlt_mdl_wrap\">\r\n                        <h3>Banner Management</h3>\r\n                        <div class=\"dtlcont\">\r\n                            <p>{{heading}}</p>\r\n                        </div>\r\n                        <div class=\"bottombtn\">\r\n                            <button type=\"button\" class=\"btn btn-danger\" (click)=\"actionBanner()\"\r\n                                data-dismiss=\"modal\">{{button_name}}</button>\r\n                            <button type=\"button\" class=\"btn btn-block\" data-dismiss=\"modal\">Cancel</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- Delete Modal -->\r\n\r\n    <!-- Welcome Section End Here -->\r\n</div>"

/***/ }),

/***/ "./src/app/banner-tab/banner-list/banner-list.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/banner-tab/banner-list/banner-list.component.ts ***!
  \*****************************************************************/
/*! exports provided: BannerListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerListComponent", function() { return BannerListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../admin.service */ "./src/app/admin.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common.service */ "./src/app/common.service.ts");
/* harmony import */ var _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-gallery/core */ "./node_modules/@ngx-gallery/core/fesm5/ngx-gallery-core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _date_adapter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../date.adapter */ "./src/app/date.adapter.ts");
/* harmony import */ var _space_validator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../space.validator */ "./src/app/space.validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var BannerListComponent = /** @class */ (function () {
    function BannerListComponent(_fb, gallery, adminService, toastr, formBuilder, _router, commonservice) {
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
        this.view_banner = {};
        this.submitted = false;
        this.editStatus = false;
        this.current_date = new Date().toISOString().split("T")[0];
        this.min_end_date = new Date().toISOString().split("T")[0];
        this.url = "assets/images/add.png";
        this.url_cover = "assets/images/add.png";
        this.query = {
            search: '',
            filter: '',
            check: ''
        };
        this.dropdownSettingsCourses = {};
        this.dropdownSettingsInsights = {};
        this.heading = "Are you sure, you want to delete this category? After successful deletion, this will not be available in the category listing and under the featured section";
        this.action = 1;
        this.button_name = "Delete";
        this.category_heading = "Add New banner";
        this.height = 0;
        this.width = 0;
        this.item_list = [];
        this.edit_id = 0;
        this.accept_media_type = "";
        this.dimension = false;
        this.dimension_error = '';
        this.dimension_cover = false;
        this.dimension_error_cover = '';
        this.size = 0;
        this.size_cover = 0;
        this.accept_media = false;
        this.myGroup = this._fb.group({
            banner_title: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _space_validator__WEBPACK_IMPORTED_MODULE_10__["SpaceValidator"].cannotContainSpace]],
            start_date: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            end_date: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            text_over_banner: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _space_validator__WEBPACK_IMPORTED_MODULE_10__["SpaceValidator"].cannotContainSpace]],
            banner_file_type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            banner_file: [''],
            banner_file_thumbnail: [''],
            item_type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            item_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]]
        });
    }
    BannerListComponent.prototype.ngOnInit = function () {
        this.getBannerList();
        this.dropdownSettingsCourses = {
            singleSelection: true,
            idField: 'course_id',
            textField: 'course_name',
            allowSearchFilter: false,
            disabled: true,
        };
        this.getCoursesList();
    };
    Object.defineProperty(BannerListComponent.prototype, "f", {
        get: function () { return this.myGroup.controls; },
        enumerable: true,
        configurable: true
    });
    BannerListComponent.prototype.setMedia = function (val) {
        this.accept_media_type = val;
        if (val != "")
            this.accept_media = true;
        else
            this.accept_media = false;
    };
    BannerListComponent.prototype.selectStartDate = function (val) {
        this.myGroup.get('start_date').setValue(val);
        this.min_end_date = (this.myGroup.get('start_date').value);
        this.myGroup.get('end_date').setValue('');
    };
    BannerListComponent.prototype.selectEndDate = function (val) {
        var start_date = this.myGroup.get('start_date').value;
        if (start_date == "") {
            this.toastr.error("Please Select Start Date");
            this.myGroup.get('end_date').setValue('');
            return;
        }
        if (new Date(start_date) > new Date(val)) {
            this.toastr.error("Start Date is less than End Date");
            this.myGroup.get('end_date').setValue('');
            return;
        }
        this.myGroup.get('end_date').setValue(val);
    };
    BannerListComponent.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        return [year, month, day].join('-');
    };
    BannerListComponent.prototype.itemList = function (val) {
        this.myGroup.get('item_id').setValue('');
        if (val == 'insights') {
            this.item_list = [];
        }
        else {
            this.getCoursesList();
        }
    };
    BannerListComponent.prototype.getCoursesList = function () {
        var _this = this;
        this.adminService.postApi_No_Loader("admin/courseLists", {}, 1).subscribe(function (response) {
            if (response['code'] == 200 && response['result'].length > 0) {
                _this.item_list = response['result'];
            }
            else {
                _this.item_list = [];
            }
        }, function (error) {
            _this.item_list = [];
        });
    };
    BannerListComponent.prototype.actionModal = function (val, head) {
        $('#dltModal').modal('show');
        this.view_banner = val;
        this.action = head;
        if (head == 0 || head == '0') {
            this.button_name = 'Delete';
            this.heading = "Are you sure, you want to delete this banner? After successful deletion , this will not be available in the banner listing and under the banner section";
        }
        else {
            this.button_name = 'Enable';
            this.heading = "Are you sure, you want to enabled this banner? After successful enabling, this will be available in the banner listing and under the banner section";
        }
    };
    BannerListComponent.prototype.viewCategory = function (val) {
        $('#viewModal').modal('show');
        var str = "";
        val.course_details.forEach(function (ele) {
            str = str.concat(ele.course_name).concat(',');
        });
        val.names = str.substr(0, str.length - 1);
        this.view_banner = val;
    };
    BannerListComponent.prototype.listSort = function (val) {
        if (val == 1 || val == '1') {
            this.list.sort(function (a, b) {
                var x = a.banner_title.toUpperCase(), y = b.banner_title.toUpperCase();
                return x == y ? 0 : x > y ? 1 : -1;
            });
        }
        else {
            this.list.sort(function (a, b) {
                var x = a.banner_title.toUpperCase(), y = b.banner_title.toUpperCase();
                return x == y ? 0 : x < y ? 1 : -1;
            });
        }
    };
    BannerListComponent.prototype.editModal = function (val) {
        this.edit_id = val.banner_id;
        this.myGroup.patchValue({
            banner_title: val.banner_title,
            start_date: val.start_date,
            end_date: val.end_date,
            text_over_banner: val.text_over_banner,
            item_type: val.item_type,
            item_id: val.item_details,
            banner_file_type: val.banner_file_type
        });
        this.accept_media = true;
        this.accept_media_type = val.banner_file_type;
        this.url = val.banner_file;
        this.url_cover = val.banner_file_thumbnail;
        this.category_heading = "Edit Banner";
        this.myGroup.get('banner_file').clearValidators();
        this.myGroup.get('banner_file').updateValueAndValidity();
        $('#addBannerModal').modal('show');
    };
    BannerListComponent.prototype.viewModal = function () {
        this.edit_id = 0;
        this.accept_media_type = "";
        this.accept_media = false;
        this.myGroup.patchValue({
            banner_title: "",
            start_date: "",
            end_date: "",
            text_over_banner: "",
            item_type: "",
            item_id: "",
            banner_file_type: "",
            banner_file: "",
            banner_file_thumbnail: ""
        });
        this.url = "assets/images/add.png";
        this.url_cover = "assets/images/add.png";
        $('#addBannerModal').modal('show');
    };
    BannerListComponent.prototype.viewEmptyModal = function () {
        this.myGroup.patchValue({
            category_name: '',
            course_ids: ''
        });
        $('#addBannerEmpty').modal('show');
    };
    BannerListComponent.prototype.actionBanner = function () {
        var _this = this;
        this.adminService.getApi("admin/actionBanner?banner_id=" + this.view_banner.banner_id + "&status=" + this.action, 1).subscribe(function (response) {
            _this.getBannerList();
        }, function (error) { });
    };
    BannerListComponent.prototype.confirmationTask = function (val) {
        $('#delrestModal').modal('show');
        this.delete_id = val.bank_id;
    };
    BannerListComponent.prototype.search = function () {
        if ((this.query.search).trim() == "") {
            this.toastr.error("Enter Banner Title !");
            return;
        }
        this.getBannerList();
    };
    BannerListComponent.prototype.searchText = function (val, event) {
        this.query.search = val;
        if ((event.target.value).trim() == '') {
            this.getBannerList();
            return event.target.value = "";
        }
        if (event.code == 'Enter') {
            this.getBannerList();
        }
    };
    BannerListComponent.prototype.addBanner = function (val) {
        var _this = this;
        this.submitted = true;
        this.loading = true;
        console.log(this.myGroup);
        if (this.edit_id && this.edit_id != 0) {
            this.myGroup.get('banner_file').clearValidators();
            this.myGroup.get('banner_file').updateValueAndValidity();
            if (this.myGroup.invalid) {
                this.loading = false;
                return;
            }
            this.editBanner(val);
            return;
        }
        else {
            this.myGroup.get('banner_file').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            this.myGroup.get('banner_file').updateValueAndValidity();
            if (this.myGroup.invalid) {
                this.loading = false;
                return;
            }
        }
        var formdata = new FormData();
        formdata.append('banner_title', val.banner_title);
        formdata.append('item_type', val.item_type);
        formdata.append('item_id', val.item_id[0].course_id);
        formdata.append('text_over_banner', val.text_over_banner);
        formdata.append('start_date', this.formatDate(val.start_date));
        formdata.append('end_date', this.formatDate(val.end_date));
        formdata.append('file', this.file);
        formdata.append('file', this.file_cover);
        formdata.append('banner_file_type', val.banner_file_type);
        var check = this.file && this.file_cover ? '3' : this.file ? '1' : this.file_cover ? '2' : '0';
        formdata.append('check', check);
        this.adminService.postApi_No_Loader("admin/addBanner", formdata, 1).subscribe(function (response) {
            if (response['code'] == 200) {
                $('#addBannerModal').modal('hide');
                _this.getBannerList();
            }
            else if (response['code'] == 500) {
                _this.toastr.error("THIS DATES ARE ALREADY TAKEN");
                _this.loading = false;
                return;
            }
            else {
                $('#addBannerModal').modal('hide');
                _this.getBannerList();
            }
        }, function (error) {
            $('#addBannerModal').modal('hide');
            _this.getBannerList();
        });
    };
    BannerListComponent.prototype.enterText = function (e, val) {
        if ((e.target.value).trim() == '') {
            return e.target.value = "";
        }
    };
    BannerListComponent.prototype.editBanner = function (val) {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.myGroup.invalid) {
            return;
        }
        var formdata = new FormData();
        formdata.append('banner_id', this.edit_id);
        formdata.append('banner_title', val.banner_title);
        formdata.append('item_type', val.item_type);
        formdata.append('item_id', val.item_id[0].course_id);
        formdata.append('text_over_banner', val.text_over_banner);
        formdata.append('start_date', this.formatDate(val.start_date));
        formdata.append('end_date', this.formatDate(val.end_date));
        formdata.append('file', this.file);
        formdata.append('file', this.file_cover);
        var check = this.file && this.file_cover ? '3' : this.file ? '1' : this.file_cover ? '2' : '0';
        formdata.append('check', check);
        this.adminService.postApi_No_Loader("admin/editBanner", formdata, 1).subscribe(function (response) {
            if (response['code'] == 200) {
                $('#addBannerModal').modal('hide');
                _this.getBannerList();
            }
            else {
                $('#addBannerModal').modal('hide');
                _this.getBannerList();
            }
        }, function (error) {
            $('#addBannerModal').modal('hide');
            _this.getBannerList();
        });
    };
    BannerListComponent.prototype.getBannerList = function () {
        var _this = this;
        this.loading = true;
        var obj = {
            search: this.query.search
        };
        this.adminService.postApi_No_Loader("admin/bannerList", obj, 1).subscribe(function (response) {
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
    BannerListComponent.prototype.onFileChanged = function (evt) {
        var _this = this;
        /* Check File Type */
        var type = evt.target.files && evt.target.files[0] ? evt.target.files[0].type : '';
        if (this.accept_media_type == 'image') {
            if (type && type != '' && !type.includes('image/')) {
                this.toastr.error("Accept Only Images");
                this.myGroup.get('banner_file').setValue('');
                return;
            }
        }
        if (this.accept_media_type == 'video') {
            if (type && type != '' && !type.includes('video/')) {
                this.toastr.error("Accept Only Videos");
                this.myGroup.get('banner_file').setValue('');
                return;
            }
        }
        this.dimension_error = false;
        this.dimension = false;
        if (evt.target.files && evt.target.files[0]) {
            this.file = evt.target.files[0];
            this.size = ((this.file.size) / (1024 * 1024)).toFixed(2);
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(this.file);
            reader_1.onload = function (evt) {
                _this.url = reader_1.result;
                var img = new Image();
                img.src = reader_1.result;
                img.onload = function () {
                    var height = img.naturalHeight;
                    var width = img.naturalWidth;
                    if (height != 3400 || width != 1920) {
                        _this.dimension = true;
                        return _this.dimension_error = "Size Error --> (Width * Height): " + width + " * " + height;
                    }
                };
            };
        }
    };
    BannerListComponent.prototype.onFileChangedCover = function (evt) {
        var _this = this;
        /* Check File Type */
        var type = evt.target.files && evt.target.files[0] ? evt.target.files[0].type : '';
        if (type && type != '' && !type.includes('image/')) {
            this.toastr.error("Accept Only Images");
            this.myGroup.get('banner_file_thumbnail').setValue('');
            return;
        }
        this.dimension_error_cover = false;
        this.dimension_cover = false;
        if (evt.target.files && evt.target.files[0]) {
            this.file_cover = evt.target.files[0];
            this.size_cover = ((this.file_cover.size) / (1024 * 1024)).toFixed(2);
            var reader_2 = new FileReader();
            reader_2.readAsDataURL(this.file_cover);
            reader_2.onload = function (evt) {
                _this.url_cover = reader_2.result;
                var img = new Image();
                img.src = reader_2.result;
                img.onload = function () {
                    var height = img.naturalHeight;
                    var width = img.naturalWidth;
                    if (height != 3400 || width != 1920) {
                        _this.dimension_cover = true;
                        return _this.dimension_error_cover = "Size Error --> (Width * Height): " + width + " * " + height;
                    }
                };
            };
        }
    };
    BannerListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]
            ]
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-banner-list',
            template: __webpack_require__(/*! ./banner-list.component.html */ "./src/app/banner-tab/banner-list/banner-list.component.html"),
            styles: [__webpack_require__(/*! ./banner-list.component.css */ "./src/app/banner-tab/banner-list/banner-list.component.css")],
            providers: [
                {
                    provide: _angular_material__WEBPACK_IMPORTED_MODULE_8__["DateAdapter"], useClass: _date_adapter__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"]
                },
                {
                    provide: _angular_material__WEBPACK_IMPORTED_MODULE_8__["MAT_DATE_FORMATS"], useValue: _date_adapter__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"]
                }
            ]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_6__["Gallery"], _admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], BannerListComponent);
    return BannerListComponent;
}());



/***/ }),

/***/ "./src/app/banner-tab/banner-tab-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/banner-tab/banner-tab-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: BannerTabRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerTabRoutingModule", function() { return BannerTabRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _banner_list_banner_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./banner-list/banner-list.component */ "./src/app/banner-tab/banner-list/banner-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: "", component: _banner_list_banner_list_component__WEBPACK_IMPORTED_MODULE_2__["BannerListComponent"] },
];
var BannerTabRoutingModule = /** @class */ (function () {
    function BannerTabRoutingModule() {
    }
    BannerTabRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], BannerTabRoutingModule);
    return BannerTabRoutingModule;
}());



/***/ }),

/***/ "./src/app/banner-tab/banner-tab.module.ts":
/*!*************************************************!*\
  !*** ./src/app/banner-tab/banner-tab.module.ts ***!
  \*************************************************/
/*! exports provided: BannerTabModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerTabModule", function() { return BannerTabModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_layout_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_shared/layout.module */ "./src/app/_shared/layout.module.ts");
/* harmony import */ var _shared_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_shared/material.module */ "./src/app/_shared/material.module.ts");
/* harmony import */ var _shared_multiple_select_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_shared/multiple-select.module */ "./src/app/_shared/multiple-select.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_shared/shared.module */ "./src/app/_shared/shared.module.ts");
/* harmony import */ var _shared_tag_chips_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_shared/tag-chips.module */ "./src/app/_shared/tag-chips.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/fesm5/ngx-image-cropper.js");
/* harmony import */ var _banner_tab_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./banner-tab-routing.module */ "./src/app/banner-tab/banner-tab-routing.module.ts");
/* harmony import */ var _banner_list_banner_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./banner-list/banner-list.component */ "./src/app/banner-tab/banner-list/banner-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var BannerTabModule = /** @class */ (function () {
    function BannerTabModule() {
    }
    BannerTabModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _banner_list_banner_list_component__WEBPACK_IMPORTED_MODULE_10__["BannerListComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _banner_tab_routing_module__WEBPACK_IMPORTED_MODULE_9__["BannerTabRoutingModule"],
                _shared_layout_module__WEBPACK_IMPORTED_MODULE_2__["SharedLayoutModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                _shared_multiple_select_module__WEBPACK_IMPORTED_MODULE_4__["multiSelectModule"],
                _shared_tag_chips_module__WEBPACK_IMPORTED_MODULE_6__["TaginputModule"],
                _shared_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__["CKEditorModule"],
                ngx_image_cropper__WEBPACK_IMPORTED_MODULE_8__["ImageCropperModule"]
            ],
            providers: [
                ngx_image_cropper__WEBPACK_IMPORTED_MODULE_8__["ImageCropperModule"]
            ]
        })
    ], BannerTabModule);
    return BannerTabModule;
}());



/***/ }),

/***/ "./src/app/date.adapter.ts":
/*!*********************************!*\
  !*** ./src/app/date.adapter.ts ***!
  \*********************************/
/*! exports provided: AppDateAdapter, APP_DATE_FORMATS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppDateAdapter", function() { return AppDateAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_DATE_FORMATS", function() { return APP_DATE_FORMATS; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AppDateAdapter = /** @class */ (function (_super) {
    __extends(AppDateAdapter, _super);
    function AppDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppDateAdapter.prototype.parse = function (value) {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            var str = value.split('/');
            var year = Number(str[2]);
            var month = Number(str[1]) - 1;
            var date = Number(str[0]);
            return new Date(year, month, date);
        }
        var timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    AppDateAdapter.prototype.format = function (date, displayFormat) {
        if (displayFormat == "input") {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return this._to2digit(day) + '-' + this._to2digit(month) + '-' + year;
        }
        else if (displayFormat == "inputMonth") {
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return this._to2digit(month) + '/' + year;
        }
        else {
            return date.toDateString();
        }
    };
    AppDateAdapter.prototype._to2digit = function (n) {
        return ('00' + n).slice(-2);
    };
    return AppDateAdapter;
}(_angular_material__WEBPACK_IMPORTED_MODULE_0__["NativeDateAdapter"]));

var APP_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        // monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
        monthYearLabel: 'inputMonth',
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};


/***/ })

}]);
//# sourceMappingURL=banner-tab-banner-tab-module.js.map