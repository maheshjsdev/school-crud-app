import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public studentService: StudentService
  ) {
    this.addUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      grade: ['', Validators.required],
    });

    // 🔥 auto patch form when signal updates
    effect(() => {
      const student = this.studentService.selectedStudent();
      if (student) {
        this.addUpdateForm.patchValue(student);
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = id;
      this.isEdit = true;

      // 🔥 call service (handles cache + API)
      this.studentService.getStudentById(id);
    }
  }


  // 🔥 submit
  addUpdateClicked(): void {
    if (this.addUpdateForm.invalid) {
      this.addUpdateForm.markAllAsTouched();
      return;
    }

    this.studentService
      .saveStudent(this.isEdit ? this.id : null, this.addUpdateForm.value)
      .subscribe({
        next: (res: any) => {

          if (this.isEdit) {
            // ✅ update only that student
            this.studentService.updateStudentInState(res);
          } else {
            // ✅ add new student
            this.studentService.addStudentToState(res);
          }

          this.resetForm();
        },
        error: () => console.warn('form submission failed')
      });
  }
  resetForm() {
    this.addUpdateForm.reset();
    this.addUpdateForm.markAsUntouched();
    this.addUpdateForm.markAsPristine();
    this.studentService.selectedStudent.set(null)
    this.router.navigate(['/student']);
  }
}