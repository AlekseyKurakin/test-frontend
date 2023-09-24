import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserModalComponent} from "./user-modal.component";
import {ValidationMessageModule} from "../../shared/validation-message/validation-message.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UserModalComponent
  ],
  imports: [
    CommonModule,
    ValidationMessageModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserModalComponent
  ]
})
export class UserModalModule { }
