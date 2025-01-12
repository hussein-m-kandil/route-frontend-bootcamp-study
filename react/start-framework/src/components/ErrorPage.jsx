import { useRouteError } from 'react-router-dom';
import PageHeader from './PageHeader';

function ErrorPage() {
  const error = useRouteError();

  let message;

  if (error) message = error.statusText || error.message;

  if (!message) message = 'Not Found!';

  return <PageHeader headText={message} />;
}

export default ErrorPage;
