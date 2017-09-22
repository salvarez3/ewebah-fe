import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userPostData = {"Name":"","Token":"","Email":""};

  constructor(public navCtrl: NavController, public app: App) {

    const data = JSON.parse(localStorage.getItem('userData'));
  
    this.userPostData.Name = data.Name;
    this.userPostData.Email = data.Email;
    this.userPostData.Token = data.access_token;


  }

  logout(){
    // Remove API token 
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 100);
}

  backToWelcome(){
  const root = this.app.getRootNav();
  root.popToRoot();
}

}
