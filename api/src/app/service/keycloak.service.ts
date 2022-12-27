import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  [x: string]: any;
  init:any;

  constructor() { }
}
