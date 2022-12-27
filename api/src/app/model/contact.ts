import { Client } from './../client/client';
export interface Contact{
    id :number; 
    nom:string;
    prenom:string;
    telephone:string;
    fonction:string;
    email:string;
    clientdto: Client;
    

}