import { Component, OnInit } from '@angular/core';
import { PovService } from '../service/pov.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pov } from './../model/POV';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Appliance } from '../model/Appliance';
import { Client } from './../client/client';
import { take } from 'rxjs';

@Component({
  selector: 'app-pov',
  templateUrl: './pov.component.html',
  styleUrls: ['./pov.component.css']
})
export class PovComponent implements OnInit {
  pov?:Pov[];
  formgroup!:FormGroup;
  povId?:number;
  term!:string;
  appliance:any;
  client:any;
  p:number=1;
  page =0;
  iteamNumbers=1;
  params:any
  pageSize = 3;
  pageSizes = [3,6,9,12,20,30,100];
  povs!:any
  povParPage:any;




  handlePageSizeChange(event:any) {
     this.pageSize = event.target.value;
     console.log(this.pageSize );
     this.iteamNumbers=this.pageSize;
    // this.page = 0;
    this.retrieveTutorials();
  }

  constructor(private povService:PovService,private fb:FormBuilder,private activateRout:ActivatedRoute) { 
    this.povId=activateRout.snapshot.params['id'];
  }

  ngOnInit(): void {
     this.getPOV();
     this.getAppliance();
     this.getClient();
     this.retrieveTutorials()
     

     this.formgroup=this.fb.group({
       date_debut:[,Validators.required],
       date_fin:[,Validators.required],
       description:[,Validators.required],
       compte_manager:[,Validators.required],
       ingenieur_cybersecurite:[,Validators.required],
       analyse_cybersecurite:[,Validators.required],
       libelle_pov:[,Validators.required],
       id:[,Validators.required],
       appliancedto:[,Validators.required],
       clientdto:[,Validators.required]


     })
  }
  retrieveTutorials() {
    console.log(this.pageSize);
    this.povService.getApp(this.page,this.pageSize).subscribe(
    response => {
      // const { tutorials, totalItems } = response;
      this.povs = response;
      // console.log(this.currentAppliance);
      this.povParPage=this.povs.content
      // this.count = totalItems;
      console.log(this.povs.content);
    },
    error => {
      console.log(error);
    });
    
    
  }
  getPdf(){
    this.povService.getPDF().subscribe(data=>{
      console.log(data);
  
      
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      
    })
  }
  getApp(){
    this.povService.getApp(this.page,this.pageSize).pipe(take(1)).subscribe(data=>{
      console.log(data);

    })
  }
  public getAppliance():void{
    this.povService.getAppliance().subscribe(
      (reponse : Appliance)=>{
        this.appliance=reponse;
      }, (error:HttpErrorResponse)=>{
        alert(error.message);
      }

    );
  }
  public getClient():void{
    this.povService.getClient().subscribe(
      (reponse:Client)=>{
        this.client=reponse;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public getPOV():void{
    this.povService.getpov().subscribe(
      (reponse:Pov[])=>{
        this.pov=reponse;
        console.log(this.formgroup.value);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }


  public onOpenModel(pov: Pov | null  ,mode :string){
    console.log(pov);
    const container=document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','model');
    if(mode==='add'){
    console.log(this.formgroup.value);
      button.setAttribute('data-target','#addpovModal');
      
    }
    if(mode==='edit'){
      button.setAttribute('data-target','#editpovModal');
    
      this.formgroup.patchValue({
        date_debut:pov?.date_debut,
        date_fin:pov?.date_fin,
        description:pov?.description,
        compte_manager:pov?.compte_manager,
        ingenieur_cybersecurite:pov?.ingenieur_cybersecurite,
        analyse_cybersecurite:pov?. analyse_cybersecurite,
        libelle_pov:pov?.libelle_pov,
        id:pov?.id,
        appliancedto:pov?.appliancedto,
        clientdto:pov?.clientdto
        
      });
    //  console.log(pov?.id);
    //   console.log(this.formgroup.value.id);    
    
    }
  

    if(mode==='delete'){
      button.setAttribute('data-target','#deleteApplianceModal');
      
       this.formgroup.patchValue({
       id:pov?.id
     });
    }
    container?.appendChild(button);
    button.click();
  
  }
  public onadd():void{
    this.povService.addpov(this.formgroup.value).subscribe(
      (reponse:Pov)=>{
        this.getPOV();
        this.formgroup.reset();
      },
      (error : HttpErrorResponse) =>{
        console.log(error.message);
      }
    );
  }
  public onupdate():void{
    console.log(this.formgroup.value.id);
    this.povService.updatepov(this.formgroup.value,this.formgroup.value.id).subscribe(
      data=>{
        
        this.getPOV();
        this.formgroup.reset();
      }
    )
  }
  
  
  
  public onDelete():void{
    this.povService.deletepov(this.formgroup.value.id).subscribe(
      data=>{
        this.getPOV();
      }
    )
  }

}
