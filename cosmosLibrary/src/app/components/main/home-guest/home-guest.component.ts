import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss']
})
export class HomeGuestComponent implements OnInit, OnDestroy {

  public parameter:string;
  public books:any[];
  public news:any[];
  private _subscription:Subscription;

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService,
    private _clientService:ClientService
  ) {
    this.parameter = '';
    this.books = [];
    this.news = [];
   }

  ngOnInit(): void {
    this.getNews();
    this.getBooks();
  }

  getBooks(){
    let subscripBooks = this._adminService.getBooks().subscribe(books => {
      this.books = books.filter(book => book.available_units != "0");
    });
    this._subscription.add(subscripBooks);
  }

  getNews(){
    this._subscription = this._clientService.getNews().subscribe(books => {
      this.news = books.filter(book => book.available_units != "0");
    });
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  addToCart(book){
    this._generalService.addItemToShoppingCart(book);
  }

  openshoppingcart(){
    this._generalService.openSnackBar({message:'Para ver tu carrito de compras, primero debes de inicar sesión.'});
    this.goTo('login');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
