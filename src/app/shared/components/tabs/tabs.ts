import { Component, Input } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-tabs',
  standalone: false,
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {
  position: NzTabPosition = 'top';

  constructor(public apiService: ApiService) {
    this.position = this.apiService.tabPosition() as NzTabPosition;
    console.log(this.position);
  }
  @Input() tabs: {
    title: string;
    component: any;
  }[] = [];
}
