import { Component, inject, OnDestroy } from "@angular/core";
import { Auth, GoogleAuthProvider, OAuthProvider, signOut, user, User } from "@angular/fire/auth";
import { Subscription } from "rxjs";
import { SignInMethod } from "./SignInMethod";

@Component({
    selector: "app-authentication",
    templateUrl: "../pages/authentication-component.html"
})
export class AuthenticationComponent implements OnDestroy {
    private auth: Auth = inject(Auth);

    user$ = user(this.auth);
    userSubscription: Subscription;
    currentUser: User | null = null;
    signInMethods = [
        new SignInMethod("Microsoft", "microsoft", () => new OAuthProvider("microsoft.com")),
        new SignInMethod("GitHub", "github", () => new OAuthProvider("microsoft.com")),
        new SignInMethod("Google", "google", () => new GoogleAuthProvider())
    ];

    constructor() {
        this.userSubscription = this.user$.subscribe((user: User | null) => {
            this.currentUser = user;
        });
    }

    onSignInButtonClick(signInMethod: SignInMethod) {
        signInMethod.signIn(this.auth);
    }

    onSignOutButtonClick() {
        signOut(this.auth);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
