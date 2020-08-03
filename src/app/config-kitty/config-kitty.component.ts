import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KittyService } from './kitty.service';
import { Kitty } from './kitty.model';
import { Subscription } from 'rxjs';
import { FirebaseStorageService } from '../shared/firebase-storage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-config-kitty',
  templateUrl: './config-kitty.component.html',
  styleUrls: ['./config-kitty.component.css']
})
export class ConfigKittyComponent implements OnInit {
  @ViewChild('f', { static: false }) configForm: NgForm;
  subscription: Subscription;
  isLoading = false;
  successMessage: string;

  constructor(
    public kittyService: KittyService,
    public fbService: FirebaseStorageService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.fbService.fetchKittyConfig().subscribe(
      (kitty: Kitty) => {
        this.configForm.setValue({
          kittyAmount: kitty.kittyAmount,
          gameAmount: kitty.gameAmount,
          punctualityAmount: kitty.punctualityAmount,
          foodAmount: kitty.foodAmount
        });
        this.isLoading = false;
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const kitty = new Kitty(value.kittyAmount, value.gameAmount, value.foodAmount, value.punctualityAmount);
    this.kittyService.saveKittyAmount(kitty);
    this._snackBar.open('Details successfully saved', '', {
      duration: 3000
    });
  }
}
