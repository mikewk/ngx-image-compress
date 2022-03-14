import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { __awaiter } from 'tslib';

/**
 * EXIF tag standard reference
 *
 * Tag Name: Orientation
 * Tag ID: 0x0112
 * Writable: int16u
 * Group: IFD0
 * Values:
 1 = Horizontal (normal)
 2 = Mirror horizontal
 3 = Rotate 180
 4 = Mirror vertical
 5 = Mirror horizontal and rotate 270 CW
 6 = Rotate 90 CW
 7 = Mirror horizontal and rotate 90 CW
 8 = Rotate 270 CW
 */
var DOC_ORIENTATION;
(function (DOC_ORIENTATION) {
    DOC_ORIENTATION[DOC_ORIENTATION["Up"] = 1] = "Up";
    DOC_ORIENTATION[DOC_ORIENTATION["Down"] = 3] = "Down";
    DOC_ORIENTATION[DOC_ORIENTATION["Right"] = 6] = "Right";
    DOC_ORIENTATION[DOC_ORIENTATION["Left"] = 8] = "Left";
    DOC_ORIENTATION[DOC_ORIENTATION["UpMirrored"] = 2] = "UpMirrored";
    DOC_ORIENTATION[DOC_ORIENTATION["DownMirrored"] = 4] = "DownMirrored";
    DOC_ORIENTATION[DOC_ORIENTATION["LeftMirrored"] = 5] = "LeftMirrored";
    DOC_ORIENTATION[DOC_ORIENTATION["RightMirrored"] = 7] = "RightMirrored";
    DOC_ORIENTATION[DOC_ORIENTATION["Default"] = 0] = "Default";
    DOC_ORIENTATION[DOC_ORIENTATION["NotJpeg"] = -1] = "NotJpeg";
    DOC_ORIENTATION[DOC_ORIENTATION["NotDefined"] = -2] = "NotDefined";
})(DOC_ORIENTATION || (DOC_ORIENTATION = {}));

