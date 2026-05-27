import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ApiService } from '../../../core/services/api.service';
@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  constructor(public studentService: StudentService, private apiService: ApiService) { }

  ngOnInit(): void {
    !this.studentService.isLoaded() && this.getData();
  }

  getData(): void {
    this.studentService.getData()?.subscribe({
      next: (data: any) => {
        this.studentService.setStudents(data);
      },
      error: (err: any) => {
        console.warn('API fetch failed:', err);
      }
    });
  }

  deleteClicked(id: string): void {
    this.studentService.deleteStudent(id)?.subscribe({
      next: (res: any) => {
        this.studentService.removeStudentFromState(id)
      },
      error: (err) => {
        console.warn('Delete failed:', err);
      }
    });
  }
}
