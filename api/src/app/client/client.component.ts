import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Client } from './client';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientid  :number;
  [x: string]: any;
  public client?:Client[];
  public editclient?:Client;
  searchText?:string='';
  term!:string;
  p?:number=1;
  currentTutorial = null;
  currentIndex = -1;
  page =0;
  iteamNumbers=1;
  params:any
  pageSize = 2;
  pageSizes = [2, 4, 6,12,20,30,100];
  clients!:any
  clientParPage:any;




  handlePageSizeChange(event:any) {
     this.pageSize = event.target.value;
     console.log(this.pageSize );
     this.iteamNumbers=this.pageSize;
    // this.page = 0;
    this.retrieveTutorials();
  }


  




  
formgroup=this.fb.group({
    libelle:[,Validators.required],
    secteur:[,Validators.required],
    active:[,Validators.required],
    id:[,Validators.required]


  });
  
  constructor( private clientService : ClientService,private fb:FormBuilder ,private activateRoute:ActivatedRoute ) {
    this.clientid=activateRoute.snapshot.params['id'];  
   }

  ngOnInit(): void {
   this.getClient();
   this.retrieveTutorials();
  }
  retrieveTutorials() {
      console.log(this.pageSize);
      this.clientService.getapp(this.page,this.pageSize).subscribe(
      response => {
        // const { tutorials, totalItems } = response;
        this.clients = response;
        // console.log(this.currentAppliance);
        this.clientParPage=this.clients.content
        // this.count = totalItems;
        console.log(this.clients.content);
      },
      error => {
        console.log(error);
      });
      
      
    }
    getPdf(){
      
        this.clientService.getPDF().subscribe(data=>{
          console.log(data);
      
          
          const file = new Blob([data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          
        })
    }


  getApp(){
    this.clientService.getapp(this.page,this.pageSize).pipe().subscribe(data=>{
      console.log(data);
      
    })
  }


  public getClient() :void{
    this.clientService.getClient().subscribe(
      (reponse : Client[])=>{
        this.client= reponse;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  

  }


  public onOpenModel(client : Client | null  ,mode :string){
    console.log(client);
    const container=document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','model');
    if(mode==='add'){
      button.setAttribute('data-target','#addClientModal');
      
    }
    if(mode==='edit'){
     
      button.setAttribute('data-target','#editClientModal');
      console.log(client);
     

      this.formgroup.patchValue({
        libelle: client?.libelle,
        secteur:client?.secteur,
        active:client?.active,
        id:client?.id
     });
      this.formgroup.get('libelle')?.setValue(client?.libelle);
      this.formgroup.get('secteur')?.setValue(client?.secteur);
       this.formgroup.get('active')?.setValue(client?.active);
 

    
      
    }

    if(mode==='delete'){
      button.setAttribute('data-target','#deleteClientModal');
      this.formgroup.patchValue({

        id:client?.id
     });
    }
    container?.appendChild(button);
    button.click();


  }


  public onAddClient():void{
    // console.log(this.formgroup.value);
    this.clientService.addClient(this.formgroup.value).subscribe(
    (response : Client) =>{
      console.log(response);
      this.getClient();
      this.formgroup.reset(); 

    },

    (error : HttpErrorResponse) =>{
      console.log(error.message);
    }
   
    ); 
  }
  public onUpdateClient():void{
    
    this.clientService.updateClient(this.formgroup.value,this.formgroup.get('id')?.value).subscribe(
      data=>{
        this.getClient();
        this.formgroup.reset();
      });
  }
  public ondelete():void{
    this.clientService.deleteClient(this.formgroup.get('id')?.value).subscribe(
      data=>{
      
        this.getClient();
        
      }
    );

}
// public searchClient(key:string):void{
//   const resultat:Client[]=[];
//   for(const c of this.client!){

//     if(c.active.toLowerCase.indexOf(key.toLowerCase())!==-1 
//     ||c.libelle.toLowerCase.indexOf(key.toLowerCase())!==-1 
//     || c.secteur.toLowerCase.indexOf(key.toLowerCase())!==-1 ){
//               resultat.push(c);
//     }
//   }
//   this.client=resultat;
//   if(resultat.length ===0 || !key){
//     this.getClient();
//   }
// }
  
}

