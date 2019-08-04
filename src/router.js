const { handleHome, handlePublic, handleApi, handleTranslate } = require("../src/handler");

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === "/") {
    handleHome(request, response);
  } else if (endpoint.indexOf("public") !== -1) {
    handlePublic(request, response, endpoint);
  } else if (endpoint.startsWith("/translate")) {
    handleTranslate(request, response, endpoint);
  } else if (endpoint.includes("/search")) {
    handleApi(request, response, endpoint);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("<h1>404 file not found</h1>");
  }
};

module.exports = router;
