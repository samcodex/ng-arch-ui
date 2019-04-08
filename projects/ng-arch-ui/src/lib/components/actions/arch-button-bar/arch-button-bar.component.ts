import { Component, OnInit, Input } from '@angular/core';
import { ArchUiAction, ArchUiActionAct } from '../../../models/ng-arch-ui-action';

@Component({
  selector: 'arch-button-bar',
  templateUrl: './arch-button-bar.component.html',
  styleUrls: ['./arch-button-bar.component.scss']
})
export class ArchButtonBarComponent implements OnInit {
  @Input() buttons: ArchUiAction[];

  constructor() { }

  ngOnInit() {}

  onClick(button: ArchUiAction, event: Event) {
    event.stopPropagation();

    const that = button.that;
    const handler = button.handler;

    if (handler) {
      handler.call(that);
    }
  }

  cssClass(button: ArchUiAction) {
    let css = '';
    switch (button.act) {
      case ArchUiActionAct.Close: {
        css += ' close-button';
        break;
      }
      case ArchUiActionAct.Maximize: {
        css += ' maximize-button';
        break;
      }
      case ArchUiActionAct.Minimize: {
        css += ' minimize-button';
        break;
      }
    }

    return css;
  }
}
