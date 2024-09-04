import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLinksModel } from '../../shared/constants/routeLinks/header-links';

@Component({
  selector: 'app-header-link-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './header-link-list.component.html',
  styleUrl: './header-link-list.component.scss',
})
export class HeaderLinkListComponent {
  @Input() headerLinks!: HeaderLinksModel[];
}
