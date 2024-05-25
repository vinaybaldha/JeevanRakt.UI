import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../_module/Material.Module';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [MaterialModule, FlexLayoutModule],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.css',
})
export class FeatureCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
}
