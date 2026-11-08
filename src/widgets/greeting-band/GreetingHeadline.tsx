import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';

type GreetingHeadlineProps = {
  options: readonly string[];
};

export function GreetingHeadline({ options }: GreetingHeadlineProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [optionIndex, setOptionIndex] = useState(0);
  const optionsKey = options.join('|');

  useLayoutEffect(() => setOptionIndex(0), [optionsKey]);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const isOverflowing = heading.scrollWidth > heading.clientWidth;
    if (isOverflowing && optionIndex < options.length - 1) setOptionIndex(optionIndex + 1);
  }, [optionIndex, optionsKey, options.length]);

  useEffect(() => {
    let isMounted = true;
    document.fonts.ready.then(() => {
      if (isMounted) setOptionIndex(0);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <h1
      ref={headingRef}
      class="w-full max-w-[1200px] overflow-hidden font-serif text-display whitespace-nowrap"
    >
      {options[optionIndex] ?? ''}
    </h1>
  );
}
