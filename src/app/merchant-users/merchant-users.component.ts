import { Component, OnInit } from '@angular/core';

import { MerchantUser } from '../merchant-user';
import { MERCHANTUSERS } from '../mock_merchants';

import { MerchantUserService } from '../merchant-user.service';

@Component({
  selector: 'app-merchant-users',
  templateUrl: './merchant-users.component.html',
  styleUrls: ['./merchant-users.component.css']
})
export class MerchantUsersComponent implements OnInit {

    // merchantUser: MerchantUser = {
    //     userID: 4308131,
    //     merchantID: 4308131,
    //     userType: 'Admin'
    // };

    // merchantUsers = MERCHANTUSERS;
    merchantUsers: MerchantUser[];

    // constructor() { }
    constructor(private merchantUserService: MerchantUserService) { }

    getMerchantUsers(): void {
        // this.merchantUsers = this.merchantUserService.getMerchantUsers();
        this.merchantUserService.getMerchantUsers()
            .subscribe(merchantUsers => this.merchantUsers = merchantUsers);
    }

    ngOnInit() {
        this.getMerchantUsers();
    }

    selectedMerchantUser: MerchantUser;
    onSelect(merchantUser: MerchantUser): void {
        // console.log(merchantUser);
        this.selectedMerchantUser = merchantUser;
    }

}
