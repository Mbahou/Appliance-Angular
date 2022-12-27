import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seance } from './../model/seance';
import { environment } from 'src/environments/environment';
import { Pov } from './../model/POV';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private apiServerurl=environment.apiBaseUrl;
  httpOptions = {
    responseType: 'arraybuffer' as 'json'
    // 'responseType'  : 'blob' as 'json'        //This also worked
  };

  constructor(private http:HttpClient) { }


  public getSeance() : Observable<Seance[]>{
    return this.http.get<Seance[]>(this.apiServerurl+"/Seance/afficherALL");
  }



  public addSeance(seance: Seance): Observable<Seance>{      
    console.log(seance);
    return  this.http.post<Seance>(this.apiServerurl+"/Seance/ajouter",seance); 
  }



  public updateseance(seance: Seance,id:number) :Observable<Seance>{
    return this.http.put<Seance>(this.apiServerurl+"/Seance/update/"+id,seance);
  }



  public deleteSeance(seanceId: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerurl}/Seance/delete/`+seanceId);  
  }


  public getPov():Observable<Pov>{
    return this.http.get<Pov>(this.apiServerurl+"/POV/afficherall");
  }

  
  public getPovbyid(povid: number):Observable<Seance>{
    return this.http.get<Seance>(this.apiServerurl+"/POV/afficherbyid/"+povid);
  }
  public getApp(pageNum:Number,pageSize:number):Observable<Seance[]>{
    return this.http.get<Seance[]>(this.apiServerurl+"/Seance/page/"+pageNum+"/"+pageSize);
  }
  public getPDF():Observable<any>{
    return this.http.get<any>(this.apiServerurl+"/Seance/afficherseancePdf",this.httpOptions);
  }
}
