import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Member } from '../members/member.model';
import { Kitty } from '../config-kitty/kitty.model';
import { CollectionModel } from '../collection/collection.model';

@Injectable({ providedIn: 'root' })
export class FirebaseStorageService {
    constructor(private http: HttpClient) { }
    // store kitty members
    storeMembers(members: Member[]) {
        const kittyMembers = members;
        this.http
            .put(
                'https://family-kitty.firebaseio.com/members.json',
                kittyMembers
            )
            .subscribe(response => {
                console.log(response);
            });
    }
    // get kitty members
    fetchMembers() {
        return this.http
            .get<Member[]>(
                'https://family-kitty.firebaseio.com/members.json'
            );
    }

    // save kitty config amount
    saveKittyConfig(kitty: Kitty) {
        const kittyConfig = kitty;
        this.http
            .put(
                'https://family-kitty.firebaseio.com/kitty.json',
                kittyConfig
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    // get kitty config amount
    fetchKittyConfig() {
        return this.http
            .get<Kitty>(
                'https://family-kitty.firebaseio.com/kitty.json'
            );
    }

    // save kitty collection amount
    saveKittyCollection(collection: CollectionModel) {
        const collectionDetails = collection;
        this.http
            .put(
                'https://family-kitty.firebaseio.com/collection/kitty/' + collection.timestamp + '.json',
                collectionDetails
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    // get kitty collection amount
    fetchKittyCollection() {
        return this.http
            .get<Kitty>(
                'https://family-kitty.firebaseio.com/collection/kitty.json'
            );
    }

    // save kitty collection amount
    savePunctualityCollection(collection: CollectionModel) {
        const collectionDetails = collection;
        this.http
            .put(
                'https://family-kitty.firebaseio.com/collection/punctuality/' + collection.timestamp + '.json',
                collectionDetails
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    // get kitty winners
    fetchWinners() {
        return this.http
            .get<Member[]>(
                'https://family-kitty.firebaseio.com/members.json'
            ).pipe(
                map((data) => {
                    const filteredData = data.filter((item) => item.status === 'Y');
                    return filteredData;
                }
                )
            );
    }
    fetchNonWinners() {
        return this.http
            .get<Member[]>(
                'https://family-kitty.firebaseio.com/members.json'
            ).pipe(
                map((data) => {
                    const filteredData = data.filter((item) => item.status !== 'Y');
                    return filteredData;
                }
                )
            );
    }
}
