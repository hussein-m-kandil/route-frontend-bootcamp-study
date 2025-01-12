import { useOutletContext } from 'react-router-dom';

function PageHeader({ headText = 'Page Headline' }) {
  const context = useOutletContext();

  let textColorClass = 'text-primary';
  if (context && context.textColorClass) {
    textColorClass = context.textColorClass;
  }

  const lineColorClass = textColorClass.replace('text', 'bg');
  const lineStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '80px',
    height: '4px',
  };

  return (
    <>
      <h2
        className={`fs-1 fw-bold text-uppercase text-center m-0 mt-3 ${textColorClass}`}
      >
        {headText}
      </h2>
      <div className={`mt-2 mb-4 text-center ${textColorClass}`}>
        <span className={lineColorClass} style={lineStyle}></span>
        <i className="fa-solid fa-star mx-3"></i>
        <span className={lineColorClass} style={lineStyle}></span>
      </div>
    </>
  );
}

export default PageHeader;
