import { Injectable } from "@angular/core";
import { doc, DocumentReference, Firestore } from "@angular/fire/firestore";
import { Profile } from "./Profile";

@Injectable({
    providedIn: "root"
})
export class DatabaseService {
    public constructor(private firestore: Firestore) { }

    public profile(id: string): DocumentReference<Profile> {
        return doc(this.firestore, "profiles", id).withConverter<Profile>({
            fromFirestore: (snapshot) => {
                return snapshot.data() as Profile;
            },
            toFirestore: (model) => {
                return model;
            }
        });
    }
}