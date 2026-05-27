import { Component } from '@angular/core';
import { StudentService } from '../../../student/student.service';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-university',
  standalone: false,
  templateUrl: './university.html',
  styleUrl: './university.css',
})
export class University {
  addUpdateForm!: FormGroup;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 10;
  loading: boolean = false;
  submitLoading: boolean = false;

  constructor(public studentService: StudentService, private apiService: ApiService, private fb: FormBuilder, private modal: NzModalService) {
    this.addUpdateForm = this.fb.group({
      universityName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ]
      ],
      universityCode: [
        '',
        [
          Validators.minLength(0),
          Validators.maxLength(20),
        ]
      ],
      bitIsActive: [false],


      // email: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.email
      //   ]
      // ],

      // phone: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern(/^[0-9]{10}$/)
      //   ]
      // ]
    });
  }
  // columns = [
  //   { title: 'Name', key: 'data?.name' },
  //   { title: 'Email', key: 'data?.email' },
  //   { title: 'Phone', key: 'data?.phone' }
  // ];
  columns = [
    {
      title: 'Name',
      value: (row: any) => row.data?.name
    },
    {
      title: 'Email',
      value: (row: any) => row.data?.email
    },
    {
      title: 'Phone',
      value: (row: any) => row.data?.phone
    }
  ];
  ngOnInit(): void {
    !this.studentService.isLoaded() && this.getData();
  }

  getData(): void {
    this.loading = true;
    this.studentService.getData()?.subscribe({
      next: (data: any) => {
        this.studentService.setStudents(data);
        this.loading = false;
      },
      error: (err: any) => {
        console.warn('API fetch failed:', err);
      }
    });
  }


  onPageChange(page: number) {
    this.pageIndex = page;
    this.getData();
  }

  editClicked(student: any) {
    // console.log('Edit', student);
    this.openModal();
  }

  // modal
  isVisibleFormModal = false;

  openModal(): void {
    this.isVisibleFormModal = true;
  }

  closeModal(): void {
    this.isVisibleFormModal = false;
    this.addUpdateForm.reset();
    this.addUpdateForm.markAsUntouched();
    this.addUpdateForm.markAsPristine();

  }

  submitForm(): void {
    if (this.addUpdateForm.invalid) {
      this.addUpdateForm.markAllAsTouched();
      return;
    }

    console.log(this.addUpdateForm.value);

    this.submitLoading = true;

    setTimeout(() => {

      console.log(this.addUpdateForm.value);

      this.submitLoading = false;
      this.isVisibleFormModal = false;

      this.closeModal();

    }, 2000);
  }

  showDeleteConfirm(event: any): void {
    console.log('Delete', event);
    this.modal.confirm({
      nzTitle: 'Are you sure delete this item ?',
      // nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      // nzOnOk: () => this.deleteClicked(event),
      nzOnOk: () => {

        return new Promise((resolve, reject) => {

          this.studentService.deleteStudent('552')?.subscribe({

            next: () => {

              this.studentService.removeStudentFromState('552');

              resolve(true);

            },

            error: (err) => {

              console.warn('Delete failed:', err);

              reject(err);

            }

          });

        });

      },

      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  // deleteClicked(id: string): void {
  //   console.log('Delete', id);
  //   this.studentService.deleteStudent('522')?.subscribe({
  //     next: (res: any) => {
  //       this.studentService.removeStudentFromState('522')
  //     },
  //     error: (err) => {
  //       console.warn('Delete failed:', err);
  //     }
  //   });
  // }
}
