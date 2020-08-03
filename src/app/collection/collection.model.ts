import { Member } from '../members/member.model';

export class CollectionModel {
    constructor(public members: Member[], public amount: number, public timestamp?: string) { }
}
