import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from '../../members/member.model';
import { NgForm } from '@angular/forms';
import { FirebaseStorageService } from '../../shared/firebase-storage.service';
import { KittyService } from '../../config-kitty/kitty.service';
import { Kitty } from '../../config-kitty/kitty.model';
import { CollectionModel } from '../collection.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-collect-punctuality',
  templateUrl: './collect-punctuality.component.html',
  styleUrls: ['./collect-punctuality.component.css']
})
export class CollectPunctualityComponent implements OnInit {

  isLoading = false;
  startAt = new Date();

  @ViewChild('f', { static: false }) collectionForm: NgForm;

  subscription1: Subscription;
  subscription2: Subscription;
  punctualityCollectedMember: Member[] = [];
  collectedAmount = 0;
  punctualityConfigAmount = 0;
  collectionDate: string;
  members: Member[];
  constructor(
    private fbService: FirebaseStorageService,
    private kittyService: KittyService,
    private _snackBar: MatSnackBar
) { }

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
        this.punctualityConfigAmount = kitty.punctualityAmount;
      }
    );
  }
  valueChange(member, index, $event) {
    if ($event.checked) {
      this.punctualityCollectedMember.push(member);
    } else if (!$event.checked) {
      for (let i = this.punctualityCollectedMember.length - 1; i >= 0; i--) {
        if (this.members[index] === this.punctualityCollectedMember[i]) {
          this.punctualityCollectedMember.splice(i, 1);
        }
      }
    }
    this.collectedAmount = this.punctualityCollectedMember.length * this.punctualityConfigAmount;

  }

  onSubmit(form: NgForm) {

    const collection = new CollectionModel(this.punctualityCollectedMember.slice(), this.collectedAmount, this.collectionDate);
    this.kittyService.savePunctualityCollection(collection);
    this._snackBar.open('Details successfully saved', '', {
      duration: 3000
    });
  }

  onDateChange(date) {
    this.collectionDate = date.getTime();
  }

}
