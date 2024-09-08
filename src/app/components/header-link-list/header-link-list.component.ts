import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderLinksModel } from '../../shared/constants/routeLinks/header-links';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-link-list',
  standalone: true,
  imports: [
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    NgClass,
    RouterLinkActive,
    NgFor,
  ],
  templateUrl: './header-link-list.component.html',
  styleUrl: './header-link-list.component.scss',
})
export class HeaderLinkListComponent {
  @Input() headerLinks!: HeaderLinksModel[];
}
