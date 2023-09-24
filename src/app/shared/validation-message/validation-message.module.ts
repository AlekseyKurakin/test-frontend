import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { InvalidMessageDirective } from './validation-message/invalid-message.directive';
import {InvalidTypeDirective} from "./validation-message/invalid-type.directive";

@NgModule({
    declarations: [
      ValidationMessageComponent,
      InvalidMessageDirective,
      InvalidTypeDirective
    ],
    imports: [
      CommonModule
    ],
    exports: [
      ValidationMessageComponent,
      InvalidMessageDirective,
      InvalidTypeDirective
    ]
})
export class ValidationMessageModule { }
