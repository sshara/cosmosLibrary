import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-historical-sold-out',
  templateUrl: './historical-sold-out.component.html',
  styleUrls: ['./historical-sold-out.component.scss']
})
export class HistoricalSoldOutComponent implements OnInit, OnDestroy {

  public soldouts:any[];
  private subscripSoldout: any;

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService) { 

      this.soldouts = [];
    }

  ngOnInit(): void {
    this.getSoldouts();
  }

  getSoldouts(){
    this.subscripSoldout = this._adminService.getSoldout().subscribe(books => {
      this.soldouts = books;
      console.log(books);
    })
  }

  editBook(book:any){
    let {isbn, title} = book;
    this._generalService.saveInfo('book', {isbn, title});
    this.goTo('edit-book');
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  ngOnDestroy(): void {
    this.subscripSoldout.unsubscribe();
  }

}
