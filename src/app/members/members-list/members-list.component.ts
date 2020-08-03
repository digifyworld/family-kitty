import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberService } from '../members.service';
import { Member } from '../member.model';
import { Subscription } from 'rxjs';
import { FirebaseStorageService } from '../../shared/firebase-storage.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
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
export class MembersListComponent implements OnInit, OnDestroy {

  members: Member[];
  isLoading = false;
  private subscription: Subscription;
  constructor(private mService: MemberService, private fbService: FirebaseStorageService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.fbService.fetchMembers().subscribe(
      (members: Member[]) => {
        this.members = members;
        this.mService.setMember(members);
        this.isLoading = false;
      }
    );
  }

  onEditItem(index: number) {
    this.mService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
