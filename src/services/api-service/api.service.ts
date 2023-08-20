import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService:HttpClient) { }

  

  baseUrl:string ="https://localhost:7166/api/User/GetAllUser"

  getAllUser()
  {
    return this.httpService.get<any[]>(this.baseUrl)
  }
}
