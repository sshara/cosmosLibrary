import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  public shopping:any;
  public bookings:any;
  private _subscription:Subscription;

  constructor(
    private _generalService:GeneralService,
    private _clientService: ClientService) 
    { 
      this.shopping = [];
      this.bookings = [];
    }

  ngOnInit(): void {
    this.getShopping();
    this.getbookings();
  }

  getbookings(){
    let subscripBooks = this._clientService.getbookings().subscribe(books => {
      this.bookings = books;
    });
    this._subscription.add(subscripBooks);
  }

  getShopping(){
    this._subscription = this._clientService.getShopping().subscribe(books => {
      this.shopping = books;
    });
  }

  buyItem(item:any){
    this._clientService.buyItems([item], item.price);
  }

  requestRefound(item:any){
    this._clientService.requestRefound(item, "solicito la devolucion del dinero");
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }


}
