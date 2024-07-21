/**
 * @version 1.0.0
 * @tutorial https://github.com/panoply/handorgel/commit/e23e616117bc836f4e37bee2f7ae2c10c53a9e08
 */
declare module 'handorgel' {
  export type AccordionEvent =
    /**
     * Accordeon is about to be destroyed
     */
    | 'destroy'

    /**
     * Accordeon has been destroyed
     */
    | 'destroyed';

  export type FoldEvent =
    /**
     * Fold is about to be opened
     */
    | 'fold:open'

    /**
     * Fold has opened
     */
    | 'fold:opened'

    /**
     * Fold is about to be closed
     */
    | 'fold:close'

    /**
     * Fold has closed
     */
    | 'fold:closed'

    /**
     * Fold button has been focused
     */
    | 'fold:focus'

    /**
     * Fold button has lost focus
     */
    | 'fold:blur';

  export type HandorgelEvent = AccordionEvent | FoldEvent;

  export interface HandorgelOptions {
    /**
     * Whether multiple folds can be opened at once
     * (default: `true`)
     */
    multiSelectable?: boolean;

    /**
     * Whether the folds are collapsible
     * (default: `true`)
     */
    collapsible?: boolean;

    /**
     * Whether ARIA attributes are enabled
     * (default: `true`)
     */
    ariaEnabled?: boolean;

    /**
     * Whether W3C keyboard shortcuts are enabled
     * (default: `true`)
     */
    keyboardInteraction?: boolean;

    /**
     * Whether to loop header focus
     * (sets focus back to first/last header when end/start reached)
     * (default: `true`)
     */
    carouselFocus?: boolean;

    /**
     * Attribute for the header or content to open folds at initialization
     * (default: `'data-open'`)
     */
    initialOpenAttribute?: string;

    /**
     * Whether to use transition at initial open
     * (default: `true`)
     */
    initialOpenTransition?: boolean;

    /**
     * Delay used to show initial transition
     * (default: `200`)
     */
    initialOpenTransitionDelay?: number;

    /**
     * Header element selectors or array of elements
     * (default: `'.handorgel__header'`)
     */
    headerElements?: string | Element[];

    /**
     * Content element selectors or array of elements
     * (default: `'.handorgel__content'`)
     */
    contentElements?: string | Element[];

    /**
     * Header class if fold is open
     * (default: `'handorgel__header--open'`)
     */
    headerOpenClass?: string;

    /**
     * Content class if fold is open
     * (default: `'handorgel__content--open'`)
     */
    contentOpenClass?: string;

    /**
     * Header class if fold has been opened
     * (transition finished)
     * (default: `'handorgel__header--opened'`)
     */
    headerOpenedClass?: string;

    /**
     * Content class if fold has been opened
     * (transition finished)
     * (default: `'handorgel__content--opened'`)
     */
    contentOpenedClass?: string;

    /**
     * Header class if fold has been focused
     * (default: `'handorgel__header--focus'`)
     */
    headerFocusClass?: string;

    /**
     * Content class if fold has been focused
     * (default: `'handorgel__content--focus'`)
     */
    contentFocusClass?: string;

    /**
     * Header class if fold is disabled
     * (default: `'handorgel__header--disabled'`)
     */
    headerDisabledClass?: string;

    /**
     * Content class if fold is disabled
     * (default: `'handorgel__content--disabled'`)
     */
    contentDisabledClass?: string;
  }

  export interface HandorgelFold {
    /**
     * Open content
     * @param transition Whether transition should be active during opening
     * (default: `true`)
     */
    open(transition = true): void;

    /**
     * Close content
     * @param transition Whether transition should be active during closing
     * (default: `true`)
     */
    close(transition = true): void;

    /**
     * Toggle content
     * @param transition Whether transition should be active during toggling
     * (default: `true`)
     */
    toggle(transition = true): void;

    /**
     * Disable fold
     */
    disable(): void;

    /**
     * Enable fold
     */
    enable(): void;

    /**
     * Set focus to fold button
     */
    focus(): void;

    /**
     * Remove focus from fold button
     */
    blur(): void;

    /**
     * Remove event listeners and ARIA attributes
     */
    destroy(): void;
  }

  export default class Handorgel {
    /**
     * Panel Folds
     */
    public folds: HandorgelFold[];

    public constructor(element: Element, options?: HandorgelOptions);

    /**
     * Update fold instances
     * (use if you dynamically append/remove DOM nodes)
     */
    public update(): void;

    /**
     * Set focus to a new header button
     * (you can also directly use the native `focus()` method on the button)
     * @param target New header button to focus
     * (`'prev'`, `'next'`, `'first'`, `'last'`)
     */
    public focus(target: 'prev' | 'next' | 'first' | 'last'): void;

    /**
     * Destroy fold instances, remove event listeners and ARIA attributes
     */
    public destroy(): void;

    /**
     * Listen for event
     */
    public on<E extends HandorgelEvent>(
      event: E,
      fn?: E extends FoldEvent ? (fold: HandorgelFold) => void : () => void,
    ): void;

    /**
     * Listen for event once
     */
    public once<E extends HandorgelEvent>(
      event: E,
      fn?: E extends FoldEvent ? (fold: HandorgelFold) => void : () => void,
    ): void;

    /**
     * Remove event listener
     */
    public off<E extends HandorgelEvent>(
      event: E,
      fn?: E extends FoldEvent ? (fold: HandorgelFold) => void : () => void,
    ): void;
  }
}
