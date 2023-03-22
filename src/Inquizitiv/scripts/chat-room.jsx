import { collection, doc, limit, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
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
        return new Message(data.id, data.value, data.uid, data.imageUrl, data.created);
    }
};

function ChatRoom() {
    const messageCollection = collection(firestore, "messages").withConverter(messageConverter);
    const [messages] = useCollectionData(query(messageCollection, orderBy("created"), limit(25)));
    const [formValue, setFormValue] = useState("");

    const onTextInputChange = (e) => {
        setFormValue(e.target.value);
    };

    const onFormSubmitAsync = async e => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;
        var document = doc(messageCollection);

        await setDoc(document, new Message(document.id, formValue, uid, photoURL));

        setFormValue("");
    };

    return <>
        <div>{messages && messages.map(x => <ChatMessage key={x.id} message={x} />)}</div>
        <form onSubmit={onFormSubmitAsync}>
            <div className="input-group mb-3">
                <input value={formValue} type="text" className="form-control" placeholder="Write something..." onChange={onTextInputChange} aria-label="Message" aria-describedby="button-addon2" />
                <button className="btn btn-outline-primary" type="submit" id="button-addon2">Send</button>
            </div>
        </form>
    </>;
}

function ChatMessage(props) {
    const { value, uid, imageUrl } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'card border-primary mb-3' : 'card mb-3';
    return (
        <div className={messageClass}>
            <div class="card-header">
                <span><img src={imageUrl} className="img-fluid rounded" title="Profile" alt="The sender." width={32} height={32} /></span>&nbsp;
                <span>{value}</span>
            </div>
        </div>
    );
}

export default ChatRoom;
