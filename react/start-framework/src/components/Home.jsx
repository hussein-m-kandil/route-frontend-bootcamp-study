import { useEffect } from 'react';
import PageHeader from './PageHeader.jsx';

const originalTitle = document.title;

function Home() {
  useEffect(() => {
    document.title = originalTitle;
  }, []);

  return (
    <>
      <img
        src="/avatar.svg"
        alt="A boy illustration."
        className="d-block mx-auto"
        style={{ maxWidth: '250px' }}
      />
      <PageHeader headText="Start Framework" />
      <p>Graphic Artist - Web Designer - Illustrator</p>
    </>
  );
}

export default Home;
