import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform, ToastController } from 'ionic-angular';
import {  Http, Headers, RequestOptions } from '@angular/http';
import currency_codes from 'currency-codes';
import 'rxjs/add/operator/map';

/**
 * Generated class for the CurrencyConverterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'converter'
})

@Component({
  selector: 'converter',
  templateUrl: 'converter.html',
})

export class CurrencyConverter {
  currencies = [];
  from_currency: string = "USD";
  to_currency: string = "INR";
  entered_amount: number;
  converted_amount: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadCtrl: LoadingController, public alertCtrl: AlertController, public plt: Platform, private toastCtrl: ToastController) {
    this.currencies = currency_codes.codes();
    let toast = this.toastCtrl.create({
      message: 'Welcome in Currency Converter Application',
      duration: 3000,
      position: 'middle',
      cssClass: 'welcome-toast',
      showCloseButton: true,
      closeButtonText: 'X',
      dismissOnPageChange: true
    });
    toast.present();
  }

 /**
  * Convert the entered amount
  */
  convertAmount() {
    let query_string = this.from_currency+'_'+this.to_currency;
    let api_url = 'http://free.currencyconverterapi.com/api/v5/convert?q='+query_string+'&compact=ultra';
    let loader = this.loadCtrl.create({
       spinner: 'ios',
       content: "Converting amount...",
       dismissOnPageChange: true
    });
    loader.present();
    this.http.get(api_url, {})
    .map(res => res.json())
    .subscribe(data => {
      loader.dismiss();
      this.converted_amount = this.entered_amount * data[query_string];
    },
    error => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Problem',
      	subTitle: 'Unable to get converted Amount',
        buttons: ['OK']
      });
      alert.present();
    });
  }

 /**
  *
  */
  exitApp() {
  }
}