import {Component, ViewChild, ElementRef, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {createUser, deleteUser} from "../../store/users/users.actions";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() action: string = 'create';
  @ViewChild('myModal') modal: ElementRef;

  id: number;
  types = ['Admin', 'Driver'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      type: ['Admin', Validators.required],
      passwordGroup: this.fb.group({
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required]
      }, { validators: [this.passwordMatchValidator]})
    })
  }

  open(userData?: any) {
    if (userData) {
      this.id = userData.id;
      this.form.patchValue({
        userName: userData.userName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        type: userData.type,
        passwordGroup: {
          password: userData.password,
          confirmPassword: userData.password
        },
      })
    }
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.form.reset();
    this.modal.nativeElement.style.display = 'none';
  }

  passwordMatchValidator(g: FormGroup) {
    return (g.get('confirmPassword').value) && (g.get('password').value !== g.get('confirmPassword').value)
      ? {'mismatch': true} : null;
  }

  onSubmit() {
    const password = (this.form.controls['passwordGroup'] as FormGroup).controls['password'].value
    this.store.dispatch(createUser({ user: {  id: 2, ...this.form.value, password }}));
    this.close();
  }

  onDelete() {
    this.store.dispatch(deleteUser({ id: this.id }));
    this.close();
  }
}
