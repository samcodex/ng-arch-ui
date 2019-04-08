import { NgArchUiModule } from './ng-arch-ui.module';

describe('NgArchUiModule', () => {
  let archDesktopModule: NgArchUiModule;

  beforeEach(() => {
    archDesktopModule = new NgArchUiModule();
  });

  it('should create an instance', () => {
    expect(archDesktopModule).toBeTruthy();
  });
});
