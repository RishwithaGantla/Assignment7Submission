import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sparkle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sparkle.component.html',
  styleUrl: './sparkle.component.css'
})
export class SparkleComponent {
  sparkles: { x: number; y: number }[] = [];

createSparkle(event: TouchEvent) {
  console.log('Touch event detected');
  const touch = event.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  this.sparkles.push({ x, y });

  // Remove the sparkle after animation ends
  setTimeout(() => {
    this.sparkles.shift();
  }, 1000); // Adjust the timeout to match your animation duration
}
}
