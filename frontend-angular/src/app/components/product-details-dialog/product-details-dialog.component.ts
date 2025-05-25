import {ProductService} from '../../products/services/product.service';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-details-dialog',
  standalone: true,
  imports: [CommonModule
  ],
  templateUrl: './product-details-dialog.component.html',
})
export class ProductDetailsDialogComponent implements OnInit {
  productId: string;
  product: any;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  isUploading = false;

  constructor(
    private productService: ProductService,
    private dialogRef: DialogRef<ProductDetailsDialogComponent>,
    @Inject(DIALOG_DATA) public data: { productId: string }
  ) {
    this.productId = data.productId;
  }

  ngOnInit(): void {
    console.log('Product ID:', this.productId);
    if (!this.productId) return;

    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
      if (data.image) {
        this.imageUrl = `data:image/jpeg;base64,${data.image}`;
      }
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.selectedFile = target.files[0];
    }
  }

  uploadImage() {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.productService.uploadProductImage(this.productId, this.selectedFile).subscribe({
      next: () => {
        this.isUploading = false;
        this.selectedFile = null;
        this.ngOnInit(); // refresh
      },
      error: () => {
        this.isUploading = false;
        alert('Image upload failed');
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
