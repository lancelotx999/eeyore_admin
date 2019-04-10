import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import { User } from './user';
import { Conversation } from './conversation';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    // conversations: Conversation[];
    currentConversation = this.socket.fromEvent<Conversation>('conversation');
    conversations = this.socket.fromEvent<Conversation[]>('conversations');

    constructor(private socket: Socket) {
    }

    populateDummyData(){
        this.socket.emit('populateDummyData-start');
        console.log('populateDummyData-start emmited');
        // return this.socket.fromEvent('populateDummyData-success')
        //     .pipe(map( users => users ));
    }

    getUser(id: string){

    }

    getAllUsers() {
        this.socket.emit('getAllUsers-start');

        console.log("getAllUsers-start emmited");



        return this.socket.fromEvent('getAllUsers-success')
            .pipe(map( users => users ));
    }

    loadConversations(){
        this.socket.emit('loadConversations');
        console.log('this.conversations');
        console.log(this.conversations);
        console.log(this.currentConversation);
        console.log('this.conversations');

        return this.conversations.pipe(map( conversations => conversations ));
        // return this.currentConversation.pipe(map( conversations => conversations ));

    }


    getAllConversations() {
        this.socket.emit('getAllConversations-start');

        console.log("getAllConversations-start emmited");


        // console.log(this.socket.fromEvent('getAllConversations-success')
        //     .pipe(map( conversations => conversations )));

        return this.socket.fromEvent('getAllConversations-success')
            .pipe(map( conversations => conversations ));
    }

    submitMessage(message: Object, conversation: Conversation){
        // var data: Object = new Object();
        // data.message = message;
        // data.conversation = conversation;

        var data = new Object({
            message: message,
            conversation: conversation
        })
        console.log('----------- chatService -----------');
        console.log(data);
        console.log('----------- chatService -----------');

        this.socket.emit('submitMessage-start', data);

        return this.socket.fromEvent('submitMessage-success')
            .pipe(map( conversation => conversation ));
    }

    createNewConversation(conversation: Object){
        console.log("new conversation");
        console.log(conversation);

        this.socket.emit('createNewConversation', conversation);


    }

    // conversations: Conversation [] = [];
    // private messageSource = new BehaviorSubject('default message');
    // currentMessage = this.messageSource.asObservable();
    // changeMessage(message: string) {
    //     this.messageSource.next(message)
    // }
}
