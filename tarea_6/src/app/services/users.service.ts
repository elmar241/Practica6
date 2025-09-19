import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse, IUser } from '../interfaces/iuser.interfaces';

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

  getById(id: number) : Promise<any> {
    return lastValueFrom(this.htttpClient.get<any>(`${this.baseUrl}${id}`))
  }
}
