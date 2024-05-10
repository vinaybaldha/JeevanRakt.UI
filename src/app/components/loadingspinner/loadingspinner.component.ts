import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getSpinnerState } from '../../_store/Globel/globel.selector';

@Component({
  selector: 'app-loadingspinner',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './loadingspinner.component.html',
  styleUrl: './loadingspinner.component.css',
})
export class LoadingspinnerComponent implements OnInit {
  isLoaded: boolean = false;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getSpinnerState).subscribe((res) => {
      this.isLoaded = res;
    });
  }
}
