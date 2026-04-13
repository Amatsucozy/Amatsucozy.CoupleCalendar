import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { EventService } from './services/event.service';
import { MockEventService } from './services/mock-event.service';

@NgModule({
  imports: [],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: EventService, useClass: MockEventService }],
    };
  }
}
