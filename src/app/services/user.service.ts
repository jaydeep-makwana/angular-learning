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

  users: User[] = [];

  platformId = inject(PLATFORM_ID);

  constructor() {
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

    if (isPlatformBrowser(this.platformId)) {

      const data = localStorage.getItem('users');

      this.users = data ? JSON.parse(data) : [];
    }
  }

  saveToLocalStorage() {

    if (isPlatformBrowser(this.platformId)) {

      localStorage.setItem(
        'users',
        JSON.stringify(this.users)
      );
    }
  }
}