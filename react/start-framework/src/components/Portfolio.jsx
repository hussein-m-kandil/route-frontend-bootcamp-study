import { useEffect } from 'react';
import PageHeader from './PageHeader';
import ImageCard from './ImageCard';

function genId() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();
  return Number(new Date()) + '-' + Math.floor(Math.random() * 1e9);
}

const images = [
  { id: genId(), src: '/vector_img_1.png', alt: 'A shed illustration.' },
  {
    id: genId(),
    src: '/vector_img_2.png',
    alt: 'A piece of cake illustration.',
  },
  { id: genId(), src: '/vector_img_3.png', alt: 'A circus tent illustration.' },
  { id: genId(), src: '/vector_img_1.png', alt: 'A shed illustration.' },
  {
    id: genId(),
    src: '/vector_img_2.png',
    alt: 'A piece of cake illustration.',
  },
  { id: genId(), src: '/vector_img_3.png', alt: 'A circus tent illustration.' },
];

function Portfolio() {
  useEffect(() => {
    document.title = 'Portfolio';
  }, []);

  return (
    <>
      <PageHeader headText="Portfolio Component" />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-5 gx-md-5">
        {images.map(({ id, src, alt }) => (
          <ImageCard key={id} src={src} alt={alt} />
        ))}
      </div>
    </>
  );
}

export default Portfolio;
