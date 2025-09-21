import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() idUser : string = ""
  @Output() deleteUserEmit: EventEmitter<string> = new EventEmitter()
  userService = inject(UsersService)
  user?: IUser

  async ngOnInit() {
    try {
      this.user = await this.userService.getById(this.idUser)

    } catch (msg: any) {
      console.log(msg.error)
    }
  }

  async deleteUser(idUser: string) {
    // Llamamos al servicio y le pido que borre el empleado por id
    const response: any = await this.userService.remove(idUser)
    if(!response.error) {
      this.deleteUserEmit.emit('Usuario borrado correctamente')
    } else {
      alert(response.error)
    }
  }



}
