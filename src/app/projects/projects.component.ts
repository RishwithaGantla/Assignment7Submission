import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  longPressTimeout: any;
  showPopup = false;
  projectLink: string | null = null;
  shakePopup = false; 
  lastX = 0;
  lastY = 0;
  lastZ = 0;
  shakeThreshold = 15;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
      }
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', this.handleShake.bind(this));
      }
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('deviceorientation', this.handleOrientation.bind(this));
      window.removeEventListener('devicemotion', this.handleShake.bind(this));
    }
  }

 
  handleShake(event: DeviceMotionEvent) {
    const { acceleration } = event;
    
    if (acceleration) {
      const deltaX = Math.abs((this.lastX - (acceleration.x || 0)) || 0);
      const deltaY = Math.abs((this.lastY - (acceleration.y || 0)) || 0);
      const deltaZ = Math.abs((this.lastZ - (acceleration.z || 0)) || 0);
  
      if (deltaX > this.shakeThreshold || deltaY > this.shakeThreshold || deltaZ > this.shakeThreshold) {
        this.shakePopup = true; // Show shake popup
      }
  
      this.lastX = acceleration.x || 0;
      this.lastY = acceleration.y || 0;
      this.lastZ = acceleration.z || 0;
    }
  }

  handleOrientation(event: DeviceOrientationEvent) {
    const { beta, gamma } = event;
    const xShift = gamma ? gamma / 5 : 0;
    const yShift = beta ? beta / 5 : 0;

    this.renderer.setStyle(
      this.el.nativeElement.querySelector('.windward-container'),
      'transform',
      `translate(${xShift}px, ${yShift}px)`
    );
  }

  refreshPage() {
    window.location.reload();
  }

  closeShakePopup() {
    this.shakePopup = false;
  }

  startLongPress(link: string) {
    this.longPressTimeout = setTimeout(() => {
      this.projectLink = link;
      this.showPopup = true;
    }, 800);
  }

  cancelLongPress() {
    clearTimeout(this.longPressTimeout);
  }

  navigateToLink() {
    if (this.projectLink) {
      window.open(this.projectLink, '_blank');
    }
    this.closePopup();
  }

  closePopup() {
    this.showPopup = false;
    this.projectLink = null;
  }

  // createRipple(event: MouseEvent) {
  //   const container = event.currentTarget as HTMLElement;
  //   const ripple = document.createElement('span');
  //   ripple.classList.add('ripple');
  //   const size = Math.max(container.clientWidth, container.clientHeight);
  //   ripple.style.width = ripple.style.height = `${size}px`;
  //   ripple.style.left = `${event.clientX - container.offsetLeft - size / 2}px`;
  //   ripple.style.top = `${event.clientY - container.offsetTop - size / 2}px`;

  //   container.appendChild(ripple);
  //   setTimeout(() => {
  //     ripple.remove();
  //   }, 600);
  // }
}
