import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './mat.module';

import { AppComponent } from './app.component';
// import { UsersComponent } from './users/users.component';
// import { MerchantUsersComponent } from './merchant-users/merchant-users.component';
// import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
// import { ConversationComponent } from './conversation/conversation.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ChatComponent } from './chat/chat.component';
// import { MainComponent } from './chatModule/main/main.component';
// import { MainChatComponent } from './chatModule/main-chat/main-chat.component';
// import { ChatListComponent } from './chatModule/chat-list/chat-list.component';
// import { ConversationComponent } from './chatModule/conversation/conversation.component';

import { ChatModule } from './chat-module/chat.module';
import { AuthModule } from './auth/auth.module';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [
        AppComponent,
        // UsersComponent,
        // MerchantUsersComponent,
        // MerchantDetailComponent,
        // ConversationComponent,
        // DashboardComponent
        // ChatComponent,
        // MainComponent,
        // MainChatComponent,
        // ChatListComponent,
        // ConversationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        ChatModule,
        AuthModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        // { provide: AuthServiceConfig, useFactory: socialConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
