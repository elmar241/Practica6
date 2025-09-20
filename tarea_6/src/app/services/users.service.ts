import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse, IUser } from '../interfaces/iuser.interfaces';
import { InjectSetupWrapper } from '@angular/core/testing';

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

  login(user: IUser) : Promise<IResponse | IError> {
    return lastValueFrom(this.htttpClient.post<any>(`${this.baseUrl}/login`, user))
  }

  getById(_id: string) : Promise<IUser> {
    return lastValueFrom(this.htttpClient.get<IUser>(`${this.baseUrl}${_id}`))
  }

  // Registrar un nuevo usuario utilizamos post
  insert(user: IUser) : Promise<IUser> {
    return lastValueFrom(this.htttpClient.post<IUser>(this.baseUrl, user))
  }
}
