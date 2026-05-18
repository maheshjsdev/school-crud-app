import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SharedService } from '../../shared.service';
import { Settings } from '../settings/settings';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() isCollapsed = false;
  @Output() isCollapsedChange = new EventEmitter<boolean>();
  constructor(public auth: AuthService, public sharedService: SharedService) { }

  get role(): string | null {
    return localStorage.getItem('role');
  }

  get name(): string | null {
    return localStorage.getItem('name');
  }
  toggleSidebar(): void {

    this.isCollapsed = !this.isCollapsed;

    this.isCollapsedChange.emit(this.isCollapsed);

    localStorage.setItem(
      'sidebarCollapsed',
      JSON.stringify(this.isCollapsed)
    );
  }
  openSettings(): void {
    this.sharedService.open(
      'Settings',
      Settings,
      'right'
    );
    console.log('Settings opened');
  }
}