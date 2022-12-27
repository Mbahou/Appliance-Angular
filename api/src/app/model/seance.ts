import { Pov } from './POV';
export interface Seance{


    id:number;
    dateseance:Date;
    resumer:string;
    participant:string;
    povdto:Pov;

}