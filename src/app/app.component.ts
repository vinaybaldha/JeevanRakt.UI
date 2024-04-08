import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, AddingdonorComponent],
})
export class AppComponent {
  title = 'JeevanRakt.UI';
}
