import { Component } from '@angular/core';

@Component({
  selector: 'error',
  template: `
    <h1 style="font-size: 50px; color: #ff0000">
      404: Not Found
    </h1>
    <hr>
    <a href="">Go to main page</a>
  `
})
export class NotFoundComponent {
}
