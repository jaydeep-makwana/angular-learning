import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';

export const routes: Routes = [
    {
        path: '',
        component: App
    },
    {
        path: 'home',
        component: Home
    }
];
