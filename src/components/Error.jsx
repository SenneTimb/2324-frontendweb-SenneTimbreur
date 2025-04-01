import { isAxiosError } from "axios";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    const errorMessage = error?.response?.data?.message || error.message;
    const errorDetails = error?.response?.data?.details;

    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Oops, something went wrong</h4>
        <p>
          {errorMessage}
          {errorDetails && (
            <>
              :
              <br />
              {JSON.stringify(errorDetails)}
            </>
          )}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">An unexpected error occurred</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}
