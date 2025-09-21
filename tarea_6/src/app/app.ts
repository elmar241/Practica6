import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./shared/nav/nav.component";
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'tarea_6';
}
