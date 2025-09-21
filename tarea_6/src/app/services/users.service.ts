import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse, IUser } from '../interfaces/iuser.interfaces';
import { __disposeResources } from 'tslib';

type IError =  {
  error: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private htttpClient = inject(HttpClient)
  private baseUrl: string = 'https://peticiones.online/api/users/'

  getAllPromises(url: string) : Promise <any> {
    const miUrl = (url === "") ? this.baseUrl : url
    return lastValueFrom(this.htttpClient.get<any>(miUrl))
  }

  getById(idUser: string) : Promise<IUser> {
    return lastValueFrom(this.htttpClient.get<IUser>(`${this.baseUrl}${idUser}`))
  }

  // Registrar un nuevo usuario utilizamos post
  insert(user: IUser) : Promise<IUser> {
    return lastValueFrom(this.htttpClient.post<IUser>(this.baseUrl, user))
  }

  // metodo para borrar un empleado
  remove(idUser: string) : Promise<IUser | IError> {
    return lastValueFrom(this.htttpClient.delete<IUser | any>(`${this.baseUrl}${idUser}`))
  }

  update(user: IUser): Promise<IUser>{
    let { _id, ...restUser } = user
    return lastValueFrom(this.htttpClient.put<IUser>(`${this.baseUrl}/${_id}`, restUser))
  }
}
