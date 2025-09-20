import { Component, inject, input, Input } from '@angular/core';
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
  userService = inject(UsersService)
  miUser = input<IUser>()
  user?: IUser

  async ngOnInit() {
    
    try {
      this.user = await this.userService.getById(this.idUser)

    } catch (msg: any) {
      console.log(msg.error)
    }

  }
}
