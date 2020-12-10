import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-refounds',
  templateUrl: './refounds.component.html',
  styleUrls: ['./refounds.component.scss']
})
export class RefoundsComponent implements OnInit {

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService) { }

  ngOnInit(): void {
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

}
