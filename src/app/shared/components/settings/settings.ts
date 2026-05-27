import { Component } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  constructor(public apiService: ApiService) { }
  position: NzTabPosition = 'top';
  options: { value: NzTabPosition; label: string }[] = [
    { value: 'top', label: 'top' },
    { value: 'left', label: 'left' },
    { value: 'right', label: 'right' },
    { value: 'bottom', label: 'bottom' }
  ];
  onTabPositionChange(value: NzTabPosition) {
    this.apiService.tabPosition.set(value);
  }
}
