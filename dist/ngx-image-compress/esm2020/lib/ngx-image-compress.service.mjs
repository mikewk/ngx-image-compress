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
    compressFile(image, orientation, ratio = 50, quality = 50, maxWidth = 0, maxHeight = 0, mime = "") {
        return ImageCompress.compress(image, orientation, this.render, ratio, quality, maxWidth, maxHeight, mime);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWltYWdlLWNvbXByZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW1hZ2UtY29tcHJlc3Mvc3JjL2xpYi9uZ3gtaW1hZ2UtY29tcHJlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUE4QixNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDOztBQU96RCxNQUFNLE9BQU8sdUJBQXVCO0lBTWxDLFlBQVksZUFBaUM7UUFGdEMsb0JBQWUsR0FBRyxlQUFlLENBQUM7UUFHdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksU0FBUyxDQUFDLEtBQWM7UUFDN0IsT0FBTyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLGNBQWMsQ0FBQyxJQUFVO1FBQzlCLE9BQU8sYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVO1FBQ2YsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUE0QixDQUFDO0lBQ2pGLENBQUM7SUFFRDs7T0FFRztJQUNJLG1CQUFtQjtRQUN4QixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQThCLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNJLFlBQVksQ0FDakIsS0FBYyxFQUNkLFdBQTRCLEVBQzVCLFFBQWdCLEVBQUUsRUFDbEIsVUFBa0IsRUFBRSxFQUNwQixXQUFtQixDQUFDLEVBQ3BCLFlBQW9CLENBQUMsRUFDckIsT0FBZSxFQUFFO1FBRWpCLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDRCQUE0QixDQUFDLFlBQW9CLENBQUMsRUFBRSxTQUFTLEdBQUcsS0FBSztRQUMxRSxPQUFPLGFBQWEsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7b0hBeEVVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtJbWFnZUNvbXByZXNzfSBmcm9tICcuL2ltYWdlLWNvbXByZXNzJztcclxuaW1wb3J0IHtET0NfT1JJRU5UQVRJT059IGZyb20gJy4vbW9kZWxzL0RPQ19PUklFTlRBVElPTic7XHJcbmltcG9ydCB7VXBsb2FkUmVzcG9uc2V9IGZyb20gJy4vbW9kZWxzL3VwbG9hZC1yZXNwb25zZSc7XHJcbmltcG9ydCB7RGF0YVVybH0gZnJvbSAnLi9tb2RlbHMvZGF0YS11cmwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SW1hZ2VDb21wcmVzc1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcjogUmVuZGVyZXIyO1xyXG5cclxuICBwdWJsaWMgRE9DX09SSUVOVEFUSU9OID0gRE9DX09SSUVOVEFUSU9OO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcclxuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaGVscGVyIHRvIGV2YWx1YXRlIHRoZSBjb21wcmVzc2lvbiByYXRlXHJcbiAgICogQHBhcmFtIGltZ1N0cmluZyB0aGUgaW1hZ2UgaW4gYmFzZTY0IHN0cmluZyBmb3JtYXRcclxuICAgKi9cclxuICBwdWJsaWMgYnl0ZUNvdW50KGltYWdlOiBEYXRhVXJsKSB7XHJcbiAgICByZXR1cm4gSW1hZ2VDb21wcmVzcy5ieXRlQ291bnQoaW1hZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjb3JyZWN0IE9yaWVudGF0aW9uIHZhbHVlIGZyb20gaW1hZ2UgdGFnc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRPcmllbnRhdGlvbihmaWxlOiBGaWxlKTogUHJvbWlzZTxET0NfT1JJRU5UQVRJT04+IHtcclxuICAgIHJldHVybiBJbWFnZUNvbXByZXNzLmdldE9yaWVudGF0aW9uKGZpbGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJuIGEgcHJvbWlzZSB3aXRoIHRoZSBuZXcgaW1hZ2UgZGF0YSBhbmQgaW1hZ2Ugb3JpZW50YXRpb25cclxuICAgKi9cclxuICBwdWJsaWMgdXBsb2FkRmlsZSgpOiBQcm9taXNlPFVwbG9hZFJlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gSW1hZ2VDb21wcmVzcy51cGxvYWRGaWxlKHRoaXMucmVuZGVyLCBmYWxzZSkgYXMgUHJvbWlzZTxVcGxvYWRSZXNwb25zZT47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm4gYSBwcm9taXNlIHdpdGggYW4gYXJyYXkgb2YgaW1hZ2UgZGF0YSBhbmQgaW1hZ2Ugb3JpZW50YXRpb25cclxuICAgKi9cclxuICBwdWJsaWMgdXBsb2FkTXVsdGlwbGVGaWxlcygpOiBQcm9taXNlPFVwbG9hZFJlc3BvbnNlW10+IHtcclxuICAgIHJldHVybiBJbWFnZUNvbXByZXNzLnVwbG9hZEZpbGUodGhpcy5yZW5kZXIsIHRydWUpIGFzIFByb21pc2U8VXBsb2FkUmVzcG9uc2VbXT47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBwZXJmb3JtIGEgY29tcHJlc3Npb24gZnJvbSB0aGUgZ2l2ZW4gRGF0YVVybCAoc3RyaW5nKSwgcHJvdmlkZWQgYnkgdGhlIHVwbG9hZEZpbGUsIG9yIHVwbG9hZE11bHRpcGxlRmlsZXMgbWV0aG9kXHJcbiAgICpcclxuICAgKlxyXG4gICB8IFBhcmFtZXRlciAgIHwgVHlwZSAgIHwgRGVzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICAgfCAtLS0tLS0tLS0tLSB8IC0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8XHJcbiAgIHwgaW1hZ2UgICAgICAgfCBzdHJpbmcgfCBEYXRhVXJsIChzdHJpbmcpIHJlcHJlc2VudGluZyB0aGUgaW1hZ2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gICB8IG9yaWVudGF0aW9uIHwgbnVtYmVyIHwgRVhJRiBPcmllbnRhdGlvbiB2YWx1ZSB1c2luZyB0aGUgRE9DX09SSUVOVEFUSU9OIGVudW0gdmFsdWUgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICAgfCByYXRpbyAgICAgICB8IG51bWJlciB8IE1heGltdW0gc2NhbGUgZmFjdG9yIGFzIGEgcGVyY2VudGFnZSAob3B0aW9uYWwsIGRlZmF1bHQ6IDUwKSA8c3VwPlsxXSgjZm4xKTwvc3VwPiB8XHJcbiAgIHwgcXVhbGl0eSAgICAgfCBudW1iZXIgfCBKUEVHIHF1YWxpdHkgZmFjdG9yIGFzIGEgcGVyY2VudGFnZSAob3B0aW9uYWwsIGRlZmF1bHQ6IDUwKSA8c3VwPlsyXSgjZm4yKTwvc3VwPiAgfFxyXG4gICB8IG1heHdpZHRoICAgIHwgbnVtYmVyIHwgTWF4aW11bSB3aWR0aCBpbiBwaXhlbHMgaWYgeW91IG5lZWQgdG8gcmVzaXplIChvcHRpb25hbCwgZGVmYXVsdDogMCAtIG5vIHJlc2l6ZSkgIHxcclxuICAgfCBtYXhoZWlnaHQgICB8IG51bWJlciB8IE1heGltdW0gaGVpZ2h0IGluIHBpeGVscyBpZiB5b3UgbmVlZCB0byByZXNpemUgKG9wdGlvbmFsLCBkZWZhdWx0OiAwIC0gbm8gcmVzaXplKSB8XHJcbiAgICovXHJcbiAgcHVibGljIGNvbXByZXNzRmlsZShcclxuICAgIGltYWdlOiBEYXRhVXJsLFxyXG4gICAgb3JpZW50YXRpb246IERPQ19PUklFTlRBVElPTixcclxuICAgIHJhdGlvOiBudW1iZXIgPSA1MCxcclxuICAgIHF1YWxpdHk6IG51bWJlciA9IDUwLFxyXG4gICAgbWF4V2lkdGg6IG51bWJlciA9IDAsXHJcbiAgICBtYXhIZWlnaHQ6IG51bWJlciA9IDAsXHJcbiAgICBtaW1lOiBzdHJpbmcgPSBcIlwiXHJcbiAgKTogUHJvbWlzZTxEYXRhVXJsPiB7XHJcbiAgICByZXR1cm4gSW1hZ2VDb21wcmVzcy5jb21wcmVzcyhpbWFnZSwgb3JpZW50YXRpb24sIHRoaXMucmVuZGVyLCByYXRpbywgcXVhbGl0eSwgbWF4V2lkdGgsIG1heEhlaWdodCwgbWltZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3N0IHNpbXBsZSBmdW5jdGlvbiB0byB1c2UgaGVyZS5cclxuICAgKiBQZXJmb3JtIGFuIHVwbG9hZCBhbmQgcmV0dXJuIGFuIGltYWdlIGRhdGFVcmwgKHN0cmluZyBmb3JtYXQpIHdpdGggYSBtYXhpbXVtIHNpemUsIGdpdmVuIGluICpNZWdhQnl0ZXMqXHJcbiAgICogSWYgdGhlIHNpemUgY2FuJ3QgYmUgcmVhY2hlZCwgdGhlIGJlc3QgdGhhdCBjYW4gYmUgcmVhY2hlZCB3aWxsIGJlIHJldHVybmVkIGluIHByb21pc2UgKnJlamVjdGlvbipcclxuICAgKiBQdXQgZGVidWdNb2RlIHRvIHRydWUgaWYgeW91IGhhdmUgc29tZSB0cm91YmxlIHRvIHByaW50IHNvbWUgaGVscCB1c2luZyBjb25zb2xlLmRlYnVnXHJcbiAgICovXHJcbiAgcHVibGljIHVwbG9hZEFuZEdldEltYWdlV2l0aE1heFNpemUobWF4U2l6ZU1iOiBudW1iZXIgPSAxLCBkZWJ1Z01vZGUgPSBmYWxzZSk6IFByb21pc2U8RGF0YVVybD4ge1xyXG4gICAgcmV0dXJuIEltYWdlQ29tcHJlc3MuZ2V0SW1hZ2VNYXhTaXplKG1heFNpemVNYiwgZGVidWdNb2RlLCB0aGlzLnJlbmRlcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==