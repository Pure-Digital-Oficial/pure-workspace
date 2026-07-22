import { Component } from '@angular/core';
import { ButtonNavigationInterface } from '../../../../models';

@Component({
  selector: 'lib-blog-journal-footer',
  imports: [],
  templateUrl: './blog-journal-footer-controls.component.html',
  styleUrl: './blog-journal-footer-controls.component.scss',
})
export class BlogJournalFooterControlComponent {
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
