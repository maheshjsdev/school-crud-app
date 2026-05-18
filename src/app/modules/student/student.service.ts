import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StudentService {

    constructor(private apiServ: ApiService) { }

    // 🔥 signals (state)
    students = signal<any[]>([]);
    loading = signal(false);
    deletingId = signal<string | null>(null);
    isLoaded = signal(false);

    selectedStudent = signal<any | null>(null);
    buttonLoading = signal(false);

    // ✅ setters
    setStudents(data: any[]) {
        this.students.set(data);
        this.isLoaded.set(true);
    }

    setLoading(value: boolean) {
        this.loading.set(value);
    }

    setDeletingId(id: string | null) {
        this.deletingId.set(id);
    }

    setButtonLoading(value: boolean) {
        this.buttonLoading.set(value);
    }

    // 🔹 Fetch all students
    getData() {
        this.setLoading(true);

        return this.apiServ.get<any[]>('student/objects')
            .pipe(
                finalize(() => this.setLoading(false))
            );
    }

    // 🔹 Delete student
    deleteStudent(id: string) {
        this.setDeletingId(id);

        return this.apiServ.delete(`student/objects/${id}`)
            .pipe(
                finalize(() => this.setDeletingId(null))
            );
    }
    removeStudentFromState(id: string) {
        const updated = this.students().filter(s => s.id !== id);
        this.students.set(updated);
    }
    // 🔹 Get student by ID
    getStudentById(id: string) {

        // reset previous data (important)
        this.selectedStudent.set(null);

        const existing = this.students().find(s => s.id === id)?.data;

        // ✅ use cache
        if (existing) {
            this.selectedStudent.set(existing);
            return;
        }

        this.setLoading(true);

        this.apiServ.get(`student/objects/${id}`)
            .pipe(finalize(() => this.setLoading(false)))
            .subscribe({
                next: (res: any) => {
                    this.selectedStudent.set(res?.data);
                },
                error: (err) => {
                    console.warn('Failed to fetch student by id:', err);
                }
            });
    }

    // 🔹 Save (Add / Update)
    saveStudent(id: string | null, data: any) {

        this.setButtonLoading(true);
        this.isLoaded.set(true)
        const url = id ? `student/objects/${id}` : 'student/objects';
        const method = id ? 'put' : 'post';

        return this.apiServ[method](url, { name: 'student', data })
            .pipe(
                finalize(() => this.setButtonLoading(false)) // ✅ correct usage
            );
    }

    updateStudentInState(updatedStudent: any) {
        const updatedList = this.students().map(s =>
            s.id === updatedStudent.id ? updatedStudent : s
        );

        this.students.set(updatedList);

        // 🔥 also update selected student if open
        if (this.selectedStudent() && this.selectedStudent()?.id === updatedStudent.id) {
            this.selectedStudent.set(updatedStudent.data);
        }
    }
    addStudentToState(newStudent: any) {
        this.students.set([...this.students(), newStudent]);
    }
}