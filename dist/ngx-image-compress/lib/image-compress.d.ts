import { Renderer2 } from '@angular/core';
import { DataUrl } from './models/data-url';
import { DOC_ORIENTATION } from './models/DOC_ORIENTATION';
import { UploadResponse } from './models/upload-response';
export declare class ImageCompress {
    static getOrientation: (file: File) => Promise<DOC_ORIENTATION>;
    static uploadFile: (render: Renderer2, multiple?: boolean) => Promise<UploadResponse | UploadResponse[]>;
    static fileToDataURL: (file: File) => Promise<string>;
    static generateUploadInputRenderer: (render: Renderer2, multiple?: boolean) => Promise<FileList | null>;
    static generateUploadInputNative: (documentNativeApi: any, multiple?: boolean) => Promise<FileList | null>;
    static compress: (imageDataUrlSource: DataUrl, orientation: DOC_ORIENTATION, render: Renderer2, ratio?: number, quality?: number, maxwidth?: number, maxheight?: number) => Promise<string>;
    static byteCount: (imgString: DataUrl) => number;
    static getImageMaxSize: (maxSizeMb: number, debugMode: boolean, render: Renderer2) => Promise<DataUrl>;
}
