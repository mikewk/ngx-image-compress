import { RendererFactory2 } from '@angular/core';
import { DOC_ORIENTATION } from './models/DOC_ORIENTATION';
import { UploadResponse } from './models/upload-response';
import { DataUrl } from './models/data-url';
import * as i0 from "@angular/core";
export declare class NgxImageCompressService {
    private readonly render;
    DOC_ORIENTATION: typeof DOC_ORIENTATION;
    constructor(rendererFactory: RendererFactory2);
    /**
     * helper to evaluate the compression rate
     * @param imgString the image in base64 string format
     */
    byteCount(image: DataUrl): number;
    /**
     * Get the correct Orientation value from image tags
     */
    getOrientation(file: File): Promise<DOC_ORIENTATION>;
    /**
     * return a promise with the new image data and image orientation
     */
    uploadFile(): Promise<UploadResponse>;
    /**
     * return a promise with an array of image data and image orientation
     */
    uploadMultipleFiles(): Promise<UploadResponse[]>;
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
    compressFile(image: DataUrl, orientation: DOC_ORIENTATION, ratio?: number, quality?: number, maxWidth?: number, maxHeight?: number, mime?: string): Promise<DataUrl>;
    /**
     * Most simple function to use here.
     * Perform an upload and return an image dataUrl (string format) with a maximum size, given in *MegaBytes*
     * If the size can't be reached, the best that can be reached will be returned in promise *rejection*
     * Put debugMode to true if you have some trouble to print some help using console.debug
     */
    uploadAndGetImageWithMaxSize(maxSizeMb?: number, debugMode?: boolean): Promise<DataUrl>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxImageCompressService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxImageCompressService>;
}
