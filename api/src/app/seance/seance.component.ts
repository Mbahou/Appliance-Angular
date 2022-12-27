import { Component, OnInit } from '@angular/core';
import { Seance } from '../model/seance';
import { SeanceService } from './../service/seance.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Pov } from './../model/POV';
import { take } from 'rxjs';

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
})
export class SeanceComponent implements OnInit {
  seance?:Seance[];
  formgroup!:FormGroup;
  seanceId?:number;
  term!:string;
  pov:any;
  p?:number=1;
  page =0;
  iteamNumbers=4;
  params:any
  pageSize = 4;
  pageSizes = [4, 6,12,20,30,100];
  seances!:any
  seanceParPage:any;

  handlePageSizeChange(event:any) {
    this.pageSize = event.target.value;
    console.log(this.pageSize );
    this.iteamNumbers=this.pageSize;
   // this.page = 0;
   this.retrieveTutorials();
 }

  constructor(private seanceService:SeanceService,private fb:FormBuilder,private activateRoute:ActivatedRoute) { 
    this.seanceId=activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getSeance();
    this.getPov();
    this.retrieveTutorials()
    

    this.formgroup=this.fb.group({
      dateseance:[,Validators.required],
      resumer:[,Validators.required],
      participant:[,Validators.required],
      id:[,Validators.required],
      povdto:[,Validators.required]

    })

  }
  getPdf(){
    this.seanceService.getPDF().subscribe(data=>{
      console.log(data);
  
      
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      
    })
  
  }
  
  retrieveTutorials() {
    console.log(this.pageSize);
    this.seanceService.getApp(this.page,this.pageSize).subscribe(
    response => {
      // const { tutorials, totalItems } = response;
      this.seances = response;
      // console.log(this.currentAppliance);
      this.seanceParPage=this.seances.content
      // this.count = totalItems;
      console.log(this.seances.content);
    },
    error => {
      console.log(error);
    });
    
    
  }
  public getApp(){
    this.seanceService.getApp(this.page,this.pageSize).pipe(take(1)).subscribe(data=>{
      console.log(data);
    });
  }




  public getPov():void{
    this.seanceService.getPov().subscribe(
      (reponse:Pov)=>{
        this.pov=reponse;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );

  }
  public getSeance():void{
    this.seanceService.getSeance().subscribe(
      (reponse:Seance[])=>{
        this.seance=reponse;
      
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public onOpenModel(seance: Seance | null  ,mode :string){
    console.log(seance);
    const container=document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','model');
    if(mode==='add'){
      button.setAttribute('data-target','#addseanceModal');
      
    }
    if(mode==='edit'){
      button.setAttribute('data-target','#editseanceModal');
      console.log(seance);
     
      this.formgroup.patchValue({
        dateseance:seance?.dateseance,
        resumer:seance?.resumer,
        participant:seance?.participant,
        id:seance?.id,
        povdto:seance?.povdto
        
      });
     
      console.log(this.formgroup.value.id);    
    
      
    }

    if(mode==='delete'){
      button.setAttribute('data-target','#deleteseanceModal');
      
      this.formgroup.patchValue({
        id:seance?.id
      });
    }
    

    container?.appendChild(button);
    button.click();
  
  }
  public onAdd():void{
    this.seanceService.addSeance(this.formgroup.value).subscribe(
      (reponse:Seance)=>{
        this.getSeance();
        this.formgroup.reset();
      }
    )
  }
  public onUpdate():void{
    this.seanceService.updateseance(this.formgroup.value,this.formgroup.value.id).subscribe(
      data=>{
        this.getSeance();
        this.formgroup.reset();
      }
    )
  }
  public onDelete():void{
    this.seanceService.deleteSeance(this.formgroup.value.id).subscribe(
      data=>{
        this.getSeance();
      }
    )
  }
}

     
