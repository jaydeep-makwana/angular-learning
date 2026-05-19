import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { Default } from './default/default';

export const routes: Routes = [
    {
        path: '',
        component: Default
    },
    {
        path: 'home',
        component: Home
    }
];
