import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserServiceService  } from "../services/user-service.service";
import { ifStmt } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  fullName: string;
  etu: string;
  semestres = [];
  matieresInRattrapage = [];
  allMatieres = [];
  checkedSemestres = [];

  constructor(
    private authService: AuthenticationService,
    private userService: UserServiceService
  ) {
    this.authService.getStorage().get("USER_INFO").then(response => {
      this.fullName = response['Name'];
      this.etu = response['Etu'];
    }).then(() => {
      this.setSemestres();
      this.setAllMatieres();
    });
  }
  
  ionViewWillEnter() {
    if(this.etu != null)
      this.setMatieresInRattrapage();
  }

  ngOnInit() {
  }

  setSemestres() {
    this.userService.getSemestres().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.semestres.push({"Semestre": doc.id, "Couleur": doc.data()['Couleur']})
        this.checkedSemestres.push(doc.id);
      });
    });
  }

  setAllMatieres() {
    this.userService.getMatieres().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        var data = doc.data();
        data['Id'] = doc.id;
        this.allMatieres.push(data);
      });
    });
  }

  setMatieresInRattrapage() {
    this.userService.getMatieresRattraper(this.etu).toPromise().then((doc) => {
      if(doc.exists)
        this.matieresInRattrapage = doc.data()['Matieres'];
    });
  }

  getMatiereColor(matiere: string) {
    var Matiere = this.allMatieres.find(element => {
      return element.Id === matiere;
    });

    var Semestre = this.semestres.find(element => {
      return element.Semestre == Matiere.Semestre; 
    });

    return Semestre.Couleur;
  }

  isDisplayed(matiere: string) {
    var Matiere = this.allMatieres.find(element => {
      return element.Id === matiere;
    });
    // si matiere.semestre fait partie du tab de semestre
    return this.checkedSemestres.includes(Matiere.Semestre.toString());
  }

  toggle(semestre) {
    if(this.checkedSemestres.includes(semestre)) {
      var index = this.checkedSemestres.indexOf(semestre);
      this.checkedSemestres.splice(index, 1);
    } else {
      this.checkedSemestres.push(semestre);
    }
  }

  supprimerMatiere(matiereId: string) {
    this.userService.deleteMatiereRattrapage(matiereId, this.etu);
    this.setMatieresInRattrapage();
  }
}
