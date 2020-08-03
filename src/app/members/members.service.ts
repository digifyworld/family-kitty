import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Member } from './member.model';
import { FirebaseStorageService } from '../shared/firebase-storage.service';

@Injectable({ providedIn: 'root' })
export class MemberService {
  membersChanged = new Subject<Member[]>();
  startedEditing = new Subject<number>();

  private members: Member[] = [];

  constructor(public fbService: FirebaseStorageService) {}

  setMember(members: Member[]) {
    this.members = members;
    this.membersChanged.next(this.members.slice());
  }

  getMembers() {
    return this.members.slice();
  }

  getMember(index: number) {
    return this.members[index];
  }


  addMember(member: Member) {
    this.members.push(member);
    this.membersChanged.next(this.members.slice());
    this.fbService.storeMembers(this.members);
  }

  updateMember(index: number, updatedMember: Member) {
    this.members[index] = updatedMember;
    this.membersChanged.next(this.members.slice());
    this.fbService.storeMembers(this.members);
  }

  deleteMember(index: number) {
    this.members.splice(index, 1);
    this.membersChanged.next(this.members.slice());
    this.fbService.storeMembers(this.members);
  }
}
