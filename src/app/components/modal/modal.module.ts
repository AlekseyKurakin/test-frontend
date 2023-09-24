import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal.component";
import {ValidationMessageModule} from "../../shared/validation-message/validation-message.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ValidationMessageModule,
    ReactiveFormsModule,
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
