import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../Products.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
@Input() data: IProduct;
@Output() deleteFunction = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  deleteProduct(id, event) {
    event.stopPropagation();
    this.deleteFunction.emit(id);
  }

}
