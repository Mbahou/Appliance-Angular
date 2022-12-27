import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplianceComponent } from './appliance/appliance.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';
import { PovComponent } from './pov/pov.component';
import { SeanceComponent } from './seance/seance.component';
import { SuiviComponent } from './suivi/suivi.component';

const routes: Routes = [
  {path : "" ,component :ApplianceComponent },
  {path :"Contact",component:ContactComponent},
  {path : "Client" ,component:ClientComponent},
  {path :"Pov",component:PovComponent},
  {path:"Seance",component:SeanceComponent},
  {path:"Suivi",component:SuiviComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
