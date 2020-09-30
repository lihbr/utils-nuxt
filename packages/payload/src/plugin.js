<% if (options.dev) { %>import fetch from "isomorphic-unfetch";<% } %>

class NotFoundError extends Error {
  statusCode = 404;

  constructor(path) {
    super(`No payload found for route "${path}" with $pagePayload function and preview is disabled, throwing 404.`);
  }
}

export default context => {
  // TODO: Refactor into 2 functions
  const handleError = err => {
    if (context.$logger) {
      context.$logger.error(err);
    } else {
      console.error(err);
    }

    if (context.$sentry) {
      context.$sentry.captureException(err);
    }

    if (err instanceof NotFoundError) {
      context.error({ statusCode: err.statusCode, message: "" });
    } else if (err.status) {
      context.error({ statusCode: err.status, message: "" });
    } else {
      context.error({ statusCode: 0, message: "" });
    }
  };

  context.$pagePayload = async context => {
    if (context.payload) {
      return { data: context.payload };
    } else {
      <% if (options.dev) { %>
      const base = "<%= options.base %>";
      const normalizedPath = context.route.path.replace(/\/+$/, "");
      const url = `${process.env.APP_URL}${base}${normalizedPath}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw response; // non-200 code
        }
        const { data } = await response.json();
        return { data };
      } catch (err) {
        handleError(err);
      }
      <% } else { %>
      handleError(new NotFoundError(context.route.path));
      <% } %>
    }
  };
};
