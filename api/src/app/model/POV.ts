import { Appliance } from './Appliance';
import { Client } from './../client/client';
export interface Pov{
    id:number;
    date_debut:Date;
    date_fin:Date;
    description:string;
    compte_manager:string;
    ingenieur_cybersecurite:string;
    analyse_cybersecurite:string;
    libelle_pov:string;
    appliancedto:Appliance;
    clientdto:Client;

}