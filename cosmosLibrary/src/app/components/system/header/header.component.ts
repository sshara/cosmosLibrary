import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _generalService:GeneralService) { }

  ngOnInit(): void {
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

}
