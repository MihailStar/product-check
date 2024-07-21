import Choices from 'choices.js';

const $container = document.querySelector('.js-language') as HTMLFormElement;
if (!$container) throw new Error('Сontainer not found');

const $select = $container.querySelector('select');
if (!$select) throw new Error('Element not found');

export const language = new Choices($select, {
  allowHTML: false,
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
  classNames: {
    containerOuter: 'choices',
    containerInner: 'choices__inner',
    input: 'choices__input',
    inputCloned: 'choices__input_cloned',
    list: 'choices__list',
    listItems: 'choices__list_multiple',
    listSingle: 'choices__list_single',
    listDropdown: 'choices__list_dropdown',
    item: 'choices__item',
    itemSelectable: 'choices__item_selectable',
    itemDisabled: 'choices__item_disabled',
    itemChoice: 'choices__item_choice',
    placeholder: 'choices__placeholder',
    group: 'choices__group',
    groupHeading: 'choices__heading',
    button: 'choices__button',
    activeState: 'is-active',
    focusState: 'is-focused',
    openState: 'is-open',
    disabledState: 'is-disabled',
    highlightedState: 'is-highlighted',
    selectedState: 'is-selected',
    flippedState: 'is-flipped',
    loadingState: 'is-loading',
    noResults: 'has-no-results',
    noChoices: 'has-no-choices',
  },
});

function highlightSelected(): void {
  // eslint-disable-next-line no-underscore-dangle
  language._highlightChoice(
    Array.from(
      language.dropdown.element.querySelectorAll<HTMLDListElement>(
        '[data-choice-selectable]',
      ),
    ).find(
      (selectable) =>
        selectable.dataset['value'] === language.passedElement.value,
    ),
  );
}

highlightSelected();

language.passedElement.element.addEventListener(
  'hideDropdown',
  highlightSelected,
);
