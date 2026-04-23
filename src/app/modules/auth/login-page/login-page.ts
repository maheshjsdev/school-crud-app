import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  dummyUsers: any[] = [
    { email: 'student@school.com', password: 'student123', role: 'student', name: 'Student' },
    { email: 'teacher@school.com', password: 'teacher123', role: 'teacher', name: 'Teacher' },
  ];

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  isInvalid(field: string): boolean {
    const c = this.loginForm.get(field)!;
    return c.invalid && (c.dirty || c.touched);
  }

  fillDummy(user: any): void {
    this.loginForm.patchValue({ email: user.email, password: user.password });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login(this.loginForm.value).subscribe({
      next: () => this.auth.redirectByRole(),
      error: () => {
        this.error = 'Invalid email or password. Please try again.';
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }
}