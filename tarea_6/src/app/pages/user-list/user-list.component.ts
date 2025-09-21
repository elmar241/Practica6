import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IResponse, IUser } from '../../interfaces/iuser.interfaces';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
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

  getAlertDelete(event:string){
    this.cargarUsuarios()
    toast.error(event)
  }
  gotoPrev(){
    this.cargarUsuarios(this.resultsPrev)
  }

  gotoNext() {
    this.cargarUsuarios(this.resultsNext)
  }
}
