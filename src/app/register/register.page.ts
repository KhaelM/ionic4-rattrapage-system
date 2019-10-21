import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  etuAvailable: boolean = true;
  etuInput: string = "";
  fullnameInput: string = "";
  passwordInput: string = "";
  registerError: string = "";

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  checkEtu() {
    this.authService.getUser(this.etuInput.trim()).subscribe(doc => {
      this.etuAvailable = !doc.exists;
    }, error => {
      console.log("erreur");
    });
  }

  signUp() {
    var user = {};
    this.authService.createNewUserWithManualId(this.etuInput, this.fullnameInput, this.passwordInput)
    .then(() => {
      if(!this.etuInput.includes('ETU'))
        this.etuInput = `ETU${this.etuInput}`;

      user['Etu'] = this.etuInput.trim();
      user['Name'] = this.fullnameInput;

      this.authService.getStorage().set("USER_INFO", user).then(() => {
        this.authService.authState.next(true);
        this.router.navigate(['home']);
      });
      
    }).catch((error) => {
      this.registerError = error.toString();
    });
  }
}
