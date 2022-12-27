import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './client.service';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ApplianceComponent } from './appliance/appliance.component';
import { PovComponent } from './pov/pov.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeanceComponent } from './seance/seance.component';
import { SuiviComponent } from './suivi/suivi.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule,  } from '@angular/material/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { DashbordComponent } from './dashbord/dashbord.component';
import { KeycloakService } from './service/keycloak.service';

// function initializeKeycloak(Keycloak:KeycloakService){
//   return()=>
//   Keycloak.init({
//     config:{
//       url: 'http:// localhost: 8080/auth',
//       realm:'appliance',
//       clientId:'Angular-app'

//     },
//     initOption:{
//       onload:'login-required',
//       flow:'standard'
//     },
//   });

  
// }






@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ContactComponent,
    NavBarComponent,
    ApplianceComponent,
    PovComponent,
    SeanceComponent,
    SuiviComponent,
    DashbordComponent,
   
  
    
    


  ],
  imports: [


    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SearchPipeModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
    NgxPaginationModule,
  ],
  providers: [
    // provide:APP_INITIALIZER,
    // useFactory:initializeKeycloak,
    // multi:true,
    // deps:[KeycloakService],
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
