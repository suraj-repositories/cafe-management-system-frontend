import { AfterViewInit, Component } from '@angular/core';
import { AddProductComponent } from "./add-product/add-product.component";

@Component({
  selector: 'app-product',
  imports: [AddProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  implements AfterViewInit{
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Mark Smith', email: 'mark@example.com' }
  ];

  ngAfterViewInit(): void {
    ($('#datatable') as any).DataTable();
  }

}
