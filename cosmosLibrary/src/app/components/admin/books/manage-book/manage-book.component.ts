import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {

  public books:any[];

  constructor() { 
    this.books = [
      
      
      {
        front_image:'https://compote.slate.com/images/73f0857e-2a1a-4fea-b97a-bd4c241c01f5.jpg', 
        title: 'Patata',
        author:'Jonh Wick',
        language:'Francés',
        topic:'Drama',
        editorial:'Los enanitos azules'
      },
      {
        front_image:'https://i.pinimg.com/736x/e3/32/3f/e3323fc80a203239e2a28ae23f83260a.jpg', 
        title: 'Patata',
        author:'Jonh Wick',
        language:'Francés',
        topic:'Drama',
        editorial:'Los enanitos azules'
      },
      {
        front_image:'https://i0.wp.com/bestlifeonline.com/wp-content/uploads/2019/03/baby-tiger.jpg', 
        title: 'Patata',
        author:'Jonh Wick',
        language:'Francés',
        topic:'Drama',
        editorial:'Los enanitos azules'
      }
    ]
  }

  ngOnInit(): void {
  }

  

}
