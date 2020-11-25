import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss']
})
export class HomeGuestComponent implements OnInit {

  public parameter:string;

  constructor(private _generalService:GeneralService) {
    this.parameter = '';
   }
  ngOnInit(): void {
  }

  search(event:any){
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

}
