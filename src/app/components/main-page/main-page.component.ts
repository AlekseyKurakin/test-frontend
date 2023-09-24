import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { IUser } from "../../common/interfaces";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @ViewChild('userModal') userModal: ModalComponent

  openModal(action, userData?: IUser) {
    this.userModal.open(action, userData);
  }
}
