import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss']
})
export class HomeGuestComponent implements OnInit, OnDestroy {

  public parameter:string;
  public amount:any;
  public books:any[];
  public news:any[];
  private subscripBooks: any;
  private subscripNews: any;

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService,
    private _clientService:ClientService
  ) {
    this.parameter = '';
    this.books = [];
    this.news = [];
    this.amount = 0;
   }

  ngOnInit(): void {
    this.getShoppingCartInfo();
    this.getNews();
    this.getBooks();
  }

  getShoppingCartInfo(){
    let subscription = this._generalService.shoppingCartValue.subscribe(shoppingCart =>{
      this.amount = Object.keys(shoppingCart.items).length;
    })
  }

  getBooks(){
    this.subscripBooks = this._adminService.getBooks().subscribe(books => {
      this.books = books;
    })
  }

  getNews(){
    this.subscripNews = this._clientService.getNews().subscribe(books => {
      this.news = books;
    })
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
    this.subscripBooks.unsubscribe();
    this.subscripNews.unsubscribe();
  }

}
