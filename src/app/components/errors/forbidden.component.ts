import { Component } from '@angular/core';

@Component({
  selector: 'forbidden',
  template: `
    <h1 style="font-size: 50px; color: #ff0000">
      403: forbidden
    </h1>
    <hr>
    <a href="">Go to main page</a>
  `
})
export class ForbiddenComponent {
}
