import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../_models/user';
import { Conversation } from '../../_models/conversation';

import { ChatService } from '../../_services/chat.service';
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
    user: User;


    @Input() selectedConversation: Conversation;

    // message = new FormControl('');
    // @Output() updateConversations = new EventEmitter<string>();
     // @Output() messageEvent = new EventEmitter<string>();


    constructor(private chatService: ChatService, private authService: AuthService, public dialog: MatDialog) { }

    ngOnInit() {
        this.conversationsObservable = this.chatService.conversations;
        this.user = this.authService.currentUserValue;

        // console.log(this.user);

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

    submitMessage(f: NgForm) {
        // console.log('!!!!!!!!!!!!!!!!!!!!!');
        // console.log(f.value);  // { first: '', last: '' }
        // console.log(f.valid);  // false
        // console.log(this.selectedConversation);  // false
        // console.log('!!!!!!!!!!!!!!!!!!!!!');


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

                this.selectedConversation = this.conversation;

            });

    }

    openAddUserDialog(): void {
        const dialogRef = this.dialog.open(AddUserDialog, {
            width: '250px',
            data: { username: '', selectedConversation: this.selectedConversation}
        });
    }
}

export interface AddUserDialogData {
  username: string;
}

@Component({
    selector: 'add-user-dialog',
    templateUrl: 'add-user-dialog.html',
})
export class AddUserDialog {

    constructor(
        public dialogRef: MatDialogRef<AddUserDialog>,
        @Inject(MAT_DIALOG_DATA) public data: AddUserDialogData,
        private authService: AuthService,
        private chatService: ChatService
    ) {}

    cancel(): void {
        this.dialogRef.close();
    }

    addUser(): void {
        this.data.selectedConversation.users.push(this.data.username);

        console.log(this.data.selectedConversation);

        this.chatService.addUser(this.data.selectedConversation);

        console.log(this.authService.currentUserValue);
        // console.log(newConversation);
        // console.log(this.data);
        // console.log(newConversation);

        this.dialogRef.close();
    }

}
