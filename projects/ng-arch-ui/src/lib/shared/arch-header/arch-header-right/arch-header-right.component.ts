import { ArchUiAction } from '../../../models/ng-arch-ui-action';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-arch-header-right',
  templateUrl: './arch-header-right.component.html',
  styleUrls: ['./arch-header-right.component.scss']
})
export class ArchHeaderRightComponent implements OnInit {
  @Input() buttons: ArchUiAction[];

  constructor() { }

  ngOnInit() {
  }

}
