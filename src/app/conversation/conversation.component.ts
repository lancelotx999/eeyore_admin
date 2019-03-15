import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(public conversationService: ConversationService) {}

  ngOnInit() {
  }

}
