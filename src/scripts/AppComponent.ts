import { Component } from "@angular/core";
import { Auth, deleteUser, GoogleAuthProvider, OAuthProvider, onAuthStateChanged, reauthenticateWithPopup, signOut, User } from "@angular/fire/auth";
import { deleteDoc, getDoc, setDoc } from "@angular/fire/firestore";
import { DatabaseService } from "./DatabaseService";
import { Profile } from "./Profile";
import { SignInMethod } from "./SignInMethod";

@Component({
    selector: "app-root",
    templateUrl: "../pages/app-component.html",
    styleUrls: ["../styles/app-component.css"],
})
export class AppComponent {
    private _currentProfile: Profile | null = null;
    private _formProfile: Profile = {
        username: ""
    };

    public constructor(public auth: Auth, private databaseService: DatabaseService) {
        onAuthStateChanged(auth, async user => {
            if (!user) {
                this.currentProfile = null;

                return;
            }

            const documentReference = databaseService.profile(user.uid);
            const documentSnapshot = await getDoc(documentReference);

            if (documentSnapshot.exists()) {
                this.currentProfile = documentSnapshot.data();

                return;
            }

            this.currentProfile = {
                username: "user" + (Math.floor(Math.random() * 9000) + 1000).toString()
            };

            await setDoc(documentReference, this.currentProfile);
        });
    }

    public get currentProfile(): Profile | null {
        return this._currentProfile!;
    }

    public set currentProfile(value: Profile | null) {
        this._currentProfile = value;

        if (!value) {
            return;
        }

        this._formProfile.username = value.username;
    }

    public get formProfile(): Profile {
        return this._formProfile;
    }

    public get signInMethods(): SignInMethod[] {
        return [
            new SignInMethod("Microsoft", "microsoft", () => new OAuthProvider("microsoft.com")),
            new SignInMethod("GitHub", "github", () => new OAuthProvider("microsoft.com")),
            new SignInMethod("Google", "google", () => new GoogleAuthProvider())
        ];
    }
    
    public onDeleteProfileClick() {
        const user = this.auth?.currentUser;

        if (!user) {
            return;
        }

        user.providerData.forEach(async profile => {
            switch (profile.providerId) {
                case "google.com":
                    await reauthenticateWithPopup(user, new GoogleAuthProvider());
                    await this.deleteUserAsync();
                    break;

                default:
                    await reauthenticateWithPopup(user, new OAuthProvider(profile.providerId));
                    await this.deleteUserAsync();
                    break;
            }
        });
    }

    public async deleteUserAsync() {
        const user = this.auth?.currentUser;

        if (!user) {
            return;
        }

        await deleteDoc(this.databaseService.profile(user.uid));
        await deleteUser(user);
    }

    public onSignInButtonClick(signInMethod: SignInMethod) {
        signInMethod.signIn(this.auth);
    }

    public onSignOutButtonClick() {
        signOut(this.auth);
    }

    public onSettingsButtonClick() {
        if (!this.currentProfile) {
            return;
        }

        this.formProfile.username = this.currentProfile.username;
    }

    public onProfileFormSubmit() {
        const user = this.auth?.currentUser;

        if (!user) {
            return;
        }

        const documentReference = this.databaseService.profile(user.uid);

        setDoc(documentReference, {
            username: this.formProfile?.username
        }, {
            merge: true
        }).then(() => {
            this.currentProfile = this.formProfile;
        });
    }
}
