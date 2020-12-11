import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  
  public amount:any;
  private _subscription:Subscription;

  constructor(
    private _generalService:GeneralService,
  ) 
  {
    this.amount = 0;
  }

  ngOnInit(): void {
    this.getShoppingCartInfo();
  }

  getShoppingCartInfo(){
    this._subscription = this._generalService.shoppingCartValue.subscribe(shoppingCart =>{
      this.amount = Object.keys(shoppingCart.items).length;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
