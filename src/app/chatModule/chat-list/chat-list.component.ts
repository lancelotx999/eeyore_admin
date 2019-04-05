import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User } from '../../user';
import { Conversation } from '../../conversation';

import { ChatService } from '../../chat.service';

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

    constructor(private chatService: ChatService) { }

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
            this.conversations = data;
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
        console.log('conversation emmited');

        // console.log(this.selectedConversation);
        console.log(conversation);
    }

    private docId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // for (let i = 0; i < 5; i++) {
        //     text += possible.charAt(Math.floor(Math.random() * possible.length));
        // }

        return text;
    }
}
