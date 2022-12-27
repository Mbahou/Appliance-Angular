import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './../model/contact';
import { HttpClient } from '@angular/common/http';
import { Client } from '../client/client';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  httpOptions = {
    responseType: 'arraybuffer' as 'json'
    // 'responseType'  : 'blob' as 'json'        //This also worked
  };
  readonly apiServerurl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getContact(): Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.apiServerurl}/Contact/affichet`);
  }



  public addContact(contact: Contact): Observable<Contact>{
    // console.log(contact);
    // return  this.http.post<Contact>(`${this.apiServerurl}/Contact/ajouter`,contact);
    return  this.http.post<Contact>(this.apiServerurl+'/Contact/ajouter',contact);
  }



  public updateContact(contact : Contact,id:number) :Observable<Contact>{
    return this.http.put<Contact>(`${this.apiServerurl}/Contact/update/`+id,contact);
  }



  public deleteContact(clientid: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerurl}/Contact/delete/`+clientid);
  }

  // getClients

  public getClient(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerurl}/Client/afficher`);
  }
  public getClientbyid(clientId :number) : Observable<Contact>{
       return this.http.get<Contact>(`${this.apiServerurl}/Client/afficherbyid/`+clientId);

   }
  public getApp(pageNum:number,pageSize:number):Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.apiServerurl}/Contact/page/`+pageNum+"/"+pageSize);
  }
  public getPDF():Observable<any>{
    return this.http.get<any>(this.apiServerurl+"/Contact/affichercontactPdf",this.httpOptions);
  }
  
}
  



