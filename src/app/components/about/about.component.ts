import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.Module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
 

  ngOnInit(): void {
  }

  
}
