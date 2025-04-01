import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: any[] = [];
  newProduct = { name: '', price: 0 };
  editProduct: any = null;
  message: string = ''; // Variable para el mensaje

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.member || [];
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.newProduct = { name: '', price: 0 };
        this.loadProducts();
        this.showMessage(`Producto "${this.newProduct.name}" añadido`);
      },
      error: (err) => console.error('Error al añadir:', err)
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
    setTimeout(() => this.message = '', 3000); // Desaparece tras 3 segundos
  }
}