import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GeneralService } from 'src/app/services/system/general.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-refounds',
  templateUrl: './refounds.component.html',
  styleUrls: ['./refounds.component.scss']
})
export class RefoundsComponent implements OnInit, OnDestroy {

  public refounds:any[];
  private _subscription:Subscription;
  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService) {
      this.refounds = [];
     }

  ngOnInit(): void {
    this.getRefounds();
  }

  getRefounds(){
    this._subscription = this._adminService.getRefounds().subscribe(refounds =>{
      this.refounds = refounds;
    })
  }

  resolveRefound(resolve:number){}

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  ngOnDestroy(){
    if(this._subscription) this._subscription.unsubscribe();
  }

}
