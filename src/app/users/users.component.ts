import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    // user: User = {
    //     userID: '4308131',
    //     userName: 'Windstorm94',
    //     firstName: 'Wind',
    //     lastName: 'Storm',
    //     email: 'Admin123@eeyore.com',
    //     password: 'Admin123',
    //     oAuth: 'Test',
    //     role: 'Admin'
    // };

    // users = USERS;
    users: User [];
    constructor(private userService: UserService) { }

    // getUsers(): void {
    //     this.users = this.userService.getUsers();
    // }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(users => this.users = users);
    }



    ngOnInit() {
        this.getUsers();
    }

    selectedUser: User;
    onSelect(user: User): void {
        this.selectedUser = user;
    }

}
