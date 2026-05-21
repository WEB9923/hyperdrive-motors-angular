import { Component, computed, input, output } from '@angular/core';
import { LucideDynamicIcon, LucideIconInput, LucideLoader } from '@lucide/angular';

type Variants = 'primary' | 'secondary' | 'text' | 'destructive' | 'ghost';
type Sizes = 'default' | 'sm' | 'lg' | 'icon';

export const variants: Record<Variants, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  ghost: 'bg-transparent hover:bg-muted text-muted-foreground',
  text: 'text-foreground',
};

const sizes: Record<Sizes, string> = {
  default: 'h-9 px-2',
  sm: 'h-7 px-1',
  lg: 'h-11 px-3.5',
  icon: 'h-9 w-9',
};

const base: string = `
  flex items-center justify-center gap-1.5 rounded-radius font-medium cursor-pointer capitalize
  disabled:pointer-events-none disabled:opacity-60 hover:opacity-90
`;

@Component({
  selector: 'app-button',
  imports: [LucideDynamicIcon, LucideLoader],
  template: `
    <button
      [class]="classes()"
      [type]="type()"
      [disabled]="isDisabled()"
      (click)="handleClick($event)"
    >
      @if (loading()) {
        <svg
          lucideLoader
          class="animate-spin"
        ></svg>
      } @else if (startIcon()) {
        <svg [lucideIcon]="startIcon()"></svg>
      }
      <ng-content></ng-content>
    </button>
  `,
})
export class Button {
  variant = input<Variants>('primary');
  size = input<Sizes>('default');
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  classNames = input<string>('');

  startIcon = input<LucideIconInput | null>(null);

  onClick = output<MouseEvent>();

  isDisabled = computed((): boolean => this.disabled() || this.loading());
  classes = computed((): string =>
    `${base} ${variants[this.variant()]} ${sizes[this.size()]} ${this.classNames()}`.trim(),
  );

  handleClick(evt: MouseEvent): void {
    if (this.isDisabled()) return;

    this.onClick.emit(evt);
  }
}
