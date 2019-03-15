import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';
import { MerchantUser } from '../merchant-user';
import { MerchantUserService } from '../merchant-user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    users: User [] = [];
    merchantUsers: MerchantUser[] = [];

    constructor(private userService: UserService, private merchantUserService: MerchantUserService) { }

    getUser(): void {
        this.userService.getUser()
            .subscribe(users => this.users = users.slice(1, 5));
    }

    getMerchantUser(): void {
        // this.merchantUsers = this.merchantUserService.getMerchantUsers();
        this.merchantUserService.getMerchantUser()
            .subscribe(merchantUsers => this.merchantUsers = merchantUsers.slice(1, 5));
    }

    ngOnInit() {
        // this.getUser();
        this.getMerchantUser();
        console.log(this.users);
        console.log(this.merchantUsers);
    }


    selectedMerchantUser: MerchantUser;
    onSelect(merchantUser: MerchantUser): void {
        console.log(merchantUser);
        this.selectedMerchantUser = merchantUser;
    }

}
