import { Message } from './message';

export class Conversation {
    conversationID: string;
    users: string [];
    shoppingCardID: string;
    topic: string;
    messages: Message [];
}
