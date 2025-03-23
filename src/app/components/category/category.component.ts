import { AfterViewInit, Component } from '@angular/core';
import 'datatables.net';
import { AddCategoryComponent } from './add-category/add-category.component';


@Component({
  selector: 'app-category',
  imports: [AddCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements AfterViewInit {

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Mark Smith', email: 'mark@example.com' }
  ];

  ngAfterViewInit(): void {
    ($('#datatable') as any).DataTable();
  }
}
