import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IResponse, IUser } from '../../interfaces/iuser.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  userService = inject(UsersService)
  router = inject(Router)

  async getLogin(loginForm: any ){
    const user: IUser = loginForm.value
    try{
      const response = await this.userService.login(user)
      if(response){
        this.router.navigate(["/home"])
      }
    } catch (error) {
      console.log(error)
    }

  }
}
