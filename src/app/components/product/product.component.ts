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
export class ProductComponent implements AfterViewInit {
  products: any[] = [];

  dataTable: any;
  isDataTableInitialized = false;

  currency = environment.currency;

  @ViewChild(AddProductComponent) AddProductComponent!: AddProductComponent;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastService: ToastService,
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products = [...response];
        this.cdRef.detectChanges();

        if (!this.isDataTableInitialized) {
          this.dataTable = ($('#datatable') as any).DataTable({
            data: this.products.map((product, index) => [
              index + 1,
              product.name,
              product.categoryName,
              this.currency + product.price,
              product.description,
              this.renderStatusSwitch(product),
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
              const editBtn = row.querySelector('.edit-btn');
              if (editBtn) {
                this.renderer.listen(editBtn, 'click', () => {
                  const product = this.products[dataIndex];
                  this.openEditModal(product);
                });
              }

              const deleteBtn = row.querySelector('.delete-btn');
              if (deleteBtn) {
                this.renderer.listen(deleteBtn, 'click', () => {
                  this.deleteProduct(this.products[dataIndex].id);
                });
              }
            }
          });

          this.isDataTableInitialized = true;
        } else {
          this.dataTable.clear();
          this.products.forEach((product, index) => {
            this.dataTable.row.add([
              index + 1,
              product.name,
              product.categoryName,
              this.currency + product.price,
              product.description,
              this.renderStatusSwitch(product),
              this.renderActionButtons(product),
            ]);
          });
          this.dataTable.draw();
        }
      },
      error: (error) => console.error(error),
    });
  }

  private renderActionButtons(product: any): string {
    return `
      <button class="btn action-btn btn-success edit-btn" data-id="${product.id}" data-name="${product.name} data-category-name="${product.categoryName}" data-category-id="${product.categoryId}" data-product-price="${product.price}" data-product-description="${product.description}">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="btn action-btn btn-danger delete-btn" data-id="${product.id}">
        <i class="fa-solid fa-trash"></i>
      </button>`;
  }
  private renderStatusSwitch(product: any): string {
    return `
        <input type="checkbox" name="status" id="status"
            ${product.status ? 'checked' : ''}
            class="switch">
    `;
  }

  openEditModal(product: any) {

    if(this.AddProductComponent && this.AddProductComponent.openForEdit){
      this.AddProductComponent.openForEdit(product);
    }
    else{
      console.error('AddProductComponent or openForEdit method not found!');
    }
  }

  deleteProduct(productId: any): void {
    this.productService.destroy(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.success(response.message);
        this.loadProducts();

      },
      error: (error) => {
        console.error(error);
        if (error.error.message) {
          this.toastService.error(error.error.message);
        } else {
          this.toastService.error("Deletion Failed : ", error.message);
        }
      },
    });
  }



  onProdctAdded(): void {
    this.loadProducts();
  }
  onProductUpdated(): void {
    this.loadProducts();
  }

}
