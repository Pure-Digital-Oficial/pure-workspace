import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SectionBlogInterface } from '../../../models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-blog-journal-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './blog-journal-header.component.html',
  styleUrl: './blog-journal-header.component.scss',
})
export class BlogJournalComponent {
  readonly editionLabel = 'Terça-feira, 14 de julho de 2026 — Edição nº 1.847';

  readonly sections: SectionBlogInterface[] = [
    { label: 'Capa', active: true },
    { label: 'Cidades' },
    { label: 'Tecnologia' },
    { label: 'Cultura' },
    { label: 'Economia' },
    { label: 'Ensaios' },
    { label: 'Entrevistas' },
    { label: 'Arquivo' },
  ];

  readonly tickerItems: string[] = [
    'Prefeitura anuncia plano de arborização para o centro histórico',
    'Estudo aponta queda no uso de carro em capitais europeias',
    'Nova safra de arquitetos discute moradia acessível em painel aberto ao público',
    'Editorial: o que os museus perdem quando viram cenário para fotos',
  ];
}
