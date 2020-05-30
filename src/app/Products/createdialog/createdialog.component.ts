import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct, ICategory } from '../Products.models';
import { Observable, noop } from 'rxjs';

@Component({
  selector: 'app-createdialog',
  templateUrl: './createdialog.component.html',
  styleUrls: ['./createdialog.component.scss']
})
export class CreatedialogComponent implements OnInit {
  public data: IProduct;
  public title: string;
  public categories$: Observable<ICategory[]>;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatedialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    // tslint:disable-next-line: no-unused-expression
    this.title = data.title;
    this.data = data;
    this.categories$ = data.category$;

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(50)]],
      category: [this.data.category, [Validators.required]],
      price: [this.data.price, [Validators.required, Validators.min(0.0000000000000000001), Validators.pattern('[0-9]*[.]?[0-9]*')]],
      id: this.data.id,
      date: this.data.date
    });
  }

  compareProducts(o1, o2) {
    if (o1.id === o2.id) {
      return true;
    }
    return false;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
