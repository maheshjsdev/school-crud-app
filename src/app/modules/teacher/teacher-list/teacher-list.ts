import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ApiService } from '../../../core/services/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-teacher-list',
  standalone: false,
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.css',
})
export class TeacherList implements OnInit {
  teachers: any[] = [];
  loading: boolean = false;
  deletingId: string | null = null;

  constructor(private teacherService: TeacherService, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { this.getData(); }

  getData(): void {
    this.loading = true;

    this.apiService.get<any[]>('teacher/objects')
      .pipe(finalize(() => (this.loading = false, this.cdr.detectChanges())))
      .subscribe({
        next: (data) => {
          this.teachers = data;
        },
        error: (err) => {
          console.warn('API fetch failed, loading from local:', err);
        }
      });
  }


  deleteClicked(id: string): void {
    this.deletingId = id;
    this.apiService.delete<any>(`teacher/objects/${id}`)
      .pipe(finalize(() => (this.deletingId = null)))
      .subscribe({
        next: (res: any) => {
          console.log('Delete response:', res);
          this.getData();
        },
        error: (err) => {
          console.warn('Delete failed:', err);
        }
      });
  }
}