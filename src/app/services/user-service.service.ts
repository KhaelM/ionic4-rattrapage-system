import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getSemestres() {
    return this.firestore.collection("Semestres").get();
  }

  getMatieresRattraper(etu: string) {
    return this.firestore.collection("Rattrapages").doc(etu).get();
  }
  
  getMatieres() {
    return this.firestore.collection("Matieres").get();
  }

  getMatiereBySemestre(semestre: string) {
    var semestreParsed = parseInt(semestre);
    return this.firestore.collection('Matieres', ref => ref.where('Semestre', '==', semestreParsed)).get();
  }

  addMatiereRattrapage(matiereId: string, etu: string) { 
    var rattrapageRef = this.firestore.collection("Rattrapages").doc(etu);
    return rattrapageRef.get().toPromise().then(doc => {
      if(doc.exists) {
        rattrapageRef.update({Matieres: firebase.firestore.FieldValue.arrayUnion(matiereId)});
      } else {
        rattrapageRef.set({Matieres: [ matiereId ]});
      }
    });
  }

  deleteMatiereRattrapage(matiereId: string, etu: string) {
    return this.firestore.collection("Rattrapages").doc(etu).update({
      Matieres: firebase.firestore.FieldValue.arrayRemove(matiereId)
    });
  }
}
