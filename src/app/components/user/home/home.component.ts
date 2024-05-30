import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../carousel/carousel.component';
import { MaterialModule } from '../../../_module/Material.Module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '../../feature-card/feature-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from '../../footer/footer.component';

type Slide = {
  src: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    CarouselComponent,
    MaterialModule,
    DashboardComponent,
    CommonModule,
    FeatureCardComponent,
    FlexLayoutModule,
    FooterComponent,
    FooterComponent,
  ],
})
export class HomeComponent implements OnInit {
  ngOnInit() {}

  roles = [
    {
      name: 'Donor',
      description: `As a donor, you can register, schedule blood donation appointments, and keep track of your donation history. Your contribution is invaluable in saving lives.`,
      image: 'assets/donor.png',
      imageFirst: true,
    },
    {
      name: 'Recipient',
      description: `Recipients can request specific blood types and track the status of their requests. Our system ensures a streamlined process to meet urgent blood needs.`,
      image: 'assets/recipient.png',
      imageFirst: false,
    },
    {
      name: 'Administrator',
      description: `Administrators oversee the entire blood bank operations, manage inventory, schedule donations, and generate reports. They ensure that the blood supply meets the demand.`,
      image: 'assets/administrator.png',
      imageFirst: true,
    },
  ];

  featureArray = [
    {
      title: 'Schedule Donation',
      description:
        'Easily schedule and manage your blood donation appointments.',
      icon: 'schedule',
    },
    {
      title: 'Track Inventory',
      description:
        'Keep track of available blood types and quantities in the inventory.',
      icon: 'inventory',
    },
    {
      title: 'Manage Requests',
      description:
        'Handle blood requests from recipients efficiently and filter by blood group.',
      icon: 'request_page',
    },
    {
      title: 'Generate Reports',
      description:
        'Generate detailed reports on donations, inventory, and requests.',
      icon: 'assessment',
    },
    {
      title: 'Manage donor database',
      description:
        'You can manage donor and recipient database and add or delete requests.',
      icon: 'storage',
    },
    {
      title: 'Provide quick access to blood',
      description:
        'You are able to provide quick access to blood with the help of blood requests.',
      icon: 'accessibility',
    },
  ];

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
