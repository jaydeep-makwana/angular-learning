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
  // Root component for the user CRUD demo.
  // Manages form state, edit mode, and delegates data operations to UserService.

  // The current list of users displayed in the template.
  users: User[] = [];

  // Form model values bound to input fields via ngModel.
  name = '';
  email = '';

  // Tracks if we are editing an existing user or creating a new one.
  editMode = false;

  // When editing a user, store its id so updateUser() can replace the correct item.
  editingUserId: number | null = null;

  constructor(
    // Angular dependency injection provides the shared UserService instance.
    private userService: UserService
  ) {}

  ngOnInit() {
    // Angular lifecycle hook that runs after component creation.
    // Load stored users from the service when the app starts.
    this.loadUsers();
  }

  loadUsers() {
    // Fetch the current list of users from UserService.
    this.users = this.userService.getUsers();
  }

  saveUser() {
    // Validate user input before creating a new user.
    if (!this.name || !this.email) {
      alert('All fields are required');
      return;
    }

    const user: User = {
      id: Date.now(),
      name: this.name,
      email: this.email
    };

    // Add the new user through the service and persist to localStorage.
    this.userService.addUser(user);

    // Refresh the list so the template updates with the new user.
    this.loadUsers();

    // Clear the form after saving.
    this.resetForm();
  }

  editUser(user: User) {
    // Set edit mode and populate the form with the selected user's data.
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

    // Update the user in the service and persist the changes.
    this.userService.updateUser(updatedUser);

    // Refresh the list and reset the form.
    this.loadUsers();
    this.resetForm();
  }

  deleteUser(id: number) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirmDelete) return;

    // Remove the user from the service and localStorage.
    this.userService.deleteUser(id);

    this.loadUsers();
  }

  resetForm() {
    // Clear form fields and exit edit mode.
    this.name = '';
    this.email = '';
    this.editMode = false;
    this.editingUserId = null;
  }
}