import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pov } from './../model/POV';
import { Observable } from 'rxjs';
import { Appliance } from './../model/Appliance';
import { Client } from './../client/client';

@Injectable({
  providedIn: 'root'
})
export class PovService {
  httpOptions = {
    responseType: 'arraybuffer' as 'json'
    
  };
  private apiServerurl=environment.apiBaseUrl;


  constructor(private http:HttpClient) { }

  public getpov() : Observable<Pov[]>{
    return this.http.get<Pov[]>(this.apiServerurl+"/POV/afficherall");
  }



  public addpov(pov: Pov): Observable<Pov>{
    //console.log(pov);
    return  this.http.post<Pov>(this.apiServerurl+"/POV/ajouter",pov);
  }



  public updatepov(pov : Pov,id:number) :Observable<Pov>{
    return this.http.put<Pov>(this.apiServerurl+"/POV/update/"+id,pov);
  }



  public deletepov(povId: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerurl}/POV/delete/`+povId);
  }


  public getAppliance(): Observable<Appliance>{
    return this.http.get<Appliance>(this.apiServerurl+"/appliance/ApplianceAfficher");
  }


  public getAppliancebyid(applianceid:number):Observable<Pov>{
    return this.http.get<Pov>(this.apiServerurl+"/appliance/ApplianceAfficherbyid/"+applianceid);
  }


  public getClient():Observable<Client>{
    return this.http.get<Client>(this.apiServerurl+"/Client/afficher");
  }

  public getClientbyId(clientid : number):Observable<Pov>{
    return this.http.get<Pov>(this.apiServerurl+"/client/afficherbyid/"+clientid)
  }
  public getApp(pageNum:number,pageSize:number):Observable<Pov[]>{
    return this.http.get<Pov[]>(`${this.apiServerurl}/POV/page/`+pageNum+"/"+pageSize);
  }
  public getPDF():Observable<any>{
    return this.http.get<any>(this.apiServerurl+"/POV/afficherpovPdf",this.httpOptions);
  }

  }



