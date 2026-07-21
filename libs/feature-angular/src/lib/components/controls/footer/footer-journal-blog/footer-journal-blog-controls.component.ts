import { Component } from '@angular/core';
import { ButtonNavigationInterface } from '../../../../models';

@Component({
  selector: 'lib-footer-journal-blog-controls ',
  imports: [],
  templateUrl: './footer-journal-blog-controls.component.html',
  styleUrl: './footer-journal-blog-controls.component.scss',
})
export class FooterJournalBlogControlComponent {
  readonly copyrightText = '© 2026 Pure Blog — Todos os direitos reservados';
  readonly listFooterButtons: ButtonNavigationInterface[] = [
    {
      altTitle: 'Sobre',
      title: 'Sobre',
      to: '#',
    },
    {
      altTitle: 'Anuncie',
      title: 'Anuncie',
      to: '#',
    },
    {
      altTitle: 'Contato',
      title: 'Contato',
      to: '#',
    },
  ];
}
