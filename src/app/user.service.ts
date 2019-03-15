import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { USERS } from './mock_users';

import { ConversationService } from './conversation.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    // getUsers(): User[] {
    //     return USERS;
    // }

    getUsers(): Observable<User[]> {
        this.conversationService.add('UserService: fetched users.');
        return of(USERS);
    }

    getUser(id: number): Observable<User> {
        // TODO: send the message _after_ fetching the hero
        this.conversationService.add(`UserService: fetched user id=${id}`);
        return of(USERS.find(user => user.userID === id));
    }

    // constructor() { }
    constructor(private conversationService: ConversationService) { }
}
