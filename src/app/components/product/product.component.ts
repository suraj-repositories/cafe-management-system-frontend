import { AfterViewInit, ChangeDetectorRef, Component, Renderer2, ViewChild } from '@angular/core';
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  imports: [AddProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  implements AfterViewInit{
  products: any[] = [];
  dataTable:any;
  isDataTableInitialized = false;

  name: string = '';
  categoryId: number | null = null;
  productId: number | null = null;
  price = 0;
  description = '';
  currency = environment.currency;

  @ViewChild(AddProductComponent) AddProductComponent!: AddProductComponent;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastService: ToastService,
  ){}


  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Mark Smith', email: 'mark@example.com' }
  ];

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products = [...response];
        this.cdRef.detectChanges();

        if(!this.isDataTableInitialized){
          this.dataTable = ($('#datatable') as any).DataTable({
            data: this.products.map((product, index) => [
              index + 1,
              product.name,
              product.categoryName,
              this.currency + product.price,
              product.description,
              product.status,
              this.renderActionButtons(product),
            ]),
            columns: [
              { title: 'ID' },
              { title: 'Product Name' },
              { title: 'Category Name' },
              { title: 'Price' },
              { title: 'Description' },
              { title: 'Status' },
              { title: 'Actions' },
            ],
            createdRow: (row: any, data: any, dataIndex: any) => {
              const editBtn = row.querySelector('.edti-btn');
              if(editBtn){
                this.renderer.listen(editBtn, 'click', ()=>{
                  const product = this.products[dataIndex];
                  this.openEditModal(product);
                });
              }

              const deleteBtn = row.querySelector('.delete-btn');
              if (deleteBtn) {
                this.renderer.listen(deleteBtn, 'click', () => {
                  this.deleteCategory(this.products[dataIndex].id);
                });
              }
            }
          });

          this.isDataTableInitialized = true;
        }else{
          this.dataTable.clear();
          this.products.forEach((product, index) => {
            this.dataTable.row.add([
              index + 1,
              product.name,
              product.categoryName,
              this.currency + product.price,
              product.description,
              product.status,
              this.renderActionButtons(product),
            ]);
          });
          this.dataTable.draw();
        }
      },
      error: (error) => console.error(error),
    });
  }

  private renderActionButtons(product: any): string{
    return `
      <button class="btn action-btn btn-success edit-btn" data-id="${product.id}" data-name="${product.name} data-category-name="${product.categoryName}" data-category-id="${product.categoryId}" data-product-price="${product.price}" data-product-description="${product.description}" ">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="btn action-btn btn-danger delete-btn" data-id="${product.id}">
        <i class="fa-solid fa-trash"></i>
      </button>`;
  }

  openEditModal(product: any){
    // if(this.AddProductComponent && this.AddProductComponent.openForEdit){
    //   this.AddProductComponent.openForEdit(product);
    // }
  }

  deleteCategory(productId: any){

  }


  onProdctAdded(): void {
    this.loadProducts();
  }
  onProductUpdated(): void {
    this.loadProducts();
  }

}
