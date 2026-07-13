import { Component, inject } from '@angular/core';
import { SimpleHeaderComponent, BlogLayoutComponent } from '../../components';
import { ThemeService } from '../../services';
import { HeaderButton } from '../../models';

@Component({
  selector: 'lib-blog-container',
  imports: [BlogLayoutComponent],
  templateUrl: './blog.container.component.html',
  styleUrl: './blog.container.component.scss',
})
export class BlogContainerComponent {
  themeService = inject(ThemeService);
  menu: HeaderButton[] = [
    {
      label: 'Página Inicial',
      route: '/home',
      alt: 'Botão Página Inicial',
    },
    {
      label: 'Sobre nós',
      route: '/us',
      alt: 'Botão sobre nós',
    },
  ];
  loginButton: HeaderButton = {
    label: 'Entrar',
    route: '/login',
    alt: 'Botão de login',
  };
}
