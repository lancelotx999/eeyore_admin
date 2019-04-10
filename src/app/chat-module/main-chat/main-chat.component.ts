import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ChatService } from '../../chat.service';

import { Conversation } from '../../conversation';

import { ConversationComponent } from "../conversation/conversation.component";
import { ChatListComponent } from '../chat-list/chat-list.component';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css']
})
export class MainChatComponent implements OnInit {
    // @ViewChild(ChatListComponent) child;
    // message:string;
    selectedConversation: Conversation;
    conversations: Conversation[];

    receiveMessage($event) {
        this.conversations = $event
    }

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.populateDummyData();
    }

    // ngAfterViewInit() {
    //     this.selectedConversation = this.child.selectedConversation;
    //     console.log('this.selectedConversation');
    //     console.log(this.selectedConversation);
    // }

    receiveSelectedConversation($event) {
        this.selectedConversation = $event;
        // console.log(this.selectedConversation);
        // console.log('receiveSelectedConversation executed.');
    }



}
