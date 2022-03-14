import { Injectable } from '@angular/core';
import { ImageCompress } from './image-compress';
import { DOC_ORIENTATION } from './models/DOC_ORIENTATION';
import * as i0 from "@angular/core";
export class NgxImageCompressService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWltYWdlLWNvbXByZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW1hZ2UtY29tcHJlc3Mvc3JjL2xpYi9uZ3gtaW1hZ2UtY29tcHJlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUE4QixNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDOztBQU96RCxNQUFNLE9BQU8sdUJBQXVCO0lBTWxDLFlBQVksZUFBaUM7UUFGdEMsb0JBQWUsR0FBRyxlQUFlLENBQUM7UUFHdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksU0FBUyxDQUFDLEtBQWM7UUFDN0IsT0FBTyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLGNBQWMsQ0FBQyxJQUFVO1FBQzlCLE9BQU8sYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVO1FBQ2YsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUE0QixDQUFDO0lBQ2pGLENBQUM7SUFFRDs7T0FFRztJQUNJLG1CQUFtQjtRQUN4QixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQThCLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNJLFlBQVksQ0FDakIsS0FBYyxFQUNkLFdBQTRCLEVBQzVCLFFBQWdCLEVBQUUsRUFDbEIsVUFBa0IsRUFBRSxFQUNwQixXQUFtQixDQUFDLEVBQ3BCLFlBQW9CLENBQUM7UUFFckIsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSw0QkFBNEIsQ0FBQyxZQUFvQixDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUs7UUFDMUUsT0FBTyxhQUFhLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7O29IQXZFVSx1QkFBdUI7d0hBQXZCLHVCQUF1QixjQUZ0QixNQUFNOzJGQUVQLHVCQUF1QjtrQkFIbkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7SW1hZ2VDb21wcmVzc30gZnJvbSAnLi9pbWFnZS1jb21wcmVzcyc7XHJcbmltcG9ydCB7RE9DX09SSUVOVEFUSU9OfSBmcm9tICcuL21vZGVscy9ET0NfT1JJRU5UQVRJT04nO1xyXG5pbXBvcnQge1VwbG9hZFJlc3BvbnNlfSBmcm9tICcuL21vZGVscy91cGxvYWQtcmVzcG9uc2UnO1xyXG5pbXBvcnQge0RhdGFVcmx9IGZyb20gJy4vbW9kZWxzL2RhdGEtdXJsJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEltYWdlQ29tcHJlc3NTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXI6IFJlbmRlcmVyMjtcclxuXHJcbiAgcHVibGljIERPQ19PUklFTlRBVElPTiA9IERPQ19PUklFTlRBVElPTjtcclxuXHJcbiAgY29uc3RydWN0b3IocmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7XHJcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGhlbHBlciB0byBldmFsdWF0ZSB0aGUgY29tcHJlc3Npb24gcmF0ZVxyXG4gICAqIEBwYXJhbSBpbWdTdHJpbmcgdGhlIGltYWdlIGluIGJhc2U2NCBzdHJpbmcgZm9ybWF0XHJcbiAgICovXHJcbiAgcHVibGljIGJ5dGVDb3VudChpbWFnZTogRGF0YVVybCkge1xyXG4gICAgcmV0dXJuIEltYWdlQ29tcHJlc3MuYnl0ZUNvdW50KGltYWdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY29ycmVjdCBPcmllbnRhdGlvbiB2YWx1ZSBmcm9tIGltYWdlIHRhZ3NcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0T3JpZW50YXRpb24oZmlsZTogRmlsZSk6IFByb21pc2U8RE9DX09SSUVOVEFUSU9OPiB7XHJcbiAgICByZXR1cm4gSW1hZ2VDb21wcmVzcy5nZXRPcmllbnRhdGlvbihmaWxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiBhIHByb21pc2Ugd2l0aCB0aGUgbmV3IGltYWdlIGRhdGEgYW5kIGltYWdlIG9yaWVudGF0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIHVwbG9hZEZpbGUoKTogUHJvbWlzZTxVcGxvYWRSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIEltYWdlQ29tcHJlc3MudXBsb2FkRmlsZSh0aGlzLnJlbmRlciwgZmFsc2UpIGFzIFByb21pc2U8VXBsb2FkUmVzcG9uc2U+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJuIGEgcHJvbWlzZSB3aXRoIGFuIGFycmF5IG9mIGltYWdlIGRhdGEgYW5kIGltYWdlIG9yaWVudGF0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIHVwbG9hZE11bHRpcGxlRmlsZXMoKTogUHJvbWlzZTxVcGxvYWRSZXNwb25zZVtdPiB7XHJcbiAgICByZXR1cm4gSW1hZ2VDb21wcmVzcy51cGxvYWRGaWxlKHRoaXMucmVuZGVyLCB0cnVlKSBhcyBQcm9taXNlPFVwbG9hZFJlc3BvbnNlW10+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcGVyZm9ybSBhIGNvbXByZXNzaW9uIGZyb20gdGhlIGdpdmVuIERhdGFVcmwgKHN0cmluZyksIHByb3ZpZGVkIGJ5IHRoZSB1cGxvYWRGaWxlLCBvciB1cGxvYWRNdWx0aXBsZUZpbGVzIG1ldGhvZFxyXG4gICAqXHJcbiAgICpcclxuICAgfCBQYXJhbWV0ZXIgICB8IFR5cGUgICB8IERlc2NyaXB0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAgIHwgLS0tLS0tLS0tLS0gfCAtLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gfFxyXG4gICB8IGltYWdlICAgICAgIHwgc3RyaW5nIHwgRGF0YVVybCAoc3RyaW5nKSByZXByZXNlbnRpbmcgdGhlIGltYWdlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICAgfCBvcmllbnRhdGlvbiB8IG51bWJlciB8IEVYSUYgT3JpZW50YXRpb24gdmFsdWUgdXNpbmcgdGhlIERPQ19PUklFTlRBVElPTiBlbnVtIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAgIHwgcmF0aW8gICAgICAgfCBudW1iZXIgfCBNYXhpbXVtIHNjYWxlIGZhY3RvciBhcyBhIHBlcmNlbnRhZ2UgKG9wdGlvbmFsLCBkZWZhdWx0OiA1MCkgPHN1cD5bMV0oI2ZuMSk8L3N1cD4gfFxyXG4gICB8IHF1YWxpdHkgICAgIHwgbnVtYmVyIHwgSlBFRyBxdWFsaXR5IGZhY3RvciBhcyBhIHBlcmNlbnRhZ2UgKG9wdGlvbmFsLCBkZWZhdWx0OiA1MCkgPHN1cD5bMl0oI2ZuMik8L3N1cD4gIHxcclxuICAgfCBtYXh3aWR0aCAgICB8IG51bWJlciB8IE1heGltdW0gd2lkdGggaW4gcGl4ZWxzIGlmIHlvdSBuZWVkIHRvIHJlc2l6ZSAob3B0aW9uYWwsIGRlZmF1bHQ6IDAgLSBubyByZXNpemUpICB8XHJcbiAgIHwgbWF4aGVpZ2h0ICAgfCBudW1iZXIgfCBNYXhpbXVtIGhlaWdodCBpbiBwaXhlbHMgaWYgeW91IG5lZWQgdG8gcmVzaXplIChvcHRpb25hbCwgZGVmYXVsdDogMCAtIG5vIHJlc2l6ZSkgfFxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb21wcmVzc0ZpbGUoXHJcbiAgICBpbWFnZTogRGF0YVVybCxcclxuICAgIG9yaWVudGF0aW9uOiBET0NfT1JJRU5UQVRJT04sXHJcbiAgICByYXRpbzogbnVtYmVyID0gNTAsXHJcbiAgICBxdWFsaXR5OiBudW1iZXIgPSA1MCxcclxuICAgIG1heFdpZHRoOiBudW1iZXIgPSAwLFxyXG4gICAgbWF4SGVpZ2h0OiBudW1iZXIgPSAwXHJcbiAgKTogUHJvbWlzZTxEYXRhVXJsPiB7XHJcbiAgICByZXR1cm4gSW1hZ2VDb21wcmVzcy5jb21wcmVzcyhpbWFnZSwgb3JpZW50YXRpb24sIHRoaXMucmVuZGVyLCByYXRpbywgcXVhbGl0eSwgbWF4V2lkdGgsIG1heEhlaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3N0IHNpbXBsZSBmdW5jdGlvbiB0byB1c2UgaGVyZS5cclxuICAgKiBQZXJmb3JtIGFuIHVwbG9hZCBhbmQgcmV0dXJuIGFuIGltYWdlIGRhdGFVcmwgKHN0cmluZyBmb3JtYXQpIHdpdGggYSBtYXhpbXVtIHNpemUsIGdpdmVuIGluICpNZWdhQnl0ZXMqXHJcbiAgICogSWYgdGhlIHNpemUgY2FuJ3QgYmUgcmVhY2hlZCwgdGhlIGJlc3QgdGhhdCBjYW4gYmUgcmVhY2hlZCB3aWxsIGJlIHJldHVybmVkIGluIHByb21pc2UgKnJlamVjdGlvbipcclxuICAgKiBQdXQgZGVidWdNb2RlIHRvIHRydWUgaWYgeW91IGhhdmUgc29tZSB0cm91YmxlIHRvIHByaW50IHNvbWUgaGVscCB1c2luZyBjb25zb2xlLmRlYnVnXHJcbiAgICovXHJcbiAgcHVibGljIHVwbG9hZEFuZEdldEltYWdlV2l0aE1heFNpemUobWF4U2l6ZU1iOiBudW1iZXIgPSAxLCBkZWJ1Z01vZGUgPSBmYWxzZSk6IFByb21pc2U8RGF0YVVybD4ge1xyXG4gICAgcmV0dXJuIEltYWdlQ29tcHJlc3MuZ2V0SW1hZ2VNYXhTaXplKG1heFNpemVNYiwgZGVidWdNb2RlLCB0aGlzLnJlbmRlcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==