import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseStorageService } from '../../shared/firebase-storage.service';
import { Subscription } from 'rxjs';
import { Member } from '../../members/member.model';
import { Kitty } from '../../config-kitty/kitty.model';
import { NgForm } from '@angular/forms';
import { KittyService } from '../../config-kitty/kitty.service';
import { CollectionModel } from '../collection.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-collect-kitty',
  templateUrl: './collect-kitty.component.html',
  styleUrls: ['./collect-kitty.component.css']
})
export class CollectKittyComponent implements OnInit {
  isLoading = false;
  startAt = new Date();

  @ViewChild('f', { static: false }) collectionForm: NgForm;
  @ViewChild('calendar', { static: false }) datePicker: ElementRef;

  subscription1: Subscription;
  subscription2: Subscription;
  kittyCollectedMember: Member[] = [];
  collectedAmount = 0;
  kittyConfigAmount = 0;
  collectionDate: string;
  members: Member[];
  constructor(
    private fbService: FirebaseStorageService,
    private kittyService: KittyService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.isLoading = true;
    this.subscription1 = this.fbService.fetchMembers().subscribe(
      (members: Member[]) => {
        this.members = members;
        this.isLoading = false;
      }
    );

    this.subscription2 = this.fbService.fetchKittyConfig().subscribe(
      (kitty: Kitty) => {
        this.kittyConfigAmount = kitty.kittyAmount;
      }
    );
  }
  valueChange(member, index, $event) {
    if ($event.checked) {
      this.kittyCollectedMember.push(member);
    } else if (!$event.checked) {
      for (let i = this.kittyCollectedMember.length - 1; i >= 0; i--) {
        if (this.members[index] === this.kittyCollectedMember[i]) {
          this.kittyCollectedMember.splice(i, 1);
        }
      }
    }
    this.collectedAmount = this.kittyCollectedMember.length * this.kittyConfigAmount;

  }

  onSubmit(form: NgForm) {

    const collection = new CollectionModel(this.kittyCollectedMember.slice(), this.collectedAmount, this.collectionDate);
    this.kittyService.saveKittyCollection(collection);
    this._snackBar.open('Details successfully saved', '', {
      duration: 3000
    });
  }

  onDateChange(date) {
    this.collectionDate = (date.getMonth() + 1).toString() + '_' + date.getFullYear();
    console.log(this.collectionDate);
  }
}
