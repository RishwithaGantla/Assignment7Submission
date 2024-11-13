import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('sidemenu') sidemenu!: ElementRef;

  openmenu() {
    this.sidemenu.nativeElement.style.right = "0";
  }

  closemenu() {
    this.sidemenu.nativeElement.style.right = "-200px";
  }
  constructor(private viewportScroller: ViewportScroller) {}

  scrollToSection(section: string) {
    this.viewportScroller.scrollToAnchor(section);
}
}
