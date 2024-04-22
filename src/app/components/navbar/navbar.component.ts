import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router, Event, NavigationEnd } from '@angular/router';

interface RouteInfo {
  path: string;
  title: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private listTitles: RouteInfo[] = [];
  location: Location;
  mobile_menu_visible: number = 0;
  private toggleButton!: HTMLElement | null;
  private sidebarVisible: boolean = false;

  constructor(
    location: Location,
    private element: ElementRef<HTMLElement>,
    private router: Router
  ) {
    this.location = location;
  }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.querySelector('.navbar-toggler');

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.sidebarClose();
      }
    });
  }

  sidebarOpen(): void {
    if (this.toggleButton) {
      this.toggleButton.classList.add('toggled');
    }
    document.body.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose(): void {
    if (this.toggleButton) {
      this.toggleButton.classList.remove('toggled');
    }
    document.body.classList.remove('nav-open');
    this.sidebarVisible = false;
  }

  sidebarToggle(): void {
    const $toggle = document.querySelector('.navbar-toggler') as HTMLElement;
    const body = document.body;

    if (this.sidebarVisible) {
      this.sidebarClose();
    } else {
      this.sidebarOpen();
    }

    if (this.mobile_menu_visible === 1) {
      body.classList.remove('nav-open');
      const $layer = document.querySelector(
        '.close-layer'
      ) as HTMLElement | null;
      if ($layer) {
        $layer.remove();
      }
      setTimeout(() => {
        $toggle.classList.remove('toggled');
      }, 400);
      this.mobile_menu_visible = 0;
    } else {
      setTimeout(() => {
        $toggle.classList.add('toggled');
      }, 430);

      const $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      const mainPanel = document.querySelector('.main-panel');
      const wrapperFullPage = document.querySelector('.wrapper-full-page');

      if (mainPanel) {
        mainPanel.appendChild($layer);
      } else if (
        body.classList.contains('off-canvas-sidebar') &&
        wrapperFullPage
      ) {
        wrapperFullPage.appendChild($layer);
      }

      setTimeout(() => {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = () => {
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        if ($layer) {
          $layer.classList.remove('visible');
          setTimeout(() => {
            $layer.remove();
            $toggle.classList.remove('toggled');
          }, 400);
        }
      };

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  getTitle(): string {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      return (
        this.listTitles.find((item) => item.path === titlee.slice(1))?.title ||
        'Dashboard'
      );
    } else {
      return 'Dashboard';
    }
  }
}
