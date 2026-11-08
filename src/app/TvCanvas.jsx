import { useLayoutEffect, useRef } from 'preact/hooks';

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export function TvCanvas({ children }) {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    function fitToWindow() {
      const scale = Math.min(window.innerWidth / CANVAS_WIDTH, window.innerHeight / CANVAS_HEIGHT);
      const offsetX = (window.innerWidth - CANVAS_WIDTH * scale) / 2;
      const offsetY = (window.innerHeight - CANVAS_HEIGHT * scale) / 2;
      canvasRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    }

    fitToWindow();
    window.addEventListener('resize', fitToWindow);
    return () => window.removeEventListener('resize', fitToWindow);
  }, []);

  return (
    <div class="fixed inset-0 overflow-hidden bg-canvas">
      <div
        ref={canvasRef}
        class="absolute top-0 left-0 h-[1080px] w-[1920px] origin-top-left overflow-hidden bg-canvas"
      >
        {children}
      </div>
    </div>
  );
}
