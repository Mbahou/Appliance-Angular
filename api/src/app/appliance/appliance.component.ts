import { Component, OnInit, ViewChild } from '@angular/core';
import { Appliance } from '../model/Appliance';
import { ApplianceService } from './../service/appliance.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Type } from './../model/type';
// import { Appliance } from './../model/Appliance';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css']
})
export class ApplianceComponent implements OnInit {
  appliance:any;
  currentAppliance?:Appliance[];
  formgoup!:FormGroup;
  applianceId?:number;
  term!:string;
  type?:Type[];
  p:number=1;
  page = 0;
  iteamNumbers=3;
  params:any
  // count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9,20,40,70,100];
  appliances!:any
  applianceParPage:any;

handlePageSizeChange(event:any) {
  this.pageSize = event.target.value;
  console.log(this.pageSize );
  this.iteamNumbers=this.pageSize;
  // this.page = 0;
  this.retrieveTutorials();
}



  // ELEMENT_DATA:Appliance[]=[];
  // isLoading=false;
  // totalRows=0;
  // pageSize=5;
  // currentPage=0;
  // pageSizeOptions:number[]=[3,16,25,100];
  // displayedColumns:string[]=['libelle','DBID','Disponibilite','Reference','type_id']

  // dataSource:MatTableDataSource<Appliance>=new MatTableDataSource();
  // @ViewChild(MatPaginator)
  // paginator!:MatPaginator;


  constructor(private applianceService :ApplianceService,private fb:FormBuilder,private activateRout:ActivatedRoute) {
    this.applianceId=activateRout.snapshot.params['id'];

   }
  //  getRequestParams( page, pageSize) {
  //   // tslint:disable-next-line:prefer-const
  //   let params = {};

  //   if (page) {
  //     params[`page`] = page - 1;
  //   }
  //   if (pageSize) {
  //     params[`size`] = pageSize;
  //   }
  //   return params;
  // }
//    ngAfterViewInit(){
//     this.dataSource.paginator=this.paginator;
//    }
//    loadData(){
//     this.isLoading=true;
//     this.applianceService.getApp(this.currentPage,this.pageSize).subscribe(data=>{
//       this.dataSource.data = data;
//       setTimeout(() => {
//       this.paginator.pageIndex=this.currentPage;
      
//     });
//     this.isLoading=false;
//   });
// }
// pageChanged (event: PageEvent) {
//   console.log({ event }) ;
//   this.pageSize=event.pageSize;
//   this.currentPage=event.pageIndex;
//   this.loadData();
  
// }
retrieveTutorials() {
  // const params = this.getRequestParams(this.title, this.page, this.pageSize);
  // const params ='';
  
  console.log(this.pageSize);
  
  this.applianceService.getApp(this.page,this.pageSize)
    .subscribe(
      response => {
        // const { tutorials, totalItems } = response;
        this.appliances = response;
        // console.log(this.currentAppliance);
        this.applianceParPage=this.appliances.content
        // this.count = totalItems;
        console.log(this.appliances.content);
      },
      error => {
        console.log(error);
      });
}

getApp(){
  this.applianceService.getApp(this.page,this.pageSize).pipe(take(1)).subscribe(data=>{
    console.log(data);
    
  })
}
getPdf(){
  this.applianceService.getPDF().subscribe(data=>{
    console.log(data);

    
    const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    
  })

}
// imprimer()
// {
//   this.applianceService.getPDF().subscribe((response)=>{
//     const file = new Blob([response], { type: 'application/pdf' });
//     const fileURL = URL.createObjectURL(file);
//     window.open(fileURL);

//   })

// }



  public getAppliace():void{
    this.applianceService.getAppliance().pipe(take(1)).subscribe(
      (reponse: Appliance[])=>{
        this.appliance=reponse;
        console.log(reponse);
        
      },
        (error:HttpErrorResponse)=>{
         alert(error.message);
       }
     );
      }
      public getType():void{
        this.applianceService.getType().subscribe(

          (data : Type[])=>{
            this.type=data;

          },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }

        );

      }
      handlePageChange(event:any) {
        this.page = 0
        console.log("qsdqsd",this.page);
        
        this.retrieveTutorials();
      }

  ngOnInit(): void {
    // this.getAppliace();
    this.getType();

    this.retrieveTutorials();
   

    this.formgoup=this.fb.group({
      libelle:[,Validators.required],
      dbid:[,Validators.required],
      disponibilite:[,Validators.required],
      ref:[,Validators.required],
      id:[,Validators.required],
      typedto:[,Validators.required]
      

  })
   console.log(this.formgoup.value.id);    

  }
  public onOpenModel(appliance: Appliance | null  ,mode :string){
    console.log(appliance);
    const container=document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','model');
    if(mode==='add'){
    console.log(this.formgoup.value.id);
      button.setAttribute('data-target','#addApplianceModal');
      
    }
    if(mode==='edit'){
      button.setAttribute('data-target','#editApplianceModal');
      console.log(appliance);
     
      this.formgoup.patchValue({
        libelle:appliance?.libelle,
        dbid:appliance?.dbid,
        disponibilite:appliance?.disponibilite,
        ref:appliance?.ref,
        id:appliance?.id,
        typedto:appliance?.typedto
        
      });
     
      console.log(this.formgoup.value.typedto);    
    
    }
  

    if(mode==='delete'){
      button.setAttribute('data-target','#deleteApplianceModal');
      
      this.formgoup.patchValue({
        id:appliance?.id
      });
    }
    container?.appendChild(button);
    button.click();
  
  }
 public addApppliance():void {

   this.applianceService.addAppliance(this.formgoup.value).subscribe(
     (reponse:Appliance)=>{
       this.getAppliace();
       
     },
     (error : HttpErrorResponse) =>{
      console.log(error.message);
    }
   
    ); 
   

 }
 public onUpdate():void{
   this.applianceService.updateAppliance(this.formgoup.value,this.formgoup.value.id).subscribe(
     data=>{
       console.log(this.formgoup.value.id);
       this.getAppliace();
       this.formgoup.reset();
     }
   )
 }
 public onDelete():void{
   this.applianceService.deleteAplliance(this.formgoup.value.id).subscribe(
     data=>{
       this.getAppliace();
     }
   )
 }

 

   
 }


