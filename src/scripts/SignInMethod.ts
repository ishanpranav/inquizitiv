import { Auth, AuthProvider, signInWithPopup } from "@angular/fire/auth";

interface AuthProviderFactory {
    (): AuthProvider;
}

export class SignInMethod {
    private authProviderFactory: AuthProviderFactory;

    displayName: string;
    iconId: string;

    constructor(displayName: string, iconId: string, authProviderFactory: AuthProviderFactory) {
        this.displayName = displayName;
        this.iconId = iconId;
        this.authProviderFactory = authProviderFactory;
    }

    signIn(auth: Auth) {
        signInWithPopup(auth, this.authProviderFactory());
    }
}