var _a;
class ImageCompress {
}
_a = ImageCompress;
ImageCompress.getOrientation = (file) => new Promise((resolve, reject) => {
    try {
        const reader = new FileReader();
        reader.onload = () => {
            const view = new DataView(reader.result);
            if (!view.byteLength) {
                return resolve(DOC_ORIENTATION.NotDefined);
            }
            if (view.getUint16(0, false) !== 0xffd8) {
                return resolve(DOC_ORIENTATION.NotDefined);
            }
            const length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xffe1) {
                    if (view.getUint32((offset += 2), false) !== 0x45786966) {
                        return resolve(DOC_ORIENTATION.NotJpeg);
                    }
                    const little = view.getUint16((offset += 6), false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + i * 12, little) === 0x0112) {
                            return resolve(view.getUint16(offset + i * 12 + 8, little));
                        }
                    }
                }
                else if ((marker & 0xff00) !== 0xff00) {
                    break;
                }
                else {
                    offset += view.getUint16(offset, false);
                }
            }
            return resolve(DOC_ORIENTATION.NotJpeg);
        };
        reader.readAsArrayBuffer(file);
    }
    catch (e) {
        return reject(DOC_ORIENTATION.Default);
    }
});
ImageCompress.uploadFile = (render, multiple = true) => new Promise(function (resolve, reject) {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    Promise.resolve(isSafari)
        .then((onlyNative) => {
        if (onlyNative) {
            return ImageCompress.generateUploadInputNative(window.document, multiple);
        }
        else {
            return ImageCompress.generateUploadInputRenderer(render, multiple);
        }
    })
        .then((filesList) => {
        const files = filesList ? Array.from(filesList) : [];
        const orientationPromises = files.map((file) => ImageCompress.getOrientation(file));
        const readerPromises = files.map((file) => ImageCompress.fileToDataURL(file));
        let orientationsResult = [];
        Promise.all(orientationPromises)
            .then((orientations) => {
            orientationsResult = orientations;
            return Promise.all(readerPromises);
        })
            .then((readerResult) => {
            if (multiple) {
                const result = readerResult.map((image, index) => ({
                    image,
                    orientation: orientationsResult[index],
                }));
                resolve(result);
            }
            else {
                resolve({
                    image: readerResult[0],
                    orientation: orientationsResult[0],
                });
            }
        });
    });
});
ImageCompress.fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            //myReader.onloadend = (progressEvent: ProgressEvent<FileReader>)
            resolve(e.target.result);
        };
        try {
            reader.readAsDataURL(file);
        }
        catch (e) {
            reject(`ngx-image-compress - probably no file have been selected: ${e}`);
        }
    });
};
ImageCompress.generateUploadInputRenderer = (render, multiple = true) => new Promise((resolve, reject) => {
    const inputElement = render.createElement('input');
    render.setStyle(inputElement, 'display', 'none');
    render.setProperty(inputElement, 'type', 'file');
    render.setProperty(inputElement, 'accept', 'image/*');
    if (multiple) {
        render.setProperty(inputElement, 'multiple', 'true');
    }
    render.listen(inputElement, 'click', ($event) => {
        $event.target.value = '';
    });
    render.listen(inputElement, 'change', ($event) => {
        const files = $event.target.files;
        resolve(files);
    });
    inputElement.click();
});
ImageCompress.generateUploadInputNative = (documentNativeApi, multiple = true) => {
    let lock = false;
    return new Promise((resolve, reject) => {
        const inputElement = documentNativeApi.createElement('input');
        inputElement.id = 'upload-input' + new Date();
        inputElement.style.display = 'none';
        inputElement.setAttribute('type', 'file');
        if (multiple) {
            inputElement.setAttribute('multiple', 'true');
        }
        documentNativeApi.body.appendChild(inputElement);
        inputElement.addEventListener('change', () => {
            lock = true;
            resolve(inputElement.files);
            // remove from dom
            documentNativeApi.body.removeChild(documentNativeApi.getElementById(inputElement.id));
        }, { once: true });
        // file blur
        window.addEventListener('focus', () => {
            setTimeout(() => {
                if (!lock && documentNativeApi.getElementById(inputElement.id)) {
                    reject(new Error('onblur'));
                    // remove from dom
                    documentNativeApi.body.removeChild(documentNativeApi.getElementById(inputElement.id));
                }
            }, 300);
        }, { once: true });
        // open file select box
        inputElement.click();
    });
};
ImageCompress.compress = (imageDataUrlSource, orientation, render, ratio = 50, quality = 50, maxwidth = 0, maxheight = 0) => new Promise(function (resolve, reject) {
    quality = quality / 100;
    ratio = ratio / 100;
    const sourceImage = new Image();
    // important for safari: we need to wait for onload event
    sourceImage.onload = () => {
        const canvas = render.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return reject(`No canvas context available`);
        }
        let w = sourceImage.naturalWidth;
        let h = sourceImage.naturalHeight;
        if (!CSS.supports('image-orientation', 'from-image')) {
            if (orientation === DOC_ORIENTATION.Right ||
                orientation === DOC_ORIENTATION.Left) {
                const t = w;
                w = h;
                h = t;
            }
        }
        let xratio = maxwidth ? maxwidth / w : 1;
        let yratio = maxheight ? maxheight / h : 1;
        ratio = Math.min(ratio, xratio, yratio);
        canvas.width = w * ratio;
        canvas.height = h * ratio;
        const TO_RADIANS = Math.PI / 180;
        if (CSS.supports('image-orientation', 'from-image') ||
            orientation === DOC_ORIENTATION.Up) {
            ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
        }
        else if (orientation === DOC_ORIENTATION.Right) {
            ctx.save();
            ctx.rotate(90 * TO_RADIANS);
            ctx.translate(0, -canvas.width);
            ctx.drawImage(sourceImage, 0, 0, canvas.height, canvas.width);
            ctx.restore();
        }
        else if (orientation === DOC_ORIENTATION.Left) {
            ctx.save();
            ctx.rotate(-90 * TO_RADIANS);
            ctx.translate(-canvas.width, 0);
            ctx.drawImage(sourceImage, 0, 0, canvas.height, canvas.width);
            ctx.restore();
        }
        else if (orientation === DOC_ORIENTATION.Down) {
            ctx.save();
            ctx.rotate(180 * TO_RADIANS);
            ctx.translate(-canvas.width, -canvas.height);
            ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
        else {
            // no orientation value found - same as default UP
            ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
        }
        const mime = imageDataUrlSource.substr(5, imageDataUrlSource.split(';')[0].length - 5);
        // TODO test on mime
        const result = canvas.toDataURL(mime, quality);
        resolve(result);
    };
    sourceImage.onerror = (e) => reject(e);
    sourceImage.src = imageDataUrlSource;
});
ImageCompress.byteCount = (imgString) => encodeURI(imgString).split(/%..|./).length - 1;
ImageCompress.getImageMaxSize = (maxSizeMb, debugMode, render) => __awaiter(void 0, void 0, void 0, function* () {
    const MAX_TRIES = 10;
    const bytesToMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);
    if (debugMode) {
        console.debug('NgxImageCompress - Opening upload window');
    }
    let myFile = (yield ImageCompress.uploadFile(render, false));
    let compressedFile;
    for (let i = 0; i < MAX_TRIES; i++) {
        const previousSize = ImageCompress.byteCount(myFile.image);
        compressedFile = yield ImageCompress.compress(myFile.image, myFile.orientation, render, 50, 100);
        const newSize = ImageCompress.byteCount(compressedFile);
        console.debug('NgxImageCompress -', 'Compression from', bytesToMB(previousSize), 'MB to', bytesToMB(newSize), 'MB');
        if (newSize >= previousSize) {
            if (i === 0) {
                if (debugMode) {
                    console.debug('NgxImageCompress -', "File can't be reduced at all - returning the original", bytesToMB(previousSize), 'MB large');
                }
                throw myFile.image;
            }
            else {
                if (debugMode) {
                    console.debug('NgxImageCompress -', "File can't be reduced more - returning the best we can, which is ", bytesToMB(previousSize), 'MB large');
                }
                throw myFile.image;
            }
        }
        else {
            if (newSize < maxSizeMb * 1024 * 1024) {
                if (debugMode) {
                    console.debug('NgxImageCompress -', 'Here your file', bytesToMB(newSize), 'MB large');
                }
                return compressedFile;
            }
            else if (i === 9) {
                if (debugMode) {
                    console.debug('NgxImageCompress -', "File can't reach the desired size after", MAX_TRIES, 'tries. Returning file ', bytesToMB(previousSize), 'MB large');
                }
                throw myFile.image;
            }
        }
        if (debugMode) {
            console.debug('NgxImageCompress -', 'Reached', bytesToMB(newSize), 'MB large. Trying another time after', i + 1, 'times');
        }
        myFile.image = compressedFile;
    }
    if (debugMode) {
        console.debug('NgxImageCompress - Unexpected error');
    }
    throw '';
});

