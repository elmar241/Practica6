import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() idUser : string = ""
  userService = inject(UsersService)
  router = inject(Router)
  user?: IUser

  async ngOnInit() {
    try {
      this.user = await this.userService.getById(this.idUser)

    } catch (msg: any) {
      console.log(msg.error)
    }
  }

  confirmDelete(idUser: string) {
    toast.warning(`¿Seguro que quieres borrar a ${this.user?.first_name}?`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          const response: any = await this.userService.remove(idUser);
          if (!response.error) {
            toast.error("Usuario borrado correctamente");
            this.router.navigateByUrl("/home");
          } else {
            toast.error(response.error);
          }
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          toast.info("Operación cancelada");
        }
      },
      duration: 5000
    });
  }
}
