import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { TabRoutingModule } from './tabs.routes';
import { Tab1Module } from '../tab1/tab1.module';



@NgModule({
  declarations: [
  ],
  imports: [
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    TabRoutingModule
  ]
})
export class TabsModule {
  constructor() { 
  }
 }
