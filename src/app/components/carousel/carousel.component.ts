import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

type Slide = {
  src: string;
};

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  @Input() slides: Slide[] = [];

  currentSlide = 0;

  constructor() {}
  ngOnInit(): void {
    this.preloadImages();
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log('next clicked, new current slide is: ', this.currentSlide);
  }
}
