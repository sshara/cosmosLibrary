import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private _generalService:GeneralService) { }

  ngOnInit(): void {
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

}
