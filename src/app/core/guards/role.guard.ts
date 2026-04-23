import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles: string[] = route.data['roles'] || [];
    const role = localStorage.getItem('role');

    if (role && allowedRoles.includes(role)) return true;

    // redirect to their own home if unauthorized
    role === 'student'
      ? this.router.navigate(['/student'])
      : this.router.navigate(['/login']);

    return false;
  }
}