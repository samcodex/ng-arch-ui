import { Component, OnInit, Input } from '@angular/core';

import { ArchUiAction } from './../../../models/ng-arch-ui-action';

@Component({
  selector: 'ng-arch-dropdown',
  templateUrl: './arch-dropdown.component.html',
  styleUrls: ['./arch-dropdown.component.scss']
})
export class ArchDropdownComponent implements OnInit {
  @Input()
  uiActions: ArchUiAction[];

  constructor() { }

  ngOnInit() {
  }

}
