import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CommonModule } from '@angular/common';

// import { UsersComponent } from './users/users.component';
// import { MerchantUsersComponent } from './merchant-users/merchant-users.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
// import { ChatComponent } from './chat/chat.component';
// import { MainChatComponent } from './chatModule/main-chat/main-chat.component';
// import { ChatListComponent } from './chatModule/chat-list/chat-list.component';
// import { ConversationComponent } from './chatModule/conversation/conversation.component';

const routes: Routes = [
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // { path: 'users', component: UsersComponent },
    // { path: 'conversation', component: ConversationComponent },
    // { path: 'chatList', component: ChatListComponent },
    // { path: 'chat', component: MainChatComponent },
    // { path: 'chat', component: ChatComponent },
    // { path: 'merchants', component: MerchantUsersComponent },
    // { path: 'merchantDetail/:id', component: MerchantDetailComponent },
    // { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
    // declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
