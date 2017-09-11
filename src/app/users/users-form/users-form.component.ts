import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, Output } from '@angular/core';
import { User } from '../backend/user.class';

@Component({
  selector: 'dcs-users-form',
  templateUrl: 'users-form.component.html'
})
export class UsersFormComponent implements OnChanges {
  public form: FormGroup;
  @Input() public user: User;
  @Input() public updating: boolean = false;
  @Output() public onFormSubmit: EventEmitter<User> = new EventEmitter();

  get firstnameControl(): FormControl {
    return this.form.get('firstname') as FormControl;
  }

  get lastnameControl(): FormControl {
    return this.form.get('lastname') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      id: [null],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.user && changes.user.currentValue instanceof User) {
      this.form.setValue(changes.user.currentValue.toJS());
    }
  }

  public submitForm() {
    const user = this.user.merge(this.form.value);
    this.onFormSubmit.next(user);
  }
}
