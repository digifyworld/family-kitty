import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MemberService } from './members.service';
import { Member } from './member.model';



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) memberForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Member;
  isLoading = false;

  constructor(private mService: MemberService) { }

  ngOnInit(): void {
    this.subscription = this.mService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.mService.getMember(index);
          this.memberForm.setValue({
            name: this.editedItem.name,
            contact: this.editedItem.contact
          });
        }
      );
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const newMember = new Member(value.name, value.contact);
    if (this.editMode) {
      this.mService.updateMember(this.editedItemIndex, newMember);
    } else {
      this.mService.addMember(newMember);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.memberForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.mService.deleteMember(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

