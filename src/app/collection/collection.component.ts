import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  selected = 'none';
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  navigateTo(value) {
    if (value) {
      this.router.navigate([value], { relativeTo: this.route });
    }
    return false;
  }
}
