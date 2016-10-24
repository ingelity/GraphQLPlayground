document.addEventListener('DOMContentLoaded', () => {
  const queryElem = document.getElementById('query');
  const responseElem = document.getElementById('response');

  queryElem.addEventListener('keypress', event => {
    if (event.ctrlKey && (event.keyCode === 13 || event.keyCode === 10)) {
      const requestConfig = {
        url: `/graphql?query=${queryElem.value}`,

        // if we put text/html we get the whole graphiql page back
        headers: { accept: 'application/json' },
      };

      nanoajax.ajax(requestConfig, (code, responseText) => {
        if (code === 200) responseElem.innerHTML = responseText;
      });
    }
  });
});
