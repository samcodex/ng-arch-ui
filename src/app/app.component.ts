import { UiExampleDesktopComponent } from './ui-components/ui-example-desktop/ui-example-desktop.component';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgArchUiService } from 'ng-arch-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    NgArchUiService
  ]
})
export class AppComponent implements OnInit {
  title = 'NgArchUI Example';

  constructor(
    private resolver: ComponentFactoryResolver,
    private ngArchUiService: NgArchUiService
  ) {
  }

  ngOnInit() {
    this.ngArchUiService.registerResolver(this.resolver);
    this.ngArchUiService.assignDesktopComponentClass(UiExampleDesktopComponent);
  }
}
