import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogJournalComponent } from '../../headers';

export interface Story {
  eyebrow: string;
  title: string;
  dek?: string;
  author: string;
  readTime: string;
}

export interface ArticleCard {
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  accent?: 'ink' | 'mustard';
}

@Component({
  selector: 'lib-blog-layout',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    BlogJournalComponent,
  ],
  templateUrl: './blog-layout.component.html',
  styleUrl: './blog-layout.component.scss',
})
export class BlogLayoutComponent {
  readonly leadStory: Story = {
    eyebrow: 'Reportagem especial',
    title: 'A rua que virou praça: como um bairro reconquistou seu asfalto',
    dek: 'Em três anos, moradores da Vila Operária trocaram vagas de carro por bancos, sombra e uma feira semanal. O que mudou não foi só a paisagem.',
    author: 'Helena Marques',
    readTime: '12 min de leitura',
  };

  readonly secondaryStories: Story[] = [
    {
      eyebrow: 'Tecnologia',
      title: 'O algoritmo que decide qual árvore plantar em cada esquina',
      author: 'Tomás Ribeiro',
      readTime: '6 min',
    },
    {
      eyebrow: 'Ensaio',
      title: 'Contra a nostalgia fácil dos centros históricos',
      author: 'Clarice Andrade',
      readTime: '9 min',
    },
    {
      eyebrow: 'Entrevista',
      title: '"Toda calçada é uma decisão política", diz urbanista',
      author: 'Igor Salles',
      readTime: '7 min',
    },
  ];

  readonly articles: ArticleCard[] = [
    {
      tag: 'Cultura',
      title: 'As bibliotecas que viraram ponto de encontro noturno',
      excerpt:
        'Um levantamento em seis cidades mostra o novo horário de funcionamento que está mudando o hábito de leitura.',
      author: 'Renata Sousa',
      readTime: '5 min',
      accent: 'ink',
    },
    {
      tag: 'Economia',
      title: 'Aluguel comercial cai no centro, mas ninguém comemora ainda',
      excerpt:
        'Vacância recorde reabre debate sobre conversão de escritórios em moradia.',
      author: 'Daniel Prado',
      readTime: '8 min',
      accent: 'mustard',
    },
    {
      tag: 'Tecnologia',
      title: 'Sensores de ruído chegam aos postes de mais um bairro',
      excerpt:
        'Projeto piloto promete mapear poluição sonora em tempo real — e gerar multas automáticas.',
      author: 'Beatriz Lima',
      readTime: '4 min',
      accent: 'ink',
    },
    {
      tag: 'Cidades',
      title: 'O mapa informal que motoristas de aplicativo desenham todo dia',
      excerpt:
        'Rotas alternativas viraram conhecimento coletivo — e ninguém sabe muito bem onde guardá-lo.',
      author: 'Marcelo Tavares',
      readTime: '10 min',
      accent: 'mustard',
    },
    {
      tag: 'Ensaios',
      title: 'Elogio ao banco de praça vazio',
      excerpt:
        'Nem todo espaço público precisa estar cheio para ser bem-sucedido. Uma defesa da lentidão urbana.',
      author: 'Clarice Andrade',
      readTime: '6 min',
      accent: 'ink',
    },
    {
      tag: 'Entrevistas',
      title: '"A gente projeta prédio, mas devia projetar vizinhança"',
      excerpt:
        'Arquiteta premiada fala sobre os limites do desenho urbano isolado da vida real.',
      author: 'Igor Salles',
      readTime: '11 min',
      accent: 'mustard',
    },
  ];

  readonly emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private readonly snackBar: MatSnackBar) {}

  subscribe(): void {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }
    this.snackBar.open('Inscrição confirmada. Até amanhã de manhã.', 'Fechar', {
      duration: 3500,
    });
    this.emailControl.reset();
  }
}
