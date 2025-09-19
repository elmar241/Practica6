import { Component, inject } from '@angular/core';
import { IResponse, IUser } from '../../interfaces/iuser.interfaces';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsersPromises: IUser[] = []
  userService = inject(UsersService)
  resultsNext: string = ""
  resultsPrev: string = ""

  ngOnInit() {
    this.cargarUsuarios()
  }

  async cargarUsuarios(url: string = ""){
    try{
      const response: IResponse = await this.userService.getAllPromises(url)
      this.arrUsersPromises = response.results
    }
    catch (error){
      console.log(error)
    }
  }

  gotoPrev(){
    this.cargarUsuarios(this.resultsPrev)
  }

  gotoNext() {
    this.cargarUsuarios(this.resultsNext)
  }
}
