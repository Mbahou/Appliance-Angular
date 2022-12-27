import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Client } from './client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerurl=environment.apiBaseUrl;
  httpOptions = {
    responseType: 'arraybuffer' as 'json'
    // 'responseType'  : 'blob' as 'json'        //This also worked
  };



  constructor(private http: HttpClient) { }

  
  public getClient(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerurl}/Client/afficher`);
  }
  public addClient(client: Client): Observable<Client>{
    console.log(client);
    return  this.http.post<Client>(`${this.apiServerurl}/Client/ajouter`,client);
  }
  public updateClient(client : Client,id:number) :Observable<Client>{
    return this.http.put<Client>(`${this.apiServerurl}/Client/update/`+id,client);
  }
  public deleteClient(clientid: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerurl}/Client/delete/`+clientid);
  }
  public getClientbyid(clientId :number) : Observable<Client>{
      return this.http.get<Client>(`${this.apiServerurl}/Client/afficherbyid/`+clientId);

  }
  public getapp(pageNum:number,pageSize:number):Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerurl}/Client/page/`+pageNum+"/"+pageSize)

  }
  public getPDF():Observable<any>{
    return this.http.get<any>(this.apiServerurl+"/Client/afficherClientPdf",this.httpOptions);
  }
  
}
