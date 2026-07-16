import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
//import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lib-blog-home-controls',
  imports: [MatListModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  templateUrl: './blog-home-controls.component.html',
  styleUrl: './blog-home-controls.component.scss',
})
export class BlogHomeControlsComponent {}
