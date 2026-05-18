import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicConfigTabs } from './academic-config-tabs/academic-config-tabs';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { University } from './pages/university/university';
import { Group } from './pages/group/group';
import { InstituteCreation } from './pages/institute-creation/institute-creation';
import { RouterModule } from '@angular/router';

const Routes = [
  { path: '', component: AcademicConfigTabs }
]
@NgModule({
  declarations: [AcademicConfigTabs, University, Group, InstituteCreation],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(Routes)],
})
export class AcademicConfigurationModule { }
