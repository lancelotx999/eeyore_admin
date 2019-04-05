import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


// import { AuthRoutingModule } from './auth-routing.module';
// import { SignupComponent } from './signup/signup.component';
// import { SigninComponent } from './signin/signin.component';

import { ChatRoutingModule } from './chat-routing.module';
import { MainChatComponent } from './main-chat/main-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
      MainChatComponent,
      ChatListComponent,
      ConversationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: []
})
export class ChatModule { }
