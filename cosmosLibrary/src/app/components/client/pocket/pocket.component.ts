import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss']
})
export class PocketComponent implements OnInit {

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
