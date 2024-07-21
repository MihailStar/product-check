const $container = document.querySelector('.js-background') as HTMLDivElement;
if (!$container) throw new Error('Сontainer not found');

const $images = $container.firstElementChild as HTMLDivElement;
if (!$images) throw new Error('Element not found');

/** @tutorial https://atuin.ru/blog/parallaks-effekt-pri-dvizhenii-myshi */
function handlePointermove(event: PointerEvent): void {
  if (event.pointerType !== 'mouse') return;

  const xOffset = Math.round((event.clientX / window.innerWidth) * 30);
  const yOffset = Math.round((event.clientY / window.innerHeight) * 30);

  $images.style.transform = `translate(-${xOffset}px, -${yOffset}px)`;
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', handlePointermove);
}
