import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private router: Router,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      this.isLoggedIn();
    });
  }

  createNewUserWithGeneratedId() {
    var record = {};
    record['Nom'] = "Randrianarisona Michael";
    record['Password'] = "azerty";
    return this.firestore.collection("Users").add(record).then((response) => {
      console.log(`success: ${response}`);
    }, (rejection) => {
      console.log(`error: ${rejection}`);
    });
  }

  createNewUserWithManualId(etu: string, nom: string, password: string) {
    if (!etu.includes("ETU"))
      etu = `ETU${etu}`;

    etu = etu.trim();
    nom = nom.trim();
    return this.getUser(etu).toPromise().then(doc => {
      if (doc.exists) {
        throw `${etu} déjà existant.`;
      }
    }).then(() => {
      this.firestore.collection("Users").doc(etu).set({
        Name: nom,
        Password: password
      })
    });

  }

  getUser(etu: string) {
    if (!etu.includes("ETU"))
      etu = `ETU${etu}`;

    var docRef = this.firestore.collection("Users").doc(etu);
    return docRef.get();
  }

  isLoggedIn() {
    this.storage.get("USER_INFO").then((response) => {
      if (response) {
        this.authState.next(true); // this line says user is logged
      }
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.authState.next(false);
      this.router.navigate(['login']);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  getStorage() {
    return this.storage;
  }
}
