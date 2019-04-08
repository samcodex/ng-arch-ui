import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'arch-header-center',
  templateUrl: './arch-header-center.component.html',
  styleUrls: ['./arch-header-center.component.scss']
})
export class ArchHeaderCenterComponent implements OnInit {
  @Input() title = 'Title';

  constructor() { }

  ngOnInit() {
  }

}
