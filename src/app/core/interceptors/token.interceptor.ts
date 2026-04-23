import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../../environments/environment';

const API_KEY = environment.apiKey;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken();

    const headers: Record<string, string> = {
      'x-api-key': API_KEY,           // ✅ har request me
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;  // ✅ logged in ho to
    }

    req = req.clone({ setHeaders: headers });

    return next.handle(req);
  }
} 