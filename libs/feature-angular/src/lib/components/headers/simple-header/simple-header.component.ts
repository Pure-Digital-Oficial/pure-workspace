import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderButton } from '../../../models';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeColorControlsComponent } from '../../controls';

@Component({
  selector: 'lib-simple-header',
  imports: [
    MatToolbarModule,
    RouterLinkWithHref,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ThemeColorControlsComponent,
  ],
  templateUrl: './simple-header.component.html',
  styleUrl: './simple-header.component.scss',
})
export class SimpleHeaderComponent {
  @Input() logo = '';
  @Input() menuButtons: HeaderButton[] = [];
  @Input() rightButton?: HeaderButton;
}
