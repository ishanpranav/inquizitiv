class Message {
    id: string = "";
    value: string;
    uid: string;
    imageUrl: string;

    constructor(value: string, uid: string, imageUrl: string) {
        this.value = value;
        this.uid = uid;
        this.imageUrl = imageUrl;
    }

    toString() {
        return this.value;
    }
}

export default Message;
