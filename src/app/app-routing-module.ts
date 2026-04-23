import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('../app/modules/auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'student',
    component: MainLayout,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['student', 'teacher'] },
    loadChildren: () => import('../app/modules/student/student-module').then(m => m.StudentModule),

  },
  {
    path: 'teacher',
    component: MainLayout,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['teacher'] },
    loadChildren: () => import('../app/modules/teacher/teacher-module').then(m => m.TeacherModule),

  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }