import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { createUser, deleteUser, updateUser } from "../../store/users/users.actions";
import { UsersService } from "../../services/users.service";
import { MessageService } from "../../services/message.service";
import { take } from "rxjs/operators";

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @ViewChild('modal') modal: ElementRef;

  action = 'create';
  id: number;
  types = ['Admin', 'Driver'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private usersService: UsersService,
    private messageService: MessageService
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

  open(action, userData?: any) {
    this.action = action;
    this.modal.nativeElement.style.display = 'block';

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
    } else {
      this.form.get('type').patchValue('Admin');
    }
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
    if (this.action === 'create') {
      this.usersService.create({  ...this.form.value, password }).pipe(
        take(1)
      )
        .subscribe((response: any) => {
          if (response.error) {
            if (response.error === 'userNameAlreadyTaken') {
              this.form.get('userName').setErrors({'usernameTaken':  true })
            } else {
              this.messageService.showMessage('error', `Something went wrong on server side: ${response.error}`);
            }
          } else {
            this.store.dispatch(createUser({ user: response }));
            this.messageService.showMessage('success', 'User was successfully created');
            this.close();
          }
        })
    } else if (this.action === 'edit') {
      this.usersService.update(this.id,{  ...this.form.value, password }).pipe(
        take(1)
      )
        .subscribe((response: any) => {
          if (response.error) {
            if (response.error === 'userNameAlreadyTaken') {
              this.form.get('userName').setErrors({'usernameTaken':  true })
            } else {
              this.messageService.showMessage('error', `Something went wrong on server side: ${response.error}`);
            }
          } else {
            this.store.dispatch(updateUser({ user: {...response, id: this.id} }));
            this.messageService.showMessage('success', 'User was successfully updated');
            this.close();
          }
        })
    }
  }

  onDeleteUser() {
    this.usersService.delete(this.id)
      .subscribe((response: any) => {
        this.store.dispatch(deleteUser({ id: response }));
        this.messageService.showMessage('success', 'User was successfully deleted');
        this.close();
      }
    )
  }
}
