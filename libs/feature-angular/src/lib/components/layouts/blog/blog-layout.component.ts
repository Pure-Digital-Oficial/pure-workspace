import { Component, Input } from '@angular/core';
import { SimpleHeaderComponent } from '../../headers';
import { HeaderButton } from '../../../models';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'lib-blog-layout',
  imports: [SimpleHeaderComponent, MatDividerModule],
  templateUrl: './blog-layout.component.html',
  styleUrl: './blog-layout.component.scss',
})
export class BlogLayoutComponent {
  @Input() menuButtons: HeaderButton[] = [];
  @Input() rightButton: HeaderButton = {} as HeaderButton;
}
