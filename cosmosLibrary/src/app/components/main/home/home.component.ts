import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
