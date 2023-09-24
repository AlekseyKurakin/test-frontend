import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../store";
import {IUser} from "../../common/interfaces";
import {selectUsers} from "../../store/users/users.selectors";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent
  users$ = this.store.select(selectUsers);
  tableColumnConfigs =
    [
      {
        defKey: 'username',
        label: 'username',
        width: '20%',
      },
      {
        defKey: 'first_name',
        label: 'first name',
        width: '20%',
      },
      {
        defKey: 'last_name',
        label: 'last name',
        width: '20%',
      },
      {
        defKey: 'email',
        label: 'email',
        width: '20%',
      },
      {
        defKey: 'type',
        label: 'type',
        width: '10%',
      }
    ];

  constructor(
    protected store: Store<State>,
  ) { }

  ngOnInit(): void {
  }

  openModal(userData: any) {
    this.modal.open(userData);
  }
}
