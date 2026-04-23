import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public auth: AuthService) { }

  get role(): string | null {
    return localStorage.getItem('role');
  }

  get name(): string | null {
    return localStorage.getItem('name');
  }
}