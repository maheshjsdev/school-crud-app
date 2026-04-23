import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: false,
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {
  addUpdateForm: FormGroup;
  isEdit = false;
  id!: string;

  grades = ['8th', '9th', '10th', '11th', '12th'];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService, private cdr: ChangeDetectorRef
  ) {
    this.addUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      grade: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.isEdit = true;
      this.patchData();
    }
  }

  // shorthand for template
  get f() { return this.addUpdateForm.controls; }

  isInvalid(field: string): boolean {
    const c = this.addUpdateForm.get(field)!;
    return c.invalid && (c.dirty || c.touched);
  }

  patchData(): void {

    this.apiService.get<any[]>(`student/objects/${this.id}`)
      .pipe(finalize(() => (this.cdr.detectChanges())))
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.addUpdateForm.patchValue(data?.data || {});
          } else {
            console.warn('API returned no data for this student.');
          }
        },
        error: () => {
        }
      });
  }
  addUpdateClicked(): void {
    if (this.addUpdateForm.invalid) {
      this.addUpdateForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = {
      name: 'student',
      data: this.addUpdateForm.value,
    }
    const url = this.isEdit ? `student/objects/${this.id}` : 'student/objects';
    const method = this.isEdit ? 'put' : 'post';
    this.apiService[method]<any[]>(url, formValue)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/student'])
        },
        error: () => {
          console.warn('form submission failed');
        }
      });
  }
}