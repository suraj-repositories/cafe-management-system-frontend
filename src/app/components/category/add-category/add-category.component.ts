import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastService } from '../../../services/toast.service';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  name = '';
  mode: 'add' | 'edit' = 'add';
  categoryId: number | null = null;

  @Output() categoryAdded = new EventEmitter<void>();
  @Output() categoryUpdated = new EventEmitter<void>();
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;
  @ViewChild('categoryNameInput') categoryNameInput!: ElementRef;

  constructor(private categoryService: CategoryService, private toastService: ToastService) { }

  openForEdit(category: { id: number; name: string }) {
    console.log('Editing category:', category);
    this.mode = 'edit';
    this.categoryId = category.id;
    this.name = category.name;

    const modalElement = document.getElementById('createCategoryModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openForAdd() {
    this.mode = 'add';
    this.categoryId = null;
    this.name = '';
    $('#createCategoryModal').on('hidden.bs.modal', function () {
      $('.modal-backdrop').remove();
  });
  }

  submitCategory(): void {
    if (this.mode === 'add') {
      this.addCategory();
    } else {
      this.updateCategory();
    }
  }

  addCategory(): void {
    this.categoryService.store(this.name).subscribe({
      next: () => {
        this.closeModal();
        this.toastService.success('Category Created!');
        this.categoryAdded.emit();
        this.name = '';
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  updateCategory(): void {
    if (this.categoryId === null) return;

    this.categoryService.update(this.categoryId, this.name).subscribe({
      next: () => {
        this.closeModal();
        this.toastService.success('Category Updated!');
        this.categoryUpdated.emit();
        this.name = '';
      },
      error: (error) => {
        this.handleError(error);
      },
    });
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
    const modalElement = document.getElementById('createCategoryModal');
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.categoryNameInput.nativeElement.focus();
      });
    }
  }
}
