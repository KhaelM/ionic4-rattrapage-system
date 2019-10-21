import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.page.html',
  styleUrls: ['./matieres.page.scss'],
})
export class MatieresPage implements OnInit {
  semestres = [];
  semestreSelected: string = "";
  currentMatieres = [];
  matieresInRattrapage = [];
  etu: string;

  constructor(
    private userService: UserServiceService,
    private authService: AuthenticationService
  ) { 
    this.authService.getStorage().get("USER_INFO").then(response => {
      this.etu = response['Etu'];
      this.setMatieresInRattrapage();
      this.setSemestres();
    });
  }

  ngOnInit() {
  }

  setSemestres() {
    this.userService.getSemestres().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.semestres.push({"Semestre": doc.id, "Couleur": doc.data()['Couleur']});
      });
    });
  }

  updateMatiere() {
    this.userService.getMatiereBySemestre(this.semestreSelected).toPromise().then(querySnapshot => {
      this.currentMatieres = [];
      querySnapshot.forEach(doc => {
        var data = doc.data();
        data['Id'] = doc.id;
        this.currentMatieres.push(data);
      });
    });
  }

  rattraperMatiere(matiere: string) {
    this.userService.addMatiereRattrapage(matiere, this.etu).then(() => {
      this.setMatieresInRattrapage();
    });
  }

  supprimerMatiere(matiere: string) {
    this.userService.deleteMatiereRattrapage(matiere, this.etu).then(()=> {
      this.setMatieresInRattrapage();
    });
  }

  setMatieresInRattrapage() {
    this.userService.getMatieresRattraper(this.etu).toPromise().then((doc) => {
      if(doc.exists)
        this.matieresInRattrapage = doc.data()['Matieres'];
    });
  }
  
  isInRattrapage(matiereId: string) {
    return this.matieresInRattrapage.includes(matiereId);
  }
}
