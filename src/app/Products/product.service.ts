import { Injectable } from '@angular/core';
import { IProduct, ICategory } from './Products.models';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: IProduct[] = [];
  private productsSubject = new BehaviorSubject<IProduct[]>(this.products);
  public products$ = this.productsSubject.asObservable();
  private productCategories: ICategory[] = [
    { name: 'Toys', id: 1 },
    { name: 'Movies', id: 2 },
    { name: 'Children', id: 3 },
    { name: 'Home', id: 4 },
    { name: 'Pictures', id: 5 },
    { name: 'Plants', id: 6 },
    { name: 'Guns', id: 7 }
  ];
  private maxPrice = 200;
  private productNames = ['Pokemon', 'Monday morning', 'Highway to Hell', 'mona-liza', 'mk47', 'geranium', 'Debby', 'Shlomo', 'Green Hulk'];

  constructor() {
  }

  productGenerator(numOfItem = 10) {
    let newProduct: IProduct;
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
    } else {
      for (let i = 0; i < numOfItem; i++) {
        newProduct = {
          name: this.productNames[Math.floor(Math.random() * this.productNames.length - 1)],
          category: this.productCategories[Math.floor(Math.random() * this.productCategories.length - 1)],
          date: new Date().toUTCString(),
          price: Math.floor(Math.random() * this.maxPrice) + 1,
          id: i
        };
        this.products.push(newProduct);
      }
    }
    this.productsSubject.next(this.products);
  }

  updateProduct(updatedValue) {
    const index = this.products.findIndex(value => value.id === updatedValue.id);
    if (index !== -1) {
      this.products[index] = updatedValue;
      this.getAllProducts();
    }
  }

  createProduct(value) {
    value.id = this.products[this.products.length - 1].id + 1;
    value.date = new Date().toUTCString();
    this.products.push(value);
    this.getAllProducts();
  }

  deleteProduct(id) {
    this.products = this.products.filter((p) => p.id !== id);
    return of(true);
  }

  getCategories() {
    return of(this.productCategories);
  }

  getAllProducts() {
    this.productsSubject.next(this.products);
  }
}
