import { exhaustiveCheck } from '../../scripts/utilities/exhaustive-check.js';
import * as snackbar from '../snackbar/snackbar.js';

const $container = document.querySelector(
  '.js-verification',
) as HTMLFormElement;
if (!$container) throw new Error('Сontainer not found');

const $label = $container.querySelector('label');
const $input = $container.querySelector('input');
const $button = $container.querySelector('button');
const $buttonParent = $button?.parentElement as HTMLDivElement;
const $buttonText = $button?.lastElementChild as HTMLSpanElement;
if (!$label || !$input || !$button || !$buttonParent || !$buttonText)
  throw new Error('Element not found');

type Status = 'okay' | 'warning' | 'error';

const MESSAGE = {
  okay: $container.dataset['okayMessage'] ?? 'Code found',
  warning:
    $container.dataset['warningMessage'] ??
    'The code was found, but was checked earlier',
  error: $container.dataset['errorMessage'] ?? 'Code not found',
  invalid: $container.dataset['invalidMessage'] ?? 'Code is invalid',
} as const satisfies Record<Status | 'invalid', string>;

function isValid(code: string): boolean {
  return /^.{4}-.{3}$/.test(code);
}

async function getStatus(code: string): Promise<Status> {
  const isDevelopment = true;

  if (isDevelopment) {
    switch (code) {
      case '1111-111':
        return 'okay';
      case '2222-222':
        return 'warning';
      case '3333-333':
        return 'error';
      default:
        return 'error';
    }
  }

  return 'error';
}

$container.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!isValid($input.value)) {
    snackbar.show('error', MESSAGE.invalid);
    return;
  }

  if (snackbar.isShown()) {
    snackbar.hide();
  }

  const initialTextContent = $buttonText.textContent;

  $button.disabled = true;
  $buttonParent.classList.add('verification__button_in-loading');
  $buttonText.textContent = 'Wait';

  setTimeout(() => {
    getStatus($input.value)
      .then((status) => {
        switch (status) {
          case 'okay':
            snackbar.show('okay', MESSAGE.okay);
            break;
          case 'warning':
            snackbar.show('warning', MESSAGE.warning);
            break;
          case 'error':
            snackbar.show('error', MESSAGE.error);
            break;
          default:
            exhaustiveCheck(status);
            break;
        }
      })
      .catch((reason) => {
        snackbar.show('error', 'Something went wrong, try again later');
        // eslint-disable-next-line no-console
        console.error(reason);
      })
      .finally(() => {
        $button.disabled = false;
        $buttonParent.classList.remove('verification__button_in-loading');
        $buttonText.textContent = initialTextContent;
      });
  }, 300 * 2);
});

$label.classList.remove('verification__label_visually-hidden');

$input.placeholder = '';
$input.addEventListener('focus', () => {
  $label.classList.add('verification__label_on-top');
});
$input.addEventListener('blur', (event) => {
  if (
    event.currentTarget instanceof HTMLInputElement &&
    event.currentTarget.value === ''
  ) {
    $label.classList.remove('verification__label_on-top');
  }
});
$input.addEventListener('input', () => {
  if (snackbar.isShown()) {
    snackbar.hide();
  }
});
