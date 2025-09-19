import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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

  getById(id: number) : Promise<any> {
    return lastValueFrom(this.htttpClient.get<any>(`${this.baseUrl}${id}`))
  }
}
