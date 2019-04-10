import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../../user';
import { Conversation } from '../../conversation';
import { Message } from '../../message';

import { ChatService } from '../../chat.service';
import { AlertService, AuthService } from '../../_services';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
    users: User [] = [];
    conversations: Conversation [] = [];
    selectedConversation: Conversation;

    conversationsObservable: Observable<Conversation[]>;
    // currentDoc: string;
    // private _docSub: Subscription;

    @Output() sendConversation = new EventEmitter<Conversation>();

    constructor(private chatService: ChatService, private authService: AuthService, public dialog: MatDialog) { }

    ngOnInit() {
        // this.populateDummyData();
        // this.getAllUsers();
        this.conversationsObservable = this.chatService.conversations;
        // this._docSub = this.chatService.currentConversation.subscribe(doc => this.currentDoc = doc.id);
        this.loadConversations();
        // this.getAllConversations();
    }

    populateDummyData(): void {
        console.log("populateDummyData Execute.");
        this.chatService.populateDummyData();
        console.log("populateDummyData Executed.");
    }

    loadConversations(): void {
        console.log('loadConversations Execute.');
        this.chatService.loadConversations();

        this.conversationsObservable.subscribe((data: Conversation[]) => {
            var conversations = [];
            var user = this.authService.currentUserValue;

            // console.log('test');
            // console.log(this.conversations);
            // console.log(this.authService.currentUserValue);
            // console.log(data);
            // console.log('test');

            data.forEach(function(d){
                if(d.users.includes(user.username)){
                    conversations.push(d);
                }
            })

            this.conversations = conversations;
            // console.log('this.conversations');
            // console.log(data);
            // console.log(this.conversations);
            // console.log('this.conversations');
        })
    }

    getAllUsers(): void {
        console.log('getAllUsers Execute.');
        this.chatService.getAllUsers()
            .subscribe((data: User[]) => {
                this.users = data;
                console.log(this.users);
            });
        console.log('getAllUsers Executed.');
    }

    getAllConversations(): void {
        console.log('getAllConversations Execute.');
        this.chatService.getAllConversations()
            .subscribe((data: Conversation[]) => {
                this.conversations = data;
                console.log(this.conversations);
            });
        console.log('getAllConversations Executed.');
    }

    // selectedConversation: Conversation;

    selectConversation(conversation: Conversation): void {
        // this.selectedConversation = conversation;

        this.sendConversation.emit(conversation);
        console.log(conversation);
        console.log('conversation emmited');

        // console.log(this.selectedConversation);
    }

    openDialog(): void {


        const dialogRef = this.dialog.open(NewChatDialog, {
            width: '250px',
            data: { userID: '', topic: ''}
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     this.animal = result;
        // });
    }

}
export interface ChatDialogData {
  userID: string;
  topic: string;
}

@Component({
    selector: 'new-chat-dialog',
    templateUrl: 'new-chat-dialog.html',
})
export class NewChatDialog {

    constructor(
        public dialogRef: MatDialogRef<NewChatDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ChatDialogData,
        private authService: AuthService,
        private chatService: ChatService
    ) {}

    close(): void {
        this.dialogRef.close();
    }

    newConversation(): void {
        var newConversation = new Conversation();

        newConversation.topic = this.data.topic;
        newConversation.users = [];
        newConversation.users.push(this.data.userID);
        newConversation.users.push(this.authService.currentUserValue.username);
        newConversation.messages = [];
        newConversation.shoppingCardID = '';

        this.chatService.createNewConversation(newConversation);

        console.log(this.authService.currentUserValue);
        console.log(newConversation);
        // console.log(this.data);
        // console.log(newConversation);

        this.dialogRef.close();
    }

}
