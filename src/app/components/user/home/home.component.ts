import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../carousel/carousel.component';
import { MaterialModule } from '../../../_module/Material.Module';

type Slide = {
  src: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CarouselComponent, MaterialModule],
})
export class HomeComponent implements OnInit {
  ngOnInit() {}

  public slides: Slide[] = [
    { src: '/assets/img/bd1.jpg' },
    { src: '/assets/img/bd2.png' },
    { src: '/assets/img/bd3.jpg' },
    { src: '/assets/img/bd4.jpg' },
  ];

  donors = [
    { bloodType: 'O-', compatibleDonors: ['O-'] },
    { bloodType: 'O+', compatibleDonors: ['O-', 'O+'] },
    { bloodType: 'A-', compatibleDonors: ['A-', 'O-'] },
    { bloodType: 'A+', compatibleDonors: ['A-', 'O-', 'A+', 'O+'] },
    { bloodType: 'B-', compatibleDonors: ['B-', 'O-'] },
    { bloodType: 'B+', compatibleDonors: ['B-', 'O-', 'B+', 'O+'] },
    { bloodType: 'AB-', compatibleDonors: ['AB-', 'B-', 'A-', 'O-'] },
    {
      bloodType: 'AB+',
      compatibleDonors: ['AB-', 'B-', 'A-', 'O-', 'AB+', 'B+', 'A+', 'O+'],
    },
  ];

  constructor() {}
}
