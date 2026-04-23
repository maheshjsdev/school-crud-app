import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Loader } from './components/loader/loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Header, Sidebar, Loader],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [Header, Sidebar, Loader],
})
export class SharedModule { }