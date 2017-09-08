import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PresentationalComponent } from '@dcs/ngx-utils';

import { Product } from '../backend/product.class';

@Component({
  selector: 'dcs-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent extends PresentationalComponent implements OnChanges {
  @Input() public product: Product;

  @Output() public onSubmitForm: EventEmitter<Product> = new EventEmitter();

  public form: FormGroup;

  get articleIdControl(): FormControl {
    return this.form.get('articleId') as FormControl;
  }

  get labelControl(): FormControl {
    return this.form.get('label') as FormControl;
  }

  get priceControl(): FormControl {
    return this.form.get('price') as FormControl;
  }

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [''],
      articleId: ['', [Validators.required, Validators.pattern('a-[0-9]{5}')]],
      label: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.product) {
      this.form.setValue(changes.product.currentValue.toJS());
    }
  }

  public submitForm() {
    if (this.form.valid) {
      const product = this.product.merge(this.form.value);
      this.onSubmitForm.next(product);
    }
  }
}
