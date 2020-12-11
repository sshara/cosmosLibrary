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
        let data = value;
        data.amount = parseInt(this.shoppingcart.items[value.isbn].amount || 1);
        data.total = parseInt(data.amount) * parseInt(data.price);
        this.items.push(data);
        subscription.unsubscribe();
      })
    })
  }


  deleteItem(item:any, position:number){
    let {amount, price} = item;
    this.shoppingcart.total -= amount * price;
    delete this.shoppingcart.items[item.id];
    this.items.splice(position,1);

    this._generalService.removeItemToShoppingCart(item);
  }

  updateAmount(amount:number, item:any):void{
    
    this._generalService.updateItemQuantityShoppingCart(item, amount);

    item.amount = item.amount + amount;
    if(item.amount < 1){
      item.amount = 1;
      amount = 0;
    } 
    if(item.amount > 3){
      item.amount = 3; 
      amount = 0;
    } 
    item.total = item.amount * item.price;

    this.shoppingcart.total += amount * item.price;
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  Buy(){
    this._clientService.buyItems(this.items);
  }
  

}
