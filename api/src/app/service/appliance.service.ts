import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appliance } from './../model/Appliance';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Type } from '@angular/compiler';
import { Type } from './../model/type';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {
  private apiServerurl=environment.apiBaseUrl;

   httpOptions = {
    responseType: 'arraybuffer' as 'json'
    // 'responseType'  : 'blob' as 'json'        //This also worked
  };

  constructor(private http :HttpClient) { }


  public getAppliance() : Observable<Appliance[]>{
    return this.http.get<Appliance[]>(this.apiServerurl+"/appliance/ApplianceAfficher");
  }

  public getApp(pageNum:number, pageSize:number) : Observable<Appliance[]>{
    return this.http.get<Appliance[]>(this.apiServerurl+"/appliance/page/"+pageNum+"/"+pageSize);
  }


  public addAppliance(appliance: Appliance): Observable<Appliance>{
    console.log(appliance.id);
    return  this.http.post<Appliance>(this.apiServerurl+"/appliance/applianceajout",appliance);
  }



  public updateAppliance(appliance : Appliance,id:number) :Observable<Appliance>{
    return this.http.put<Appliance>(this.apiServerurl+"/appliance/modifierAppliance/"+id,appliance);
  }



  public deleteAplliance(applianceId: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerurl}/appliance/supprimerappliance/`+applianceId);
  }
  public getType(): Observable<Type[]>{
    return this.http.get<Type[]>(`${this.apiServerurl}/type/TypeAfficher`);

  }
  public getTypebyid(typeid: number): Observable<Type[]>{
    return this.http.get<Type[]>(`${this.apiServerurl}/type/TypeAfficher/`+typeid);
  }
  public getPDF():Observable<any>{
    return this.http.get<any>(this.apiServerurl+"/appliance/afficherAppliancePdf",this.httpOptions);
  }




}



 

