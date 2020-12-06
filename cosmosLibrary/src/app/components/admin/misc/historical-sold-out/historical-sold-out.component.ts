import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-historical-sold-out',
  templateUrl: './historical-sold-out.component.html',
  styleUrls: ['./historical-sold-out.component.scss']
})
export class HistoricalSoldOutComponent implements OnInit {

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
