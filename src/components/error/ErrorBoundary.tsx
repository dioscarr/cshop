import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = 'An unexpected error occurred';
  let statusText = 'Error';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    statusText = `${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">{statusText}</h1>
        <p className="text-gray-600 text-center mb-6">{errorMessage}</p>
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <HomeIcon className="h-5 w-5" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
