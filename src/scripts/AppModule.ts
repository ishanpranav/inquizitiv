import { NgModule } from "@angular/core";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./AppComponent";
import * as firebase from "../data/firebase.json";
import { DatabaseService } from "./DatabaseService";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(firebase))
    ],
    providers: [
        DatabaseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
