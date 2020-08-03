import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Member } from '../member.model';
import { Subscription, Observable } from 'rxjs';
import { MemberService } from '../members.service';
import { FirebaseStorageService } from '../../shared/firebase-storage.service';
import { trigger, state, style, keyframes, animate, transition, group } from '@angular/animations';
import { NgForm, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-winner-list',
  templateUrl: './winner-list.component.html',
  styleUrls: ['./winner-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ]),
  ]
})
export class WinnerListComponent implements OnInit, OnDestroy {
  members: Member[];
  isLoading = false;
  private subscription: Subscription;
  constructor(private mService: MemberService, private fbService: FirebaseStorageService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.fbService.fetchWinners().subscribe(
      (members: Member[]) => {
        this.members = members;
        this.mService.setMember(members);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
