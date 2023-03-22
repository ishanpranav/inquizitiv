import { Timestamp } from "firebase/firestore";

class Message {
    id: string;
    value: string;
    uid: string;
    imageUrl: string;
    created: Timestamp;

    constructor(id: string, value: string, uid: string, imageUrl: string, created: Timestamp) {
        this.id = id;
        this.value = value;
        this.uid = uid;
        this.imageUrl = imageUrl;
        this.created = created;
    }

    toString() {
        return this.value;
    }
}

export default Message;
