import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  gameRating: number = 0;

  getColor(value: number): string {
    if(value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50'
    }else if (value > 50) {
      return '#f7aa38';
    }else {
      return '#ef4655';
    }
  }
}
