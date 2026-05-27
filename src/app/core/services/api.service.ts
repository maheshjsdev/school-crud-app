import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  // settings data
  private STORAGE_KEY = 'tabPosition';

  tabPosition = signal<NzTabPosition>(
    (localStorage.getItem(this.STORAGE_KEY) as NzTabPosition) || 'left'
  );

  constructor(private http: HttpClient) {
    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        this.tabPosition()
      );
    });
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.base}/${path}`);
  }
  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.base}/${path}`, body);
  }
  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.base}/${path}`, body);
  }
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.base}/${path}`);
  }


}