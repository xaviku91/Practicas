import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct = { name: '', price: 0 };
  message: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.showMessage(`Producto "${this.newProduct.name}" añadido`);
        setTimeout(() => this.router.navigate(['/products']), 2000); // Redirige tras 2 segundos
      },
      error: (err) => console.error('Error al añadir:', err)
    });
  }

  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => this.message = '', 3000);
  }
}
