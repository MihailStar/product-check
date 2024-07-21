const $container = document.querySelector('.js-snackbar') as HTMLDivElement;
if (!$container) throw new Error('Сontainer not found');

const $text = $container.lastElementChild as HTMLSpanElement;
if (!$text) throw new Error('Element not found');

let isHidden = true;

const modifiers = ['okay', 'warning', 'error'] as const;
type Modifier = (typeof modifiers)[number];

export function show(modifier: Modifier, message: string): void {
  $text.textContent = message;

  $container.classList.forEach((className) => {
    if (
      modifiers.some((mod) => new RegExp(`snackbar_${mod}$`).test(className))
    ) {
      $container.classList.remove(className);
    }
  });
  $container.classList.add(`snackbar_${modifier}`);
  $container.classList.remove('snackbar_hidden');
  setTimeout(() => {
    $container.classList.remove('snackbar_transparent');
  });

  isHidden = false;
}

export function hide(): void {
  if (isHidden) return;

  $container.addEventListener(
    'transitionend',
    () => {
      $container.classList.add('snackbar_hidden');
    },
    { once: true },
  );
  $container.classList.add('snackbar_transparent');

  isHidden = true;
}

export function isShown(): boolean {
  return !isHidden;
}

declare global {
  interface Window {
    vikingLabs: {
      snackbar: {
        isShown(): boolean;
      };
    };
  }
}

window.vikingLabs = {
  snackbar: {
    isShown,
  },
};
