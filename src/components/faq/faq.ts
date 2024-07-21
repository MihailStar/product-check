import Handorgel from 'handorgel';

const $container = document.querySelector('.js-faq') as HTMLDivElement;
if (!$container) throw new Error('Сontainer not found');

const faq = new Handorgel($container, {
  initialOpenTransition: false,
  initialOpenTransitionDelay: 0,

  headerOpenClass: 'handorgel__header_open',
  headerOpenedClass: 'handorgel__header_opened',
  headerFocusClass: 'handorgel__header_in-focus',
  headerDisabledClass: 'handorgel__header_disabled',

  contentOpenClass: 'handorgel__content_open',
  contentOpenedClass: 'handorgel__content_opened',
  contentDisabledClass: 'handorgel__content_disabled',
  contentFocusClass: 'handorgel__content_in-focus',
});

/** @todo Обновить interface `HandorgelFold` */
type Fold = Handorgel['folds'][number] & {
  button: HTMLButtonElement;
  content: HTMLDivElement;
};

faq.on('fold:open', (fold) => {
  (fold as Fold).button.classList.add(
    'handorgel__header__button_with-rotated-icon',
  );
});

faq.on('fold:close', (fold) => {
  (fold as Fold).button.classList.remove(
    'handorgel__header__button_with-rotated-icon',
  );
});
