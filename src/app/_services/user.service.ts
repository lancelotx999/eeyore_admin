import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../_models';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private socket: Socket) { }

  getAllUsers() {
    this.socket.emit('GET-request');
    return this.socket.fromEvent('GET-success')
      .pipe(
        map( users => users ));
  }
}
