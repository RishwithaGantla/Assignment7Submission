// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class HammerService {
//   private hammer: any;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     if (isPlatformBrowser(this.platformId)) {
//       // Import Hammer.js only in the browser
//       this.hammer = require('hammerjs');
//     }
//   }

//   getHammer() {
//     return this.hammer;
//   }
// }