import { Component, OnInit,EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  entretedSearchValue:string='';

  @Output()
  searchTextChanged:EventEmitter<String>=new EventEmitter<String>();

  onSearchTextMethode(){
    this.searchTextChanged.emit(this.entretedSearchValue);


  }

}
