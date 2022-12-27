import { Typeprestation } from './type_prestation';
import { Pov } from './POV';
export interface Suivi{

    id:number;
    offre_Commercial :boolean;
    montont:Float32Array;
    compterendu:string;
    typeprestation:Typeprestation;
    pov:Pov;
}