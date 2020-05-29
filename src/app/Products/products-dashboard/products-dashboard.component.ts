import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { debounceTime, tap, map, distinctUntilChanged, takeWhile, filter, switchMap, shareReplay, take, delay, share, skipUntil } from 'rxjs/operators';
import { fromEvent, concat, Subject, of, merge, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreatedialogComponent } from '../createdialog/createdialog.component';
import { IProduct } from '../Products.models';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchProducts') searchInput: ElementRef;
  public isLoading = true;
  private isAlive = true;
  public sortBy = 'id';
  public searchValue = '';
  public selectedCategoryId = null;


  public allProducts$ = this.productsService.products$.pipe(
    take(1),
    map((products) => products.sort((p1, p2) => {
      return p1[this.sortBy] - p2[this.sortBy];
    })),
    delay(1200),
    tap(() => this.isLoading = false)
  );
  public filteredProducts$ = this.productsService.products$.pipe(
    delay(0),
    map((products) => products
      .filter(product => product.name.toLowerCase()
        .includes(this.searchValue.toLowerCase()))
      .sort((p1, p2) => {
        return p1[this.sortBy] - p2[this.sortBy];
        // ('' + p1[this.sortBy]).localeCompare(p2[this.sortBy]);
      })
    ),
  );

  public deleteProduct$ = this.filteredProducts$;

  public products$: Observable<IProduct[]>;
  public categories$ = this.productsService.getCategories();
  constructor(
    private productsService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.productsService.productGenerator();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  ngAfterViewInit() {
    const searchProducts$ = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(250),
      takeWhile(() => this.isAlive),
      distinctUntilChanged(),
      switchMap(() => this.filteredProducts$)
    );
    const initiation = concat(this.allProducts$, this.deleteProduct$);
    this.products$ = merge(initiation, searchProducts$)
      .pipe(
        tap((products) => localStorage.setItem('products', JSON.stringify(products)))
      );
  }

  deleteProduct(id) {
    this.productsService.deleteProduct(id).pipe(
      filter((res) => res)
    ).subscribe(() => {
      this.productsService.getAllProducts();
    });
  }

  sortByCategory(category) {
    this.sortBy = category;
    this.productsService.getAllProducts();
  }

  openCreateDialog(data: IProduct = { name: '', date: null, category: null, id: null, price: null }) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = 500;
    dialogConfig.maxHeight = 500;
    dialogConfig.data = { ...data, category$: this.categories$, title: data.id !== null ? 'Edit Product' : 'Create New Price' };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(CreatedialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(formValue => {
      if (formValue) {
        if (formValue.id !== null) {
          this.productsService.updateProduct(formValue);
        } else { this.productsService.createProduct(formValue); }
      }

    });
  }

}
