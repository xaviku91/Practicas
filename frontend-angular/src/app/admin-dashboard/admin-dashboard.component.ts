import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  user: User | null = null;
  users: User[] = [];
  selectedUser: User | null = null;
  showModal: boolean = false;
  modalMessage: string = '';
  modalSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  viewUser(user: User) {
    this.selectedUser = user;
    this.showModal = true;
    this.modalMessage = `Detalles de ${user.name}: Email: ${user.email}, Rol: ${user.role || 'No definido'}`;
    this.modalSuccess = true;
  }

  editUser(id: number) {
    this.router.navigate(['/admin/edit-user', id]);
  }

  deleteUser(id: number) {
    const userToDelete = this.users.find(u => u.id === id);
    this.authService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.showModal = true;
        this.modalMessage = `Usuario "${userToDelete?.name || 'Desconocido'}" ha sido eliminado correctamente`;
        this.modalSuccess = true;
      },
      error: (error) => {
        this.showModal = true;
        this.modalMessage = 'Error al eliminar el usuario';
        this.modalSuccess = false;
        console.error('Error al eliminar usuario:', error);
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}