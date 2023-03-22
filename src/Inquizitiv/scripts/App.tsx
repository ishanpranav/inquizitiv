import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config.js";
import ChatRoom from "./chat-room.jsx";
import "../styles/app.scss";

function LogIn() {
    return <button onClick={onGoogleButtonClick}>Log in with Google</button>
}

function onGoogleButtonClick() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
}

function LogOut() {
    if (!auth.currentUser) {
        return <></>;
    }

    function logOut() {
        auth.signOut();
    }

    return (
        <button onClick={logOut}>Log out</button>
    );
}

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1>Chat app</h1>
                <LogOut />
            </header>

            <section>
                {user ? <ChatRoom /> : <LogIn />}
            </section>

        </div>
    );
}

export default App;
