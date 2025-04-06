import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  error = '';
  carritoId: number | null = null;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.apiService.get<any>('productos').subscribe({
      next: (response) => this.productos = response['hydra:member'] || [],
      error: (err) => {
        this.error = 'Error al cargar los productos';
        console.error(err);
      }
    });
  }

  agregarAlCarrito(productoId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.error = 'Inicia sesión para añadir al carrito';
      return;
    }
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    if (!this.carritoId) {
      this.apiService.post<any>('carritos/crear', {}, { headers }).subscribe({
        next: (response) => {
          this.carritoId = response.id;
          this.agregarItem(productoId, headers);
        },
        error: (err) => {
          this.error = 'Error al crear el carrito';
          console.error(err);
        }
      });
    } else {
      this.agregarItem(productoId, headers);
    }
  }

  private agregarItem(productoId: number, headers: any): void {
    const producto = this.productos.find(p => p.id === productoId);
    const data = {
      carrito: `/api/carritos/${this.carritoId}`,
      producto: `/api/productos/${productoId}`,
      cantidad: 1,
      precioUnitario: producto.precioFinal
    };
    this.apiService.post<any>('carrito_items', data, { headers }).subscribe({
      next: () => alert('Producto añadido'),
      error: (err) => {
        this.error = 'Error al añadir al carrito';
        console.error(err);
      }
    });
  }
}
