import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [imgUrl, setImgUrl] = useState('');

  const handleView = (url: string): void => {
    setImgUrl(url);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} spacing={8}>
        {cards.map(c => (
          <Card key={c.id} data={c} viewImage={handleView} />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />
    </>
  );
}
