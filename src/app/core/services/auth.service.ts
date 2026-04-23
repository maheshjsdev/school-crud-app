import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface DummyUser {
  email: string;
  password: string;
  role: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private dummyUsers: DummyUser[] = [
    { email: 'student@school.com', password: 'student123', role: 'student', name: 'Student' },
    { email: 'teacher@school.com', password: 'teacher123', role: 'teacher', name: 'Teacher' },
  ];

  constructor(private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<DummyUser> {
    const matched = this.dummyUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!matched) return throwError(() => new Error('Invalid credentials'));

    return of(matched).pipe(
      tap((user) => {
        localStorage.setItem('token', 'mock-token-' + user.role);
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  redirectByRole(): void {
    const role = this.getRole();
    if (role === 'student') this.router.navigate(['/student']);
    else if (role === 'teacher') this.router.navigate(['/teacher']);
    else this.router.navigate(['/login']);
  }
}