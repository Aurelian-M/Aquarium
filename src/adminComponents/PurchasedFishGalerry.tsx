
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/authContext';
import { useDrag, useDrop } from 'react-dnd';

export interface Purchase {
  id: number;
  quantity: number;
  name: string;
  category: string;
  image: string;
  isCopyable?: boolean; 
}

const DragItem = ({ item, removeItem }: { item: Purchase; removeItem: (id: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'AQUARIUM_ITEM',
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (_dropResult, monitor) => {
      if (monitor.didDrop() && !item.isCopyable) {
        removeItem(item.id);
      }
    },
  }));

  drag(ref);
  const style = {
    width: item.category === 'fishes' ? '2rem' : item.category === 'plants' ? '2rem' : '2rem',
    height: item.category === 'fishes' ? '2rem' : item.category === 'plants' ? '2rem' : '2rem',
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
    backgroundImage: `url(${item.image})`,
    backgroundSize: 'cover' as const,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: 'center' as const,
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return <div ref={ref} style={style} title={`${item.name} x ${item.quantity}`} />;
};

export default function PurchasedFishGallery() {
  const { user, token } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'AQUARIUM_ITEM',
    drop: (item: Purchase, _monitor) => {
      if (item.isCopyable) return;
      setPurchases((prev) => [...prev, item]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (!user || !token) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/purchase/${user.id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch purchases');
        return res.json();
      })
      .then((data: Purchase[]) => {
        
        const withFlags = data.map((p) => ({
          ...p,
          isCopyable: p.category === 'plants' || p.category === 'food',
        }));
        setPurchases(withFlags);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user, token]);

  const removeItem = (id: number) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p>Loading your purchased items...</p>;
  if (error) return <p>Error: {error}</p>;
  if (purchases.length === 0) return <p>No items to show in your aquarium.</p>;

  return drop (
    <div  style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', border: isOver ? '2px dashed red' : undefined, padding: '0.5rem' }}>
      {purchases.map((p, index) => (
        <DragItem key={`${p.id}-${index}`} item={p} removeItem={removeItem} />
      ))}
    </div>
  ); 


}
