import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class StudentService {
    private students: any[] = [
        { id: '1', name: 'Rahul Sharma', email: 'rahul@mail.com', phone: '9876543210', grade: '10th' },
        { id: '2', name: 'Priya Verma', email: 'priya@mail.com', phone: '9123456780', grade: '11th' },
    ];
    private nextId = 3;

    getAll(): Observable<any[]> {
        return of([...this.students]);
    }

    getById(id: string): Observable<any | undefined> {
        return of(this.students.find(s => s.id === id));
    }

    create(s: any): Observable<any> {
        const newStudent = { ...s, id: this.nextId++ };
        this.students.push(newStudent);
        return of(newStudent);
    }

    update(id: string, s: any): Observable<any> {
        const idx = this.students.findIndex(x => x.id === id);
        if (idx > -1) this.students[idx] = { ...s, id: id };
        return of({ ...s, id: id });
    }

    delete(id: string): Observable<void> {
        this.students = this.students.filter(s => s.id !== id);
        return of(void 0);
    }
}