import { useState, useEffect } from 'react';
import { INIT, PENDING, FAILURE, SUCCESS } from '../constants';

const makeCancelable = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      console.log('canceling promise');
      hasCanceled_ = true;
    }
  };
};

const useRequest = (request, onSuccess, onError) => {
  const [status, setStatus] = useState(INIT);
  const [cancelableRequest, setCancelableRequest] = useState(null);

  useEffect(() => () => cancelableRequest && cancelableRequest.cancel(), [cancelableRequest]);

  const makeRequest = async data => {
    setStatus(PENDING);
    const cancelableRequest = makeCancelable(request(data));
    setCancelableRequest(cancelableRequest);

    try {
      const response = await cancelableRequest.promise;
      setStatus(SUCCESS);
      onSuccess && onSuccess(response);
    } catch (error) {
      if (!error.isCanceled) {
        setStatus(FAILURE);
        onError && onError(error);
      } else {
        console.log('canceled request');
      }
    }
  };

  return [status, makeRequest];
};

export default useRequest;
