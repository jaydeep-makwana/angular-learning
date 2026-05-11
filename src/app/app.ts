import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  users: User[] = [];

  name = '';
  email = '';

  editMode = false;

  editingUserId: number | null = null;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  saveUser() {

    if (!this.name || !this.email) {
      alert('All fields are required');
      return;
    }

    const user: User = {
      id: Date.now(),
      name: this.name,
      email: this.email
    };

    this.userService.addUser(user);

    this.loadUsers();

    this.resetForm();
  }

  editUser(user: User) {

    this.editMode = true;

    this.editingUserId = user.id;

    this.name = user.name;

    this.email = user.email;
  }

  updateUser() {

    if (!this.editingUserId) return;

    const updatedUser: User = {
      id: this.editingUserId,
      name: this.name,
      email: this.email
    };

    this.userService.updateUser(updatedUser);

    this.loadUsers();

    this.resetForm();
  }

  deleteUser(id: number) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirmDelete) return;

    this.userService.deleteUser(id);

    this.loadUsers();
  }

  resetForm() {

    this.name = '';

    this.email = '';

    this.editMode = false;

    this.editingUserId = null;
  }
}