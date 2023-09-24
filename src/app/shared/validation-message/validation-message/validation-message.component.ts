import { Component, Input } from '@angular/core';

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent {
  @Input() controlKey: string;
  @Input() groupName?: string;
  @Input() validateOnSubmission?: boolean;
}
