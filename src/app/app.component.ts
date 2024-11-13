import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HeaderComponent } from "./header/header.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProjectsComponent } from "./projects/projects.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { LoadingAnimationComponent } from "./loading-animation/loading-animation.component";
import { CommonModule } from '@angular/common';
import { SparkleComponent } from "./sparkle/sparkle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProfileComponent, ProjectsComponent, PortfolioComponent, ContactComponent, FooterComponent, LoadingAnimationComponent, SparkleComponent],
  templateUrl: './app.component.html',
  providers: [],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'portfolio-angular';
  isLoading = true;

  scrollInterval: any; 
  autoScrollSpeed = 1; 

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('deviceorientation', this.handleOrientation.bind(this));
    }
    this.stopAutoScroll();
  }

  handleOrientation(event: DeviceOrientationEvent) {
    const tiltForward = event.beta; 

    if (tiltForward !== null) {
      if (tiltForward > 20 && tiltForward < 90) {
        this.startAutoScroll(1); 
      } else if (tiltForward < -20 && tiltForward > -90) {
        this.startAutoScroll(-1); 
      } else {
        this.stopAutoScroll();
      }
    }
  }

  startAutoScroll(direction: number) {
    if (this.scrollInterval && this.autoScrollSpeed * direction > 0) {
      return;
    }

    this.stopAutoScroll();

    this.scrollInterval = setInterval(() => {
      window.scrollBy(0, direction * this.autoScrollSpeed);
    }, 20); 
  }

  stopAutoScroll() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }
}
