import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [SiteHeaderComponent, SiteFooterComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [SiteHeaderComponent, SiteFooterComponent]
})
export class LayoutModule {}
