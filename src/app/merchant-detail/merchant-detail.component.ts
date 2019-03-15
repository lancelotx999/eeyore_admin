import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MerchantUser } from '../merchant-user';
import { MerchantUserService } from '../merchant-user.service';


@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {

    @Input() merchantUserDetail: MerchantUser;

    constructor(private route: ActivatedRoute, private merchantUserService: MerchantUserService, private location: Location) { }

    ngOnInit() {
        this.getMerchantUser();

        // console.log(this.merchantUserDetail);
        // console.log('fire');
        // console.log(this.user);

        this.merchantUserDetail = this.user;
    }

    getMerchantUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.merchantUserService.getMerchantUser(id)
            .subscribe(user => this.user = user);
    }

    goBack(): void {
        this.location.back();
    }

}
