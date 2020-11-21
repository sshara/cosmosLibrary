import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent implements OnInit {

  @Input() headerText: string;
  @Input() control: FormControl;

  imgURL : string | ArrayBuffer;

  private _defaultImage:string; 
  
  constructor() { 
    this._defaultImage = '/assets/images/placeholderImage.png';
    this.imgURL = this._defaultImage;
  }

  ngOnInit(): void {
    this.imgURL = this.control.value || this._defaultImage;
    let observ = this.control.valueChanges.subscribe(value => {
      if( value && ! (value instanceof File)) this.imgURL = this.control.value;
      observ.unsubscribe();
      if(! (value instanceof File) ) this.control.setValue(undefined);
    });
    
  }

  fileChangeEvent(files:any){
    this.imgURL = this._defaultImage;
    if (files.length === 0){
      this.control.setValue(undefined);
      return;
    }
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.control.setValue(undefined);
      return;
    }
    this.control.setValue(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
  }

  selectFile(element){
    element.click();
  }

}
