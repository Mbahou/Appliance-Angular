import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Contact } from './../model/contact';
import { ContactService } from './../service/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client/client';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SeanceService } from './../service/seance.service';
import { take } from 'rxjs';


  



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
   contact?:Contact[];
   formgroup! :FormGroup;
   contactid?:number;
   client?: Client[];
   term!:string;
   p:number =1;
   currentTutorial = null;
  currentIndex = -1;
  page =0;
  iteamNumbers=1;
  params:any
  pageSize = 4;
  pageSizes = [4, 8, 12,20,30,100];
  contacts!:any
  contactParPage:any;




  handlePageSizeChange(event:any) {
    this.pageSize = event.target.value;
    console.log(this.pageSize );
    this.iteamNumbers=this.pageSize;
   // this.page = 0;
   this.retrieveTutorials();
 }
 




  constructor(private contactService:ContactService, private fb :FormBuilder,private activeteRoute :ActivatedRoute) { 
    this.contactid=activeteRoute.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.getContact();
    this.getClient();
    this. retrieveTutorials();

   

    
    this.formgroup=this.fb.group({
      nom:[,Validators.required],
      prenom:[,Validators.required],
      telephone:[,Validators.required],
      fonction:[,Validators.required],
      email:[,Validators.required],
      id:[,Validators.required],
      clientdto:[,Validators.required]
      // client:[,Validators.required]

    });
    
    
  }
  getPdf(){
    this.contactService.getPDF().subscribe(data=>{
      console.log(data);
  
      
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      
    })
  }
  retrieveTutorials( ) {
  console.log(this.pageSize);
  this. contactService.getApp(this.page,this.pageSize).subscribe(
      response => {
        // const { tutorials, totalItems } = response;
        this.contacts = response;
        // console.log(this.currentAppliance);
        this.contactParPage=this.contacts.content
        // this.count = totalItems;
        console.log(this.contacts.content);
      },
      error => {
        console.log(error);
      });
      
      
    }
  getApp(){
    this.contactService.getApp(this.page,this.pageSize).pipe(take(1)).subscribe(data=>{
      console.log(data);
      
    })
  }

  public getClient() :void{
    console.log("client");

    this.contactService.getClient().subscribe(
      (reponse : Client[])=>{
        this.client= reponse;
        console.log("client",this.client);
        
      },err=>
      (err:HttpErrorResponse)=>{
        alert(err.message);
      }
    );

  }
  public getContact():void{
    this.contactService.getContact().subscribe(
      (response:Contact[])=>{
        this.contact=response;
        console.log("qsQSqSqs",response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  
  public onOpenModel(contact: Contact | null  ,mode :string){
    console.log(contact);
    const container=document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','model');
    if(mode==='add'){
      console.log(this.formgroup.value.id);
      button.setAttribute('data-target','#addContactModal');
      
    }
    if(mode==='edit'){
      button.setAttribute('data-target','#editContactModal');
      console.log(contact?.id);
     
      this.formgroup.patchValue({
        nom:contact?.nom,
        prenom:contact?.prenom,
        telephone:contact?.telephone,
        fonction:contact?.fonction,
        email:contact?.email,
        id:contact?.id,
        clientdto:contact?.clientdto
        
      })
     
        console.log(this.formgroup.value.id);
    
    }
    if(mode==='delete'){
      button.setAttribute('data-target','#deleteContactModal');
      
      this.formgroup.patchValue({
        id:contact?.id
     });
    }
    container?.appendChild(button);
    button.click();



 }
 public addContact():void{
  console.log("value", this.formgroup.value);
  
   this.contactService.addContact(this.formgroup.value).subscribe(
     (response:Contact)=>{
      console.log("data",response);
      
       this.getContact();
      //  this.formgroup.reset();

     },
     
    (error : HttpErrorResponse) =>{
      console.log(error.message);
    }
   
    ); 

 }
 public onUpdate():void{
   console.log(this.formgroup.value);
   this.contactService.updateContact(this.formgroup.value,this.formgroup.value.id).subscribe(
     data=>{
       this.getContact();
       this.formgroup.reset();
     }
   )
 }
 public ondelete():void{
   this.contactService.deleteContact(this.formgroup.get('id')?.value).subscribe(
     data=>{
       this.getContact();
     }
   );
 }
}

