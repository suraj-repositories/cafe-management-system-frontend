import { AfterViewInit, ChangeDetectorRef, Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import 'datatables.net';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-category',
  imports: [AddCategoryComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  dataTable: any;
  isDataTableInitialized = false;

  constructor(
    private categoryService: CategoryService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastService: ToastService,
  ) {}

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
              this.renderActionButtons(category.id),
            ]),
            columns: [
              { title: 'ID' },
              { title: 'Name' },
              { title: 'Actions' },
            ],
            createdRow: (row: any, data: any, dataIndex: any) => {
              const deleteBtn = row.querySelector('.delete-btn');
              if (deleteBtn) {
                this.renderer.listen(deleteBtn, 'click', () => {
                  this.deleteCategory(this.categories[dataIndex].id);
                });
              }
            },
          });
          this.isDataTableInitialized = true;
        } else {
          this.dataTable.clear();
          this.categories.forEach((category, index) => {
            this.dataTable.row.add([
              index + 1,
              category.name,
              this.renderActionButtons(category.id),
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

  private renderActionButtons(categoryId: number): string {
    return `
      <a href="#" class="btn action-btn btn-success">
        <i class="fa-solid fa-pen-to-square"></i>
      </a>
      <button class="btn action-btn btn-danger delete-btn" data-id="${categoryId}">
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
        if(error.error.message){
          this.toastService.error(error.error.message);
        }else{
          this.toastService.error("Deletion Failed : ", error.message);
        }
      },
    });
  }


}
