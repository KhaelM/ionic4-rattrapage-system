import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from "../services/authentication.service";
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private etuInput: string = "";
  private etuAvailable: boolean = true;
  private passwordInput: string = "";
  private loginError: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    var user = {};
    if(!this.etuInput.includes('ETU'))
      this.etuInput = `ETU${this.etuInput}`;

    user['Etu'] = this.etuInput.trim();
    
    this.authService.getUser(user['Etu']).subscribe(doc => {
      if(!doc.exists)
        this.loginError = "ETU et/ou Mot de passe incorrect(s)";
      else {
        if(doc.data()['Password'] !== this.passwordInput) {
          this.loginError = "ETU et/ou Mot de passe incorrect(s)";
        } else {
          user['Name'] = doc.data()['Name'];
          this.authService.getStorage().set("USER_INFO", user).then((Response) => {
            this.authService.authState.next(true);
            this.router.navigate(['home']);
          });
        }
      }
    }, error => {
      this.loginError = "Veuillez vérifier votre connexion Internet et réessayer pour continuer.";
    });
  }

  goToRegisterPage() {
    this.router.navigate(['register']);
  }
}
