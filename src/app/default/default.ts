import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet],
  templateUrl: './default.html',
  styleUrl: './default.css',
})
export class Default {
  protected readonly title = signal('my-app');
}
