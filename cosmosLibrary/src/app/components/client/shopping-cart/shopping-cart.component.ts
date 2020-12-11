import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public items:any[];
  public shoppingcart:any;

  constructor(
    private _generalService:GeneralService,
    private _clientService: ClientService
    ) { 
      this.items = []
      this.shoppingcart = this._generalService.shoppingCart;
      console.log(this.shoppingcart);
    }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this._clientService.getItems().forEach(item => {
      let subscription = item.subscribe(value => {
        this.items.push(value);
        subscription.unsubscribe();
      })
    })
  }


  deleteItem(item:any, position:number){
    let {amount, price} = item;
    //this.shoppingCart.total -= amount * price;
    //delete this.shoppingCart.items[item.id];
    this.items.splice(position,1);
    //this.disabledByItems = !this.items.length;
  }

  updateAmount(amount:number, item:any):void{
    item.amount = item.amount + amount;
    if(item.amount < 0) item.amount = amount = 0;
    item.total = item.amount * item.price;

    //this.shoppingCart.total += amount * item.price;
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  Buy(){}
  

}
