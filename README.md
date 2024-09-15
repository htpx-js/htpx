# HTPX - HTTP Client

HTPX is a lightweight, flexible HTTP client for JavaScript and Node.js that supports both `XMLHttpRequest` and `Fetch` in the browser and `http`/`https` in Node.js. It is designed to be modular, promise-based, and fully equipped with modern features like request cancellation, interceptors, and progress tracking for uploads and downloads.

## Features

- **Browser and Node.js support**:
  - Uses `XMLHttpRequest` or `Fetch` in the browser
  - Uses `http`/`https` in Node.js
- **Promise-based API**: Simple and clean syntax using promises.
- **Request and Response interceptors**: Modify requests/responses globally before sending or after receiving them.
- **Timeout support**: Automatically abort requests that take too long.
- **Request cancellation**: Cancel in-flight requests using `CancelToken`.
- **Custom headers**: Easily add or modify headers.
- **Progress tracking**: Monitor upload and download progress.
- **XSRF protection**: Automatically add XSRF tokens from cookies to headers.
- **Proxy support**: Handle HTTP proxies in Node.js.

## Tutorials

### Installation

Install HTPX using npm:

    npm install htpx

If you're using **TypeScript**, the types are already included in the package, so there's no need to install additional type definitions.

### Basic Usage

HTPX supports the standard HTTP methods, including `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. Here's how you can make simple HTTP requests:

#### GET Request

    import htpx from 'htpx';

    htpx.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

#### POST Request

    htpx.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

#### PUT Request

    htpx.put('https://jsonplaceholder.typicode.com/posts/1', {
      title: 'updated title',
      body: 'updated body',
      userId: 1
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

#### DELETE Request

    htpx.delete('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        console.log('Deleted successfully');
      })
      .catch(error => {
        console.error(error);
      });

### Request Configuration

You can pass a configuration object with additional settings like headers, timeouts, and custom parameters:

    htpx.get('https://jsonplaceholder.typicode.com/posts', {
      headers: { 'Authorization': 'Bearer your_token' },
      timeout: 5000 // 5-second timeout
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Request timed out or failed:', error);
      });

### Interceptors

Interceptors allow you to modify requests or responses globally before they are sent or after they are received.

#### Request Interceptor

    htpx.addRequestInterceptor(config => {
      config.headers['Authorization'] = 'Bearer your_token';
      return config;
    });

#### Response Interceptor

    htpx.addResponseInterceptor(response => {
      if (response.status === 401) {
        // Handle unauthorized access
        console.log('Unauthorized, redirecting to login...');
      }
      return response;
    });

### Request Cancellation

HTPX supports request cancellation using `CancelToken`. This is useful when you need to abort a request that is no longer needed.

    const { token, cancel } = htpx.CancelToken.source();

    htpx.get('https://jsonplaceholder.typicode.com/posts', {
      cancelToken: token
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        if (htpx.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error:', error);
        }
      });

    // Cancel the request
    cancel('Operation canceled by the user.');

### Timeout

You can set a timeout for each request. If the request takes longer than the specified time, it will be aborted.

    htpx.get('https://jsonplaceholder.typicode.com/posts', { timeout: 1000 })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Request timed out or failed:', error);
      });

### Progress Tracking

HTPX allows you to track the progress of uploads and downloads.

#### Download Progress

    htpx.get('https://jsonplaceholder.typicode.com/posts', {
      onDownloadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Download progress: ${percentCompleted}%`);
      }
    })
      .then(response => {
        console.log(response.data);
      });

#### Upload Progress

    htpx.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    }, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    })
      .then(response => {
        console.log(response.data);
      });

### Proxy Support (Node.js)

HTPX supports proxies for Node.js requests. Here’s how you can set up a proxy:

    htpx.get('https://example.com/api', {
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'proxyUser',
          password: 'proxyPassword'
        }
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

### XSRF Protection

HTPX automatically adds XSRF tokens from cookies to your requests. You can configure the cookie and header names:

    htpx.post('https://example.com/api', { data: 'foo' }, {
      xsrfCookieName: 'MY-XSRF-COOKIE', // default is 'XSRF-TOKEN'
      xsrfHeaderName: 'MY-XSRF-HEADER' // default is 'X-XSRF-TOKEN'
    });

## TypeScript Support

HTPX includes built-in TypeScript support. The types are automatically recognized when you import HTPX in a TypeScript project. Here's an example of using HTPX with TypeScript:

#### TypeScript Example

    import { request, get, post, RequestConfig, Response } from 'htpx';

    const config: RequestConfig = {
      method: 'GET',
      url: 'https://example.com/api',
      timeout: 5000
    };

    get(config.url, config).then((response: Response) => {
      console.log(response.data);
    });

### Methods

- `request(url, config)` – Core method for custom requests.
- `get(url, config)` – Send a `GET` request.
- `post(url, data, config)` – Send a `POST` request.
- `put(url, data, config)` – Send a `PUT` request.
- `patch(url, data, config)` – Send a `PATCH` request.
- `delete(url, config)` – Send a `DELETE` request.
- `addRequestInterceptor(interceptor)` – Add a global request interceptor.
- `addResponseInterceptor(interceptor)` – Add a global response interceptor.
- `CancelToken` – Use to cancel requests.

### Running Tests

You can run the tests using **Jest**:

    npm run test
