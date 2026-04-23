import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TeacherService {
    private teachers: any[] = [
        { id: 1, name: 'Anita Singh', email: 'anita@school.com', phone: '9988776655', subject: 'Math' },
        { id: 2, name: 'Ravi Kumar', email: 'ravi@school.com', phone: '9876001234', subject: 'Science' },
    ];
    private nextId = 3;

    getAll(): Observable<any[]> { return of([...this.teachers]); }

    getById(id: number): Observable<any | undefined> {
        return of(this.teachers.find(t => t.id === id));
    }

    create(t: any): Observable<any> {
        const newT = { ...t, id: this.nextId++ };
        this.teachers.push(newT);
        return of(newT);
    }

    update(id: number, t: any): Observable<any> {
        const idx = this.teachers.findIndex(x => x.id === id);
        if (idx > -1) this.teachers[idx] = { ...t, id };
        return of({ ...t, id });
    }

    delete(id: number): Observable<void> {
        this.teachers = this.teachers.filter(t => t.id !== id);
        return of(void 0);
    }
}