import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss']
})
export class HomeGuestComponent implements OnInit {

  public parameter:string;
  public books:any[];

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService
  ) {
    this.parameter = '';
    this.books = [];
   }

   ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    let subscription = this._adminService.getBooks().subscribe(books => {
      this.books = books;
      subscription.unsubscribe();
    })
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  addToCart(book){
    this._generalService.addItemToShoppingCart(book);
  }

  openshoppingcart(){
    this._generalService.openSnackBar({message:'Para ver tu carrito de compras debes registrarte'});
    this.goTo('signup');
  }

}
