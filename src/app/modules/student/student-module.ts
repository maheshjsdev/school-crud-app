import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentList } from './student-list/student-list';
import { StudentForm } from './student-form/student-form';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from './student.service';
const routes: Routes = [
  { path: '', component: StudentList },
  { path: 'add', component: StudentForm },
  { path: 'edit/:id', component: StudentForm },
];

@NgModule({
  declarations: [StudentList, StudentForm],
  imports: [CommonModule,FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), SharedModule],
  providers: [StudentService],
})
export class StudentModule { }
