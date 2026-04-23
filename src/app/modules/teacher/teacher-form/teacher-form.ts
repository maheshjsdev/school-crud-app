import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
@Component({
  selector: 'app-teacher-form',
  standalone: false,
  templateUrl: './teacher-form.html',
  styleUrl: './teacher-form.css',
})
export class TeacherForm implements OnInit {
  addUpdateForm: FormGroup;
  isEdit = false;
  id!: string;

  subjects = ['Math', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer'];
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
      subject: ['', Validators.required],
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

  get f() { return this.addUpdateForm.controls; }

  isInvalid(field: string): boolean {
    const c = this.addUpdateForm.get(field)!;
    return c.invalid && (c.dirty || c.touched);
  }

  patchData(): void {

    this.apiService.get<any[]>(`teacher/objects/${this.id}`)
      .pipe(finalize(() => (this.cdr.detectChanges())))
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.addUpdateForm.patchValue(data?.data || {});
          } else {
            console.warn('API returned no data for this teacher.');
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
      name: 'teacher',
      data: this.addUpdateForm.value,
    }
    const url = this.isEdit ? `teacher/objects/${this.id}` : 'teacher/objects';
    const method = this.isEdit ? 'put' : 'post';
    this.apiService[method]<any[]>(url, formValue)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/teacher'])
        },
        error: () => {
          console.warn('form submission failed');
        }
      });
  }
}
