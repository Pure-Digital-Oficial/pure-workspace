import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { AnimatedIcon } from '../../../models';

@Component({
  selector: 'lib-animated-background',
  imports: [CommonModule, MatIcon],
  templateUrl: './animated-background.component.html',
  styleUrl: './animated-background.component.scss',
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
  @Input() icons: string[] = [];
  @Input() quantity = 20;
  @Input() minSize = 24;
  @Input() maxSize = 64;
  @Input() animationDuration = 20;

  animatedIcons: AnimatedIcon[] = [];
  private animationFrame = 0;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.icons.forEach((iconName) => {
      this.iconRegistry.addSvgIcon(
        iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(iconName)
      );
    });
    this.generateIcons();
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  generateIcons() {
    this.animatedIcons = [];

    for (let i = 0; i < this.quantity; i++) {
      const randomIcon =
        this.icons[Math.floor(Math.random() * this.icons.length)];
      const size = Math.random() * (this.maxSize - this.minSize) + this.minSize;

      this.animatedIcons.push({
        id: i,
        svgPath: randomIcon,
        size: size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: Math.random() * 10 + this.animationDuration,
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
      });
    }
  }

  startAnimation() {
    const updateIcons = () => {
      this.animatedIcons.forEach((icon) => {
        icon.top = (icon.top + Math.random() * 0.02) % 100;
        icon.left = (icon.left + Math.random() * 0.01 - 0.005) % 100;
        icon.rotation = (icon.rotation + 0.1) % 360;
      });

      this.animationFrame = requestAnimationFrame(updateIcons);
    };

    this.animationFrame = requestAnimationFrame(updateIcons);
  }

  getSafeUrl(path: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }
}
