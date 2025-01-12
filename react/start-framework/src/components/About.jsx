import { useEffect } from 'react';
import PageHeader from './PageHeader';

function About() {
  useEffect(() => {
    document.title = 'About';
  }, []);

  return (
    <>
      <PageHeader headText="About Component" />
      <div className="row row-cols-1 row-cols-md-2 px-5 text-start">
        <p className="col px-3 ps-md-5">
          Freelancer is a free bootstrap theme created by Route. The download
          includes the complete source files including HTML, CSS, and JavaScript
          as well as optional SASS stylesheets for easy customization.
        </p>
        <p className="col px-3 pe-md-5">
          Freelancer is a free bootstrap theme created by Route. The download
          includes the complete source files including HTML, CSS, and JavaScript
          as well as optional SASS stylesheets for easy customization.
        </p>
      </div>
    </>
  );
}

export default About;
