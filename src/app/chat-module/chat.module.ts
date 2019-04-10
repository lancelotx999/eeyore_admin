import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AngularMaterialModule } from '../mat.module';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AuthRoutingModule } from './auth-routing.module';
// import { SignupComponent } from './signup/signup.component';
// import { SigninComponent } from './signin/signin.component';

import { ChatRoutingModule } from './chat-routing.module';
import { MainChatComponent } from './main-chat/main-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NewChatDialog } from './chat-list/chat-list.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    MainChatComponent,
    ChatListComponent,
    ConversationComponent,
    NewChatDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    AngularMaterialModule
  ],
  entryComponents: [NewChatDialog],
  providers: []
})
export class ChatModule { }
