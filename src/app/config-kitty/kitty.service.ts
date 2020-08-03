import { Injectable } from '@angular/core';
import { FirebaseStorageService } from '../shared/firebase-storage.service';
import { Kitty } from './kitty.model';
import { CollectionModel } from '../collection/collection.model';

@Injectable({ providedIn: 'root'})
export class KittyService {
    kitty: Kitty;
    collection: CollectionModel;
    constructor(public fbService: FirebaseStorageService) {}

    saveKittyAmount(kitty: Kitty) {
        this.kitty = kitty;
        this.fbService.saveKittyConfig(this.kitty);
    }

    saveKittyCollection(collection: CollectionModel) {
        this.collection = collection;
        this.fbService.saveKittyCollection(collection);
    }

    savePunctualityCollection(collection: CollectionModel) {
        this.collection = collection;
        this.fbService.savePunctualityCollection(collection);
    }
}
