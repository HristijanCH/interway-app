import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ProductService} from '../../products/services/product.service';
import {ProductFormData} from '../../products/types/product.types'; // or use Angular CDK snackbars if preferred

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
})
export class AddEditProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private toastr = inject(ToastrService);

  form!: FormGroup;
  isEditMode = false;
  productId?: string;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantityInStock: [0, [Validators.required, Validators.min(0)]],
      category: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = idParam;
      this.loadProduct(idParam);
    }
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.form.patchValue(product);
      },
      error: () => this.toastr.error('Failed to load product'),
    });
  }

  onSubmit() {
    const formValues: ProductFormData = this.form.value;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, formValues).subscribe({
        next: () => {
          this.toastr.success('Product updated');
          this.router.navigate(['/products']);
        },
        error: () => this.toastr.error('Update failed'),
      });
    } else {
      this.productService.createProduct(formValues).subscribe({
        next: () => {
          this.toastr.success('Product created');
          this.router.navigate(['/products']);
        },
        error: () => this.toastr.error('Creation failed'),
      });
    }
  }
}
