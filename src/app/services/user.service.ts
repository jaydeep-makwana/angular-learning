import {
  Injectable,
  PLATFORM_ID,
  inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // providedIn: 'root' makes this service a singleton available app-wide.
  // This allows Angular to inject the same UserService into components like App.

  // In-memory copy of the user list. This is the source of truth for the app.
  users: User[] = [];

  // Access the current platform so localStorage is only used in the browser.
  platformId = inject(PLATFORM_ID);

  constructor() {
    // Load existing user data from local storage when the service is created.
    this.loadUsers();
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {

    this.users.push(user);

    this.saveToLocalStorage();
  }

  updateUser(updatedUser: User) {

    this.users = this.users.map(user =>
      user.id === updatedUser.id
        ? updatedUser
        : user
    );

    this.saveToLocalStorage();
  }

  deleteUser(id: number) {

    this.users = this.users.filter(
      user => user.id !== id
    );

    this.saveToLocalStorage();
  }

  loadUsers() {
    // Only access browser APIs when running in the browser.
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('users');
      this.users = data ? JSON.parse(data) : [];
    }
  }

  saveToLocalStorage() {
    // Persist the in-memory user list to browser localStorage.
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'users',
        JSON.stringify(this.users)
      );
    }
  }
}