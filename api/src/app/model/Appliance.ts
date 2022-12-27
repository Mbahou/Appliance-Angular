import { Type } from "./type";

export interface Appliance{
    id:number;
    libelle:string;
    dbid:String;
    disponibilite:boolean;
    ref:string;
    typedto:Type;
    
}