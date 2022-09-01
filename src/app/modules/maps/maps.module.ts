import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { SearcherComponent } from './pages/searcher/searcher.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [SearcherComponent],
  imports: [
    CommonModule,
    SharedModule,
    MapsRoutingModule,
    HttpClientJsonpModule
  ],
  exports: [SearcherComponent]
})
export class MapsModule {}
