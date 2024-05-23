import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fail',
  standalone: true,
  imports: [],
  templateUrl: './fail.component.html',
  styleUrl: './fail.component.css',
})
export class FailComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/blood-requests']);
    }, 5000);
  }
}
