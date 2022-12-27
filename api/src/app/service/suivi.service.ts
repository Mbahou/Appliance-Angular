import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Suivi } from './../model/suivi';
import { Observable, observable } from 'rxjs';

import { Typeprestation } from './../model/type_prestation';
import { Pov } from './../model/POV';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {
  private apiServerurl=environment.apiBaseUrl;
  httpOptions = {
    responseType: 'arraybuffer' as 'json'
   
  };

  constructor(private http:HttpClient) { }


  public getSuivi() : Observable<Suivi[]>{
    return this.http.get<Suivi[]>(this.apiServerurl+"/suivi/afficherAll");
  }



  public addSuivi(suivi: Suivi): Observable<Suivi>{
    console.log(suivi);
    return  this.http.post<Suivi>(this.apiServerurl+"/suivi/ajouter",suivi);
  }



  public updateSuivi(suivi : Suivi,id:number) :Observable<Suivi>{
    return this.http.put<Suivi>(this.apiServerurl+"/suivi/update/"+id,suivi);
  }



  public deleteSuivi(suiviId: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerurl}/suivi/delete/`+suiviId);
  }


  public getTypeprestation(): Observable<Typeprestation>{
    return this.http.get<Typeprestation>(this.apiServerurl+"/TypePrestation/afficherAll");
  }


  public getgetTypeprestationbyid(Typeprestationid: number):Observable<Suivi>{
    return this.http.get<Suivi>(this.apiServerurl+"/TypePrestation/afficherbyid/"+Typeprestationid);
  }

  public getPov():Observable<Pov>{
    return this.http.get<Pov>(this.apiServerurl+"/POV/afficherall");
  }

  public getPovbyid(povid:number):Observable<Suivi>{
    return this.http.get<Suivi>(this.apiServerurl+"/POV/afficherbyid/"+povid);
  }
  public getApp(pageNum:number,pageSize:number):Observable<Suivi[]>{
    return this.http.get<Suivi[]>(`${this.apiServerurl}/suivi/page/`+pageNum+"/"+pageSize);      
  }
  public getPDF():Observable<any>{
    return this.http.get<any>(this.apiServerurl+"/suivi/affichersuiviPdf",this.httpOptions);
  }



}
