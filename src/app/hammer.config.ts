// import { HammerGestureConfig } from '@angular/platform-browser';
// import { Injectable } from '@angular/core';
// import { HammerService } from './hammer.service';

// @Injectable()
// export class MyHammerConfig extends HammerGestureConfig {
//   constructor(private hammerService: HammerService) {
//     super();
//   }

//   override buildHammer(element: HTMLElement) {
//     const Hammer = this.hammerService.getHammer();
//     const hammer = new Hammer(element, this.options); // Ensure Hammer is a constructor
//     hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL }); // override default settings
//     return hammer;
//   }
// }