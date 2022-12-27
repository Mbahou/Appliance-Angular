import { Component, OnInit } from '@angular/core';
import { SuiviService } from './../service/suivi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Suivi } from '../model/suivi';
import { HttpErrorResponse } from '@angular/common/http';
import { Typeprestation } from './../model/type_prestation';
import { Pov } from './../model/POV';
import { take } from 'rxjs';


@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {      
  suivi?:Suivi[];
  suiviId?:number;
  formgroup!:FormGroup;
  term!:string;
  typeprestation?:any;
  pov:any;
  p:number=1;
  page =0;
  iteamNumbers=2;
  params:any
  pageSize = 2;
  pageSizes = [2,3,6,9,12,20,30,100];
  suivis!:any
  suiviParPage:any;




  handlePageSizeChange(event:any) {
     this.pageSize = event.target.value;
     console.log(this.pageSize );
     this.iteamNumbers=this.pageSize;
     this.retrieveTutorials();
  }

  constructor(private suiviService:SuiviService,private fb:FormBuilder,private activateRoute:ActivatedRoute) { 
    this.suiviId=activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getSuivi();
    this.getTypePrestation();
    this.getPov();
    this.retrieveTutorials();


    this.formgroup=this.fb.group({
      offre_Commercial:[,Validators.required],
      montont:[,Validators.required],
      compterendu:[,Validators.required],
      id:[,Validators.required],
      typeprestation:[,Validators.required],
      pov:[,Validators.required]
    })
  }
  retrieveTutorials() {
    console.log(this.pageSize);
    this.suiviService.getApp(this.page,this.pageSize).subscribe(
    response => {
      this.suivis = response;
      this.suiviParPage=this.suivis.content
      console.log(this.suivis.content);
    },
    error => {
      console.log(error);
    });
    
    
  }
  getApp(){
    this.suiviService.getApp(this.page,this.pageSize).pipe(take(1)).subscribe((data)=>{
      console.log(data);
    })

}
getPdf(){
  this.suiviService.getPDF().subscribe(data=>{
    console.log(data);

    
    const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    
  })
}
  public getPov():void{
    this.suiviService.getPov().subscribe(
      (reponse:Pov)=>{
        this.pov=reponse;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      } 
    );

  }
  public getTypePrestation():void{
    this.suiviService.getTypeprestation().subscribe(
      (reponse : Typeprestation) => {
        this.typeprestation = reponse;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      } 
    );
  }
  public getSuivi():void{
    this.suiviService.getSuivi().subscribe(
      (reponse:Suivi[])=>{
        this.suivi=reponse;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public onOpenModel(suivi: Suivi | null  ,mode :string){
    console.log(suivi);
    const container=document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','model');
    if(mode==='add'){
    console.log(this.formgroup.value.id);
      button.setAttribute('data-target','#addsuiviModal');
      
    }
    if(mode==='edit'){
      button.setAttribute('data-target','#editsuiviModal');
      // console.log(appliance);
     
      this.formgroup.patchValue({
        offre_Commercial:suivi?.offre_Commercial,
        montont:suivi?.montont,
        compterendu:suivi?.compterendu,
        id:suivi?.id,
        typeprestation:suivi?.typeprestation,
        pov:suivi?.pov
        
      });
     
      // console.log(this.formgroup.value.id);    
    
    }
  

    if(mode==='delete'){
      button.setAttribute('data-target','#deletesuiviModal');
      
      this.formgroup.patchValue({
        id:suivi?.id
      });
    }
    container?.appendChild(button);
    button.click();
  
  }
  public onAdd():void{
    this.suiviService.addSuivi(this.formgroup.value).subscribe(
      (reponse:Suivi)=>{
        this.getSuivi();
        this.formgroup.reset();
      }
    );
  }
  public onUpdate():void{
    this.suiviService.updateSuivi(this.formgroup.value,this.formgroup.value.id).subscribe(
      data=>{
        this.getSuivi();
        this.formgroup.reset();

      }
    );
  }
  public ondelete():void{
    this.suiviService.deleteSuivi(this.formgroup.value.id).subscribe(
      data=>{
        this.getSuivi();
      }
    );
  }

}
