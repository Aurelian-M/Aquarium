

import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import useAquariumAnimation from '../adminComponents/useAquariumAnimation';

export interface AquariumItem {
  id: number;
  uuid: string;
  name: string;
  image: string;
  category: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

const AquariumCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null >(null);
  const [aquariumItems, setAquariumItems] = useState<AquariumItem[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'AQUARIUM_ITEM',
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        const dropOffset = monitor.getClientOffset();
        if (canvasRef.current && dropOffset) {
          const rect = canvasRef.current.getBoundingClientRect();
          const newX = dropOffset.x - rect.left;
          const newY = dropOffset.y - rect.top;

          const isFish = item.category === 'fishes';
          const isPlant = item.category === 'plants';

          const newItem: AquariumItem = {
            ...item,
            uuid: uuidv4(),
            x: newX,
            y: isPlant ? canvasRef.current.height - 40 : newY,
            dx: isFish ? (Math.random() - 0.5) * 1.5 : 0,
            dy: isFish ? (Math.random() - 0.5) * 1.5 : 0,
          };

          setAquariumItems((prev) => [...prev, newItem]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useAquariumAnimation({
    canvasRef,
    items: aquariumItems,
    setItems: setAquariumItems,
    isOver,
  });

  return drop(
    <div
      style={{
        width: '90vw',
        height: '80vh',
        position: 'absolute',
        bottom: '2rem',
        left: '4rem',
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '8px solid rgba(206, 226, 255, 0.6)',
        borderRadius: '20px',
        boxShadow:
          'inset 0 0 10px rgba(255, 255, 255, 0.3), 0 8px 16px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(4px)',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: '12px',
        }}
      />
    </div>
  );
};

export default AquariumCanvas;
