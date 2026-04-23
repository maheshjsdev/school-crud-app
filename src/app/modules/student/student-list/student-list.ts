import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ApiService } from '../../../core/services/api.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: any = [];
  loading = false;
  deletingId: string | null = null;

  constructor(private studentService: StudentService, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;

    this.apiService.get<any[]>('student/objects')
      .pipe(finalize(() => (this.loading = false, this.cdr.detectChanges())))   // ✅ har case me false
      .subscribe({
        next: (data: any) => {
          this.students = data;
        },
        error: (err: any) => {
          console.warn('API fetch failed, loading from local:', err);
        }
      });
  }


  deleteClicked(id: string): void {
    this.deletingId = id;
    this.apiService.delete<any[]>(`student/objects/${id}`)
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
