import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainChatComponent } from './main-chat/main-chat.component';
// import { ChatListComponent } from './chat-list/chat-list.component';
// import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
    { path: 'chat', component: MainChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
