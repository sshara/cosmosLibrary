import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {

  public books:any[];

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService
  ) { 
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

  editBook(book:any){
    let {isbn, title} = book;
    console.log(book);
    this._generalService.saveInfo('book', {isbn, title});
    this.goTo('edit-book');
  }

  deleteBook(book:any){
    let ref = this._generalService.openDialog(DeleteBookComponent);
    ref.afterClosed().subscribe(result => {if(result) {this._adminService.deleteBook(book); this.getBooks();}});
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

}
