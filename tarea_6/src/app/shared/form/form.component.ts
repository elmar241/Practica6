import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IResponse, IUser } from '../../interfaces/iuser.interfaces';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  userService = inject(UsersService)

  async getLogin(loginForm: any ){
    const user: IUser = loginForm.value
    try{
      const response = await this.userService.login(user)
      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }
}
