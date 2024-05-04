import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations/src/carousel/carousel.module';

import { SlickCarouselModule } from 'ngx-slick-carousel';

type Slide = {
  img: string;
};

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  slides: Slide[] = [
    { img: 'assets/img/bd1.jpg' },
    { img: 'assets/img/bd2.jpg' },
    { img: 'assets/img/bd3.jpg' },
  ];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
