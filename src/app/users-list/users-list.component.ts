import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: [{id: number, email: string, avatar: string, pseudo: string, niveau: number, password: string}]

  constructor(private userService: UserService) {
    this.usersList = [{id:-1,email:'',avatar:'',pseudo:'',niveau:0,password:''}]
    this.getUsersList()
  }

  ngOnInit(): void {
  }

  getUsersList() {
    this.userService.getUsersList()
    .subscribe({
      next: response => {
        this.usersList = response
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
  }

}
