import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @ViewChild('modal') modal: ModalComponent

  openModal() {
    this.modal.open();
  }
}
