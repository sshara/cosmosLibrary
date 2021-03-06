import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public parameter:string;
  public books:any[];
  public suggestedBooks: any[];
  private subscripBooks: any;
  private subscripSuggested: any;

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService,
    private _clientService:ClientService
  ) {
    this.parameter = '';
    this.books = [];
    this.suggestedBooks = [];
   }
  

   ngOnInit(): void {
    this.getSuggestedBooks();
    this.getBooks();
  }

  getSuggestedBooks(){
    this.subscripSuggested = this._clientService.getSuggestedBooks().subscribe(books => {
      this.suggestedBooks = books.filter(book => book.available_units != "0");
    })
  }

  getBooks(){
    this.subscripBooks = this._adminService.getBooks().subscribe(books => {
      this.books = books.filter(book => book.available_units != "0");
    })
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  booking(book:any){
    this._clientService.booking(book);
  }

  addtoShoppingcart(book:any){
    this._generalService.addItemToShoppingCart(book);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  ngOnDestroy(): void {
    this.subscripBooks.unsubscribe();
    this.subscripSuggested.unsubscribe();
  }

}
