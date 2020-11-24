import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  constructor(private _generalService:GeneralService) { }

  ngOnInit(): void {
  }

  

  goTo(route:string){
    this._generalService.goTo(route);
  }


}
