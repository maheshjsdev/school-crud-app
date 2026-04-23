

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TeacherService } from './teacher.service';
import { TeacherList } from './teacher-list/teacher-list';
import { TeacherForm } from './teacher-form/teacher-form';
import { TeacherRoutingModule } from './teacher-routing-module';

@NgModule({
  declarations: [TeacherList, TeacherForm],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TeacherRoutingModule, SharedModule,],
  providers: [TeacherService],
})
export class TeacherModule { }