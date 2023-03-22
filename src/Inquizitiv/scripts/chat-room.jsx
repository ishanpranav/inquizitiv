import { collection, doc, limit, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "./firebase-config.js";
import Message from "./Message.ts";

const messageConverter = {
    toFirestore: x => {
        return {
            id: x.id,
            imageUrl: x.imageUrl,
            created: serverTimestamp(),
            uid: x.uid,
            value: x.value
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const result = new Message(data.value, data.uid, data.imageUrl);

        result.id = data.id;

        return result;
    }
};

function ChatRoom() {
    const messageCollection = collection(firestore, "messages").withConverter(messageConverter);
    const [messages] = useCollectionData(query(messageCollection, limit(25)));
    const [formValue, setFormValue] = useState("");

    const onTextInputChange = (e) => {
        setFormValue(e.target.value);
    };

    const onFormSubmitAsync = async e => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await setDoc(doc(messageCollection), new Message(formValue, uid, photoURL));

        setFormValue("");
    };

    return <>
        <div>{messages && messages.map(x => <ChatMessage key={x.id} message={x} />)}</div>
        <form onSubmit={onFormSubmitAsync}>
            <input value={formValue} onChange={onTextInputChange} />
            <button type="submit">Send</button>
        </form>
    </>;
}

function ChatMessage(props) {
    const { value, uid, imageUrl } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message-${messageClass}`}>
            <img src={imageUrl} title="Profile" alt="The sender." width={32} height={32} />
            <p>{value}</p>
        </div>
    );
}

export default ChatRoom;
