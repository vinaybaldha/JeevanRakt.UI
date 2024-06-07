import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.Module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    
    setTimeout(() => {
      this.router.navigate(['/blood-requests']);
    }, 5000);
  }
}
