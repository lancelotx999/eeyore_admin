import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MerchantUser } from './merchant-user';
import { MERCHANTUSERS } from './mock_merchants';

import { ConversationService } from './conversation.service';



@Injectable({
  providedIn: 'root'
})
export class MerchantUserService {

    constructor(private conversationService: ConversationService) { }

    // getMerchantUsers(): MerchantUser[] {
    //     return MERCHANTUSERS;
    // }

    getMerchantUsers(): Observable<MerchantUser[]> {
        this.conversationService.add('MerchantUserService: fetched merchantUsers.');
        return of(MERCHANTUSERS);
    }

    getMerchantUser(id: number): Observable<MerchantUser> {
        // TODO: send the message _after_ fetching the hero
        this.conversationService.add(`MerchantUserService: fetched user id=${id}`);
        // console.log(MERCHANTUSERS);
        // console.log(of(MERCHANTUSERS.find(user => user.userID === id)));
        return of(MERCHANTUSERS.find(user => user.userID === id));
    }
}
