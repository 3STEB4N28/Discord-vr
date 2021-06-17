declare module "discord-vr" {
import { EventEmitter } from "events";
class Client extends EventEmitter {
        public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
        public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
        public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
}
interface ClientEvents {
        "ready": [],
        "upvote": []
    }
}
