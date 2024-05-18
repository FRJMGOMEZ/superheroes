import { Component } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LinksComponent } from './components/links/links.component';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports:[SidenavComponent,LinksComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {}
