import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  {
    path: '/table-list',
    title: 'Table List',
    icon: 'content_paste',
    class: '',
  },
  {
    path: '/typography',
    title: 'Typography',
    icon: 'library_books',
    class: '',
  },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  {
    path: '/notifications',
    title: 'Notifications',
    icon: 'notifications',
    class: '',
  },
  {
    path: '/upgrade',
    title: 'Upgrade to PRO',
    icon: 'unarchive',
    class: 'active-pro',
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
