import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IError, IUser } from '../../interfaces/iuser.interfaces';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() miUser!: IUser 
  @Output() deleteUserEmit: EventEmitter<string> = new EventEmitter()
  usersService = inject(UsersService)

  async deleteUser(idUser: string) {
    // Llamamos al servicio y le pido que borre el empleado por id
    const response: any = await this.usersService.remove(idUser)
    if(!response.error) {
      this.deleteUserEmit.emit('Usuario borrado correctamente')
    } else {
      alert(response.error)
    }
  }
}
