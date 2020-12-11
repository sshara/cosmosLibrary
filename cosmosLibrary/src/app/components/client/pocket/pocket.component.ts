import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/system/general.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private _generalService:GeneralService) { 
    this.tokens = '2000000';
  }

  ngOnInit(): void {
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  buyTokens(){}

}