class NgxImageCompressService {
    constructor(rendererFactory) {
        this.DOC_ORIENTATION = DOC_ORIENTATION;
        this.render = rendererFactory.createRenderer(null, null);
    }
    /**
     * helper to evaluate the compression rate
     * @param imgString the image in base64 string format
     */
    byteCount(image) {
        return ImageCompress.byteCount(image);
    }
    /**
     * Get the correct Orientation value from image tags
     */
    getOrientation(file) {
        return ImageCompress.getOrientation(file);
    }
    /**
     * return a promise with the new image data and image orientation
     */
    uploadFile() {
        return ImageCompress.uploadFile(this.render, false);
    }
    /**
     * return a promise with an array of image data and image orientation
     */
    uploadMultipleFiles() {
        return ImageCompress.uploadFile(this.render, true);
    }
    /**
     * perform a compression from the given DataUrl (string), provided by the uploadFile, or uploadMultipleFiles method
     *
     *
     | Parameter   | Type   | Description                                                                       |
     | ----------- | ------ | --------------------------------------------------------------------------------- |
     | image       | string | DataUrl (string) representing the image                                           |
     | orientation | number | EXIF Orientation value using the DOC_ORIENTATION enum value                       |
     | ratio       | number | Maximum scale factor as a percentage (optional, default: 50) <sup>[1](#fn1)</sup> |
     | quality     | number | JPEG quality factor as a percentage (optional, default: 50) <sup>[2](#fn2)</sup>  |
     | maxwidth    | number | Maximum width in pixels if you need to resize (optional, default: 0 - no resize)  |
     | maxheight   | number | Maximum height in pixels if you need to resize (optional, default: 0 - no resize) |
     */
    compressFile(image, orientation, ratio = 50, quality = 50, maxWidth = 0, maxHeight = 0) {
        return ImageCompress.compress(image, orientation, this.render, ratio, quality, maxWidth, maxHeight);
    }
    /**
     * Most simple function to use here.
     * Perform an upload and return an image dataUrl (string format) with a maximum size, given in *MegaBytes*
     * If the size can't be reached, the best that can be reached will be returned in promise *rejection*
     * Put debugMode to true if you have some trouble to print some help using console.debug
     */
    uploadAndGetImageWithMaxSize(maxSizeMb = 1, debugMode = false) {
        return ImageCompress.getImageMaxSize(maxSizeMb, debugMode, this.render);
    }
}
NgxImageCompressService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: NgxImageCompressService, deps: [{ token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
NgxImageCompressService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: NgxImageCompressService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: NgxImageCompressService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }]; } });

/*
 * Public API Surface of ngx-image-compress
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DOC_ORIENTATION, NgxImageCompressService };
//# sourceMappingURL=ngx-image-compress.mjs.map
