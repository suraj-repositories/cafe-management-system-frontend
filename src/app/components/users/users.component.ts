import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements AfterViewInit{
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Mark Smith', email: 'mark@example.com' }
  ];

  ngAfterViewInit(): void {
    ($('#datatable') as any).DataTable();
  }

}
