import { Component, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  miUser = input<IUser>() //Este es solo de lectura
}
