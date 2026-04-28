import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Loader } from './components/loader/loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from './components/form-input/form-input';
import { FormField } from './components/form-field/form-field';

@NgModule({
  declarations: [Header, Sidebar, Loader, FormInput, FormField],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [Header, Sidebar, Loader, FormInput, FormField],
})
export class SharedModule { }
