import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../user';
import { Conversation } from '../../conversation';

import { ChatService } from '../../chat.service';
import { AlertService, AuthService } from '../../_services';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
    // message:string;
    conversationsObservable: Observable<Conversation[]>;
    conversations: Conversation [] = [];
    conversation: Conversation;


    @Input() selectedConversation: Conversation;

    // message = new FormControl('');
    // @Output() updateConversations = new EventEmitter<string>();
     // @Output() messageEvent = new EventEmitter<string>();


    constructor(private chatService: ChatService, private authService: AuthService) { }

    ngOnInit() {
        this.conversationsObservable = this.chatService.conversations;

        // console.log('test');
        // console.log(this.authService.currentUserValue);
        // console.log('test');

        // this.loadConversations();

        // this.chatService.currentMessage.subscribe(message => this.message = message);
        // this.conversations = this.chatService.conversations;
        // console.log('this.conversations');
        // console.log(this.conversations);
        // console.log('this.conversations');
        // console.log('this.selectedConversation');
        // console.log(this.selectedConversation);

        // public get currentUserValue(): User {
        //    return this.currentUserSubject.value;
        // }
    }

    // ngAfterViewInit() {
    //     console.log('this.selectedConversation after');
    //     console.log(this.selectedConversation);
    // }

    // loadConversations(): void {
    //     console.log('loadConversations Execute.');
    //     this.chatService.loadConversations();
    //
    //     console.log('test');
    //     console.log(this.authService.currentUserValue);
    //     console.log('test');
    //
    //     this.conversationsObservable.subscribe((data: Conversation[]) => {
    //         this.conversations = data;
    //         // console.log('this.conversations');
    //         // console.log(data);
    //         // console.log(this.conversations);
    //         // console.log('this.conversations');
    //     })
    // }

    submitMessage(f: NgForm) {
        console.log('!!!!!!!!!!!!!!!!!!!!!');
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
        console.log(this.selectedConversation);  // false
        console.log('!!!!!!!!!!!!!!!!!!!!!');


        var message = new Object({
            content: f.value.message,
            senderID: this.authService.currentUserValue.username
        })

        // var message = {};
        // message.content = f.value.message;
        // message.senderID = '4308131';

        this.chatService.submitMessage(message, this.selectedConversation)
            .subscribe((data: Conversation) => {
                this.conversation = data;

                console.log('----------------------');
                console.log(data);
                console.log(this.selectedConversation);
                console.log('----------------------');

                this.selectedConversation = this.conversation;

                // this.chatService.getAllConversations()
                //     .subscribe((data: Conversation[]) => {
                //         this.messageEvent.emit(data);
                //         console.log('this.conversations');
                //     });

                // this.updateConversations.emit('updateConversations');

            });

        // socket.on('submitMessage-start' function(){
        //
        // })
    }

}
