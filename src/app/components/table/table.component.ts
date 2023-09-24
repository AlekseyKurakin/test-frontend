import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from "../../store";
import { IUser } from "../../common/interfaces";
import { selectUsers } from "../../store/users/users.selectors";

@Component({
  selector: 'users-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Output() viewUser: EventEmitter<IUser> = new EventEmitter();

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

  openModal(userData: IUser) {
    this.viewUser.emit(userData);
  }
}
