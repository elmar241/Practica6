import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IError, IUser } from '../../interfaces/iuser.interfaces';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';

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

    confirmDelete(idUser: string) {
    toast.warning(`¿Seguro que quieres borrar a ${this.miUser.first_name}?`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          const response: any = await this.usersService.remove(idUser);
          if (!response.error) {
            this.deleteUserEmit.emit('Usuario borrado correctamente');
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

