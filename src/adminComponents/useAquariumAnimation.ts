

import { useEffect, useRef } from 'react';
import { type AquariumItem } from '../components/AquariumCanvas';

const imageCache: { [src: string]: HTMLImageElement } = {};

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  items: AquariumItem[];
  setItems: React.Dispatch<React.SetStateAction<AquariumItem[]>>;
  isOver: boolean;
}

const useAquariumAnimation = ({
  canvasRef,
  items,
  setItems,
  isOver,
}: Props) => {
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isOver ? 'rgba(173, 216, 230, 0.8)' : 'rgba(179, 218, 255, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* const fishItems = items.filter((i) => i.category === 'fishes'); */
      const foodItems = items.filter((i) => i.category === 'food');

      /* const updatedItems = items.map((item) => { */
      items.forEach((item) => {
        const size = 50;

        // 🐟 Make fish move toward food
        if (item.category === 'fishes' && foodItems.length > 0) {
          const food = foodItems[0]; // Target first food item
          const dx = food.x - item.x;
          const dy = food.y - item.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 10) {
            // 🧽 Fish reached food — remove it
            setItems((prev) => prev.filter((i) => i.uuid !== food.uuid));
          } else {
            // 🧭 Swim toward food
            const speed = 0.75;
            item.dx = (dx / dist) * speed;
            item.dy = (dy / dist) * speed;
          }
        }

        // 🐟 Regular fish movement
        if (item.category === 'fishes') {
          item.x += item.dx;
          item.y += item.dy;

          if (item.x + size / 2 > canvas.width || item.x - size / 2 < 0) {
            item.dx *= -1;
          }
          if (item.y + size / 2 > canvas.height || item.y - size / 2 < 0) {
            item.dy *= -1;
          }
        }

        let img = imageCache[item.image];
        if (!img) {
          img = new Image();
          img.src = item.image;
          imageCache[item.image] = img;
        }

        if (img.complete) {
          ctx.drawImage(img, item.x - size / 2, item.y - size / 2, size, size);
        } else {
          img.onload = () => {
            ctx.drawImage(img, item.x - size / 2, item.y - size / 2, size, size);
          };
        }

        return item;
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [items, canvasRef, isOver, setItems]);
};

export default useAquariumAnimation;
