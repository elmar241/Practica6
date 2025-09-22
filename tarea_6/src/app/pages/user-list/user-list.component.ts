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
  currentPage: number = 1

  ngOnInit() {
    this.cargarUsuarios()
  }

  async cargarUsuarios(page: number = 1){
    try {
      const response: IResponse = await this.userService.getAllPromises(`${this.userService.baseUrl}?page=${page}`)
      this.arrUsersPromises = response.results
      this.currentPage = page
    } catch (error) {
      console.error(error)
    }
  }

  getAlertDelete(event:string){
    this.cargarUsuarios()
    toast.error(event)
  }
  gotoPrev() {
    if (this.currentPage > 1) {
      this.cargarUsuarios(this.currentPage - 1)
    }
  }

  gotoNext() {
    this.cargarUsuarios(this.currentPage + 1)
  }
}
