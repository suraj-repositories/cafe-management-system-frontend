import { Component, ElementRef, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastService } from '../../../services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  name = "";

  @Output() categoryAdded = new EventEmitter<void>();
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;
  @ViewChild('categoryNameInput') categoryNameInput!: ElementRef;


  constructor(private categoryService: CategoryService, private toastService: ToastService){};

  addCategory(): void {
    this.categoryService.store(this.name).subscribe({
      next: () => {
        this.closeModal();
        this.toastService.success('Category Created!');
        this.categoryAdded.emit();
        this.name = "";
      },
      error: (error) => {
        this.closeModal();
        if(error.error.message){
          this.toastService.error(error.error.message);
        }else{
          this.toastService.error("Category Creation Failed!");
          console.error(error);
        }

        this.name = "";
      }
    });
  }

  closeModal(): void {
    this.closeModalButton.nativeElement.click();
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
