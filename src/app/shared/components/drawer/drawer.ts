import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-drawer',
  standalone: false,
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawer {
  constructor(public sharedService: SharedService) { }
}
