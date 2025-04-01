import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  editProduct: any = null;
  message: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.member || [];
    });
  }

  deleteProduct(id: number): void {
    const product = this.products.find(p => p.id === id);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.showMessage(`Producto "${product?.name}" eliminado`);
      },
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  startEdit(product: any): void {
    this.editProduct = { ...product };
  }

  saveEdit(): void {
    this.productService.patchProduct(this.editProduct.id, this.editProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.showMessage(`Producto "${this.editProduct.name}" editado`);
        this.editProduct = null;
      },
      error: (err) => console.error('Error al editar:', err)
    });
  }

  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => this.message = '', 3000);
  }
}
