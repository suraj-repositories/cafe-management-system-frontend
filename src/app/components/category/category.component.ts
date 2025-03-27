import { AfterViewInit, ChangeDetectorRef, Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import 'datatables.net';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-category',
  imports: [AddCategoryComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  categories: any[] = [];
  dataTable: any;
  isDataTableInitialized = false;

  name = '';
  mode: 'add' | 'edit' = 'add';
  categoryId: number | null = null;
  @ViewChild(AddCategoryComponent) addCategoryComponent!: AddCategoryComponent;

  constructor(
    private categoryService: CategoryService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastService: ToastService,

  ) { }


  ngAfterViewInit() {
    console.log('addCategoryComponent:', this.addCategoryComponent);
  }

  openEditModal(category: any) {
    if (this.addCategoryComponent && this.addCategoryComponent.openForEdit) {
      this.addCategoryComponent.openForEdit(category);
    } else {
      console.error("addCategoryComponent is not initialized or openForEdit is missing.");
    }
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = [...response];
        this.cdRef.detectChanges();

        if (!this.isDataTableInitialized) {
          this.dataTable = ($('#datatable') as any).DataTable({
            data: this.categories.map((category, index) => [
              index + 1,
              category.name,
              this.renderActionButtons(category),
            ]),
            columns: [
              { title: 'ID' },
              { title: 'Name' },
              { title: 'Actions' },
            ],
            createdRow: (row: any, data: any, dataIndex: any) => {
              const editBtn = row.querySelector('.edit-btn');
              if (editBtn) {
                this.renderer.listen(editBtn, 'click', () => {
                  const category = this.categories[dataIndex];
                  this.openEditModal(category);
                })
              };

              const deleteBtn = row.querySelector('.delete-btn');
              if (deleteBtn) {
                this.renderer.listen(deleteBtn, 'click', () => {
                  this.deleteCategory(this.categories[dataIndex].id);
                });
              }
            }

          });
          this.isDataTableInitialized = true;
        } else {
          this.dataTable.clear();
          this.categories.forEach((category, index) => {
            this.dataTable.row.add([
              index + 1,
              category.name,
              this.renderActionButtons(category),
            ]);
          });
          this.dataTable.draw();
        }
      },
      error: (error) => console.error(error),
    });
  }

  onCategoryAdded(): void {
    this.loadCategories();
  }
  onCategoryUpdated(): void {
    this.loadCategories();
  }

  private renderActionButtons(category: any): string {
    return `
      <button class="btn action-btn btn-success edit-btn" data-id="${category.id}" data-name="${category.name}">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="btn action-btn btn-danger delete-btn" data-id="${category.id}">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
  }


  deleteCategory(categoryId: any): void {
    this.categoryService.destroy(categoryId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.success(response.message);
        this.loadCategories();

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


}
