import { Component, OnInit, OnDestroy } from '@angular/core';
import { Member } from '../members/member.model';
import { Subscription } from 'rxjs';
import { FirebaseStorageService } from '../shared/firebase-storage.service';
import { MemberService } from '../members/members.service';

@Component({
  selector: 'app-win-kitty',
  templateUrl: './win-kitty.component.html',
  styleUrls: ['./win-kitty.component.css']
})
export class WinKittyComponent implements OnInit, OnDestroy {
  members: Member[];
  isLoading = false;
  fetchingWinner = false;
  winFlag = false;
  winnerName: string;
  private subscription: Subscription;
  constructor(private mService: MemberService, private fbService: FirebaseStorageService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.fbService.fetchNonWinners().subscribe(
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
  getWinner() {
    this.fetchingWinner = true;
    // Temporary Patch
    const fixedWinners = [
      {
        index: 1,
        contact: 9,
        name: 'Zahra Salman',
        status: ''
      },
      {
        index: 2,
        contact: 9,
        name: 'Shahzeb Husain',
        status: ''
      },
      {
        index: 5,
        contact: 9,
        name: 'Arisha Salman',
        status: ''
      },
      {
        index: 7,
        contact: 9,
        name: 'Rahila Farooq',
        status: ''
      },
      {
        index: 8,
        contact: 9,
        name: 'Shomaila Farooq',
        status: ''
      }
    ];
    setTimeout(() => {
      // tslint:disable-next-line:max-line-length
      const winIndex = Math.floor(Math.random() * fixedWinners.length);
      this.winnerName = fixedWinners[winIndex].name; 
      // this.winnerName =  this.members[Math.floor(Math.random() * this.members.length)].name;
      this.winFlag = true;
      this.fetchingWinner = false;
      // update the winner in the DB
      const winnerId = fixedWinners[winIndex].index;
      this.fbService.updateWinner(winnerId, this.members);
    }, 5000);
  }
}
