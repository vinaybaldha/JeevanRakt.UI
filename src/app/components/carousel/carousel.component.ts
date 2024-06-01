import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SlickCarouselModule } from 'ngx-slick-carousel';

interface Slide {
  image: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  slides: Slide[] = [
    { image: 'assets/img/slide1.jpg', alt: 'Slide 1', caption: 'Slide 1 Caption' },
    { image: 'assets/img/slide2.jpg', alt: 'Slide 2', caption: 'Slide 2 Caption' },
    { image: 'assets/img/slide3.jpg', alt: 'Slide 3', caption: 'Slide 3 Caption' }
  ];

  currentIndex: number = 0;

  get currentTransform(): number {
    return -this.currentIndex * 100;
  }

  constructor() {}

  ngOnInit(): void {}

  next(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.slides.length - 1;
    }
  }
}
