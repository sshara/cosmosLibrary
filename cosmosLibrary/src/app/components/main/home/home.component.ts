import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

}
