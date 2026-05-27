import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() data: any[] = [];

  @Input() columns: any[] = [];

  @Input() loading = false;

  @Input() total = 0;

  @Input() pageSize = 10;

  @Input() pageIndex = 1;

  @Output() pageChange = new EventEmitter<number>();

  @Output() edit = new EventEmitter<any>();

  @Output() delete = new EventEmitter<any>();


  onPageIndexChange(page: number) {
    this.pageChange.emit(page);
  }

  onEdit(row: any) {
    console.log('Edit', row);

    this.edit.emit(row);
  }

  onDelete(row: any) {
    console.log('Delete', row);
    this.delete.emit(row);
  }

}
