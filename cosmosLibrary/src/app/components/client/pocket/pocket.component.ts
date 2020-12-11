import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss']
})
export class PocketComponent implements OnInit {

  buyTokensForm = new FormGroup({
    tokens: new FormControl('', [Validators.required])
  });

  public tokens:string;
  constructor(
    private _generalService:GeneralService, 
    private _clientService: ClientService) { 
    this.tokens = this._generalService.loadInfo('identity').coins;
  }

  ngOnInit(): void {
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  buyTokens(){
    this._clientService.buyTokens(this.buyTokensForm.get('tokens').value);
    setInterval(()=>{
      this.tokens = this._generalService.loadInfo('identity').coins;
    }, 1000);
    
  }

}
