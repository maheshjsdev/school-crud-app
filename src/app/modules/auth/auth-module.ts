

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { ForgetPasswordPage } from './forget-password-page/forget-password-page';

const routes: Routes = [{ path: '', component: LoginPage }];

@NgModule({
  declarations: [LoginPage, ForgetPasswordPage],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class AuthModule { }