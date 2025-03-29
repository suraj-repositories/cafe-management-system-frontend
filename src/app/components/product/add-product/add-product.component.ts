import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastService } from '../../../services/toast.service';
import { ProductService } from '../../../services/product.service';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  name: string = '';
  categories: any[] = [];
  categoryId: number = 1;
  productId: bigint | null = null;
  price = 0;
  description = '';
  mode: 'add' | 'edit' = 'add';

  @Output() productAdded = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<void>();
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;
  @ViewChild('productNameInput') productNameInput!: ElementRef;

  constructor(private productService: ProductService, private categoryService: CategoryService, private toastService: ToastService) {
    this.loadCategories();
  }
  openForEdit(product: { id: bigint, name: string, categoryId: number, price: number, description: string }) {

    this.mode = 'edit';
    this.productId = product.id;
    this.name = product.name;
    this.categoryId = product.categoryId;
    this.price = product.price;
    this.description = product.description;

    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  openForAdd() {
    this.mode = 'add';
    this.categoryId = 1;
    this.name = '';

    const modalElement = document.getElementById('productModal');

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  submitProduct(): void {
    if (this.mode === 'add') {
      this.addProduct();
    } else {
      this.updateProduct();
    }
  }

  addProduct() {
    this.productService.store(this.name, this.categoryId, this.price, this.description).subscribe({
      next: () => {
        this.closeModal();
        this.toastService.success('Product Created!');
        this.productAdded.emit();
        this.name = '';
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  updateProduct() {
    if (this.productId !== null) {
      this.productService.update(
        this.productId,
        this.name,
        this.categoryId,
        this.price,
        this.description
      ).subscribe({
        next: () => {
          this.closeModal();
          this.toastService.success('Product Updated!');
          this.productAdded.emit();
          this.name = '';
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    } else {
      this.toastService.error('Invalid product ID.');
    }
  }



  closeModal(): void {
    this.closeModalButton.nativeElement.click();
  }

  handleError(error: any): void {
    this.closeModal();
    if (error.error.message) {
      this.toastService.error(error.error.message);
    } else {
      this.toastService.error('Operation Failed!');
      console.error(error);
    }
    this.name = '';
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.productNameInput.nativeElement.focus();
      });
    }
  }
}
