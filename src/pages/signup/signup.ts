import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // create a storage structure for the returned values
  enteredDetails = {"firstName": "","lastName": "","email": "","password": "","dob": "", 
  "licence":"","phone": "","address1": "","address2": "","suburb": "","state": "","postcode": ""};
  userData = {"access_token": "", "Name": "","Email": "","Id": "", "token_type":""};
  responseData : any;
  loader;
  signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthServiceProvider) {
    this.signupForm = formBuilder.group({
      firstName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ["", Validators.compose([Validators.maxLength(255), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"), Validators.required])],
      password: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
      dob: ["", Validators.compose([Validators.required])],
      licence: ["", Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])],
      phone: ["", Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[+0-9 ]*'), Validators.required])],
      address1: [""],
      address2: [""],
      suburb: [""],
      state: [""],
      postcode: ["", Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9 ]*')])]
    })
  }

  ionViewDidLoad() {
  }

  //loader function to stop the loader being called when it already exists
  // and dismissed when it doesn not exist
  showLoading() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "Registering account. Please wait...",
        });
        this.loader.present();
    }
  }

  dismissLoading(){
    if(this.loader){
        this.loader.dismiss();
        this.loader = null;
    }
  }


  signup(){
    this.enteredDetails.firstName = this.signupForm.value.firstName;
    console.log(this.enteredDetails.firstName);

    // loader caller here, could wrap this in the loader instead if wanted
    this.showLoading();
    
    // hard coded inputs for ease of build
    this.authService.postDataSignUp(this.signupForm.value.firstName, 
    this.signupForm.value.lastName,
    this.signupForm.value.email, 
    this.signupForm.value.password, 
    this.signupForm.value.dob, 
    this.signupForm.value.licence, 
    this.signupForm.value.phone, 
    this.signupForm.value.address1, 
    this.signupForm.value.address2, 
    this.signupForm.value.suburb, 
    this.signupForm.value.state, 
    this.signupForm.value.postcode).then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      
      //save collected info for later use
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
  
      this.dismissLoading();

      //this.navCtrl.push(LoginPage, {}, {animate: false});

    }, (err) => {

      // Error handling
      console.log("something fucked up");
        let alert = this.alertCtrl.create({
          title: 'No User Found',
          subTitle: 'The details entered don\'t match any registered users.' +
          'Please check you details and try again or signup!',
          buttons: [{
            text: 'Try again',
            handler: () => {
              this.dismissLoading();
            }
          },
          {
            text: 'Sign up',
            handler: () => {
              this.dismissLoading();
              this.navCtrl.push(SignupPage, {}, {animate: false});
            }
          }]
        });
        alert.present();
    });
  }

}
