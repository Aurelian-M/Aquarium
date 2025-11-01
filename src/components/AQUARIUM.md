

import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type ItemType = 'fish' | 'plant' | 'food';

interface SupportItem {
  id: string;
  type: ItemType;
  label: string;
}

interface AquariumItem {
  id: string;
  srcId: string;
  type: ItemType;
  x: number;
  y: number;
  speedX?: number;
  speedY?: number;
  facingLeft?: boolean;
}

const SupportPanel: React.FC<{
  supportItems: SupportItem[];
}> = ({ supportItems }) => {
  return (
    <div style={{ minWidth: 150, padding: '1rem', background: '#ddd' }}>
      <h3>Cart Items (Drag to Aquarium)</h3>
      {supportItems.map((item) => (
        <DraggableSupport key={item.id} item={item} />
      ))}
    </div>
  );
};

 const DraggableSupport: React.FC<{ item: SupportItem }> = ({ item }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ ,drag] = useDrag(() => ({
    type: 'support',
    item,
  }));

useEffect(() => {
  if (ref.current) {
    drag(ref);
  }
}, [drag]);

  return (
    <div
      ref={ref}
      style={{
        margin: '0.5rem 0',
        padding: '0.5rem 1rem',
        background: '#fff',
        border: '1px solid #aaa',
        cursor: 'grab',
      }}
    >
      {item.label}
    </div>
  );
}; 



const AquariumCanvas: React.FC<{
  aquariumItems: AquariumItem[];
  setAquariumItems: React.Dispatch<React.SetStateAction<AquariumItem[]>>;
  supportItems: SupportItem[];
}> = ({ aquariumItems, setAquariumItems, supportItems }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [, dropSupport] = useDrop({
    accept: 'support' as const,
    drop: (dragObj: SupportItem, monitor) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      const cl = monitor.getClientOffset();
      if (!canvasRect || !cl) return;

      const x = cl.x - canvasRect.left;
      const y = cl.y - canvasRect.top;

      setAquariumItems((prev) => [
        ...prev,
        {
          id: `${dragObj.id}-${Date.now()}`,
          srcId: dragObj.id,
          type: dragObj.type,
          x,
          y,
          ...(dragObj.type === 'fish'
            ? {
                speedX: (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
                speedY: (Math.random() * 0.2 - 0.1),
                facingLeft: Math.random() > 0.5,
              }
            : {}),
        },
      ]);
    },
  });

  const removeItem = (item: AquariumItem) => {
    setAquariumItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setAquariumItems((prev) => {
        const canvas = canvasRef.current;
        if (!canvas) return prev;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const food = prev.find((i) => i.type === 'food');
        let foodEaten = false;

        const updated = prev.map((item) => {
          if (item.type === 'fish' && item.speedX !== undefined && item.speedY !== undefined) {
            let { x, y, speedX, speedY, facingLeft } = item;

            if (food && !foodEaten) {
              const dx = food.x - x;
              const dy = food.y - y;
              const dist = Math.hypot(dx, dy);

              if (dist < 12) {
                foodEaten = true;
              } else {
                const chaseSpeed = 2.5;
                speedX = (dx / dist) * chaseSpeed;
                speedY = (dy / dist) * chaseSpeed;
                facingLeft = speedX < 0;
                x += speedX;
                y += speedY;
                return { ...item, x, y, speedX, speedY, facingLeft };
              }
            }

            // Natural swim
            x += speedX;
            if (x <= 0) {
              x = 0;
              speedX = Math.abs(speedX);
              facingLeft = false;
            } else if (x >= w - 30) {
              x = w - 30;
              speedX = -Math.abs(speedX);
              facingLeft = true;
            }

            speedY += (Math.random() - 0.5) * 0.05;
            speedY = Math.max(-0.2, Math.min(0.2, speedY));
            y += speedY;
            y = Math.max(0, Math.min(h - 30, y));

            return { ...item, x, y, speedX, speedY, facingLeft };
          }
          return item;
        });

        const final = foodEaten ? updated.filter((i) => i.type !== 'food') : updated;
        return final;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={(node) => {
        dropSupport(node);
        canvasRef.current = node!;
      }}
      style={{
        position: 'relative',
        width: '80vw',
        height: '70vh',
        background: 'lightblue',
        border: '3px solid #333',
        marginTop: '1rem',
        overflow: 'hidden',
      }}
    >
      {aquariumItems.map((item) => (
        <DraggableAquariumItem key={item.id} item={item} onRemove={() => removeItem(item)} />
      ))}
    </div>
  );
};



  const DraggableAquariumItem: React.FC<{ item: AquariumItem; onRemove: () => void }> = ({ item, onRemove }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type,
    item: { id: item.id, type: item.type },
    end: (_draggedItem, monitor) => {
      if (!monitor.didDrop()) {
        onRemove();
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [drag]);

  const flip = item.type === 'fish' && item.facingLeft ? 'scaleX(-1)' : 'scaleX(1)';
  const style: React.CSSProperties = {
    position: 'absolute',
    left: item.x,
    top: item.y,
    transform: flip,
    fontSize: item.type === 'fish' ? '1.5rem' : item.type === 'plant' ? '2rem' : '1rem',
    cursor: 'move',
  };
  const symbol = item.type === 'fish' ? '🐠' : item.type === 'plant' ? '🌿' : '🍎';

  return <div ref={ref} style={style}>{symbol}</div>;
};

const Aquarium: React.FC = () => {
  const [supportItems] = useState<SupportItem[]>([
    { id: 'fish1', type: 'fish', label: 'Guppy' },
    { id: 'plant1', type: 'plant', label: 'Seaweed' },
    { id: 'food1', type: 'food', label: 'Fish Food' },
  ]);
  const [aquariumItems, setAquariumItems] = useState<AquariumItem[]>([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <SupportPanel supportItems={supportItems} />
        <AquariumCanvas
          aquariumItems={aquariumItems}
          setAquariumItems={setAquariumItems}
          supportItems={supportItems}
        />
      </div>
    </DndProvider>
  );
};

export default Aquarium;
