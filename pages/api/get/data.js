const pronote = require('../../src/pronote');

export default (req, res) => {
  if (req.method !== 'POST')
  {
      return endRequest(res, {
          error: 'Bad method'
      });
  }

  let body = '';

  req.on('data', (data) =>
  {
      body += data;
  });

  req.on('end', () =>
  {
      try
      {
          let params = JSON.parse(body);

          pronote[params.type](params).then(result =>
          {
              endRequest(res, result);
          }).catch(err =>
          {
              console.error(err);

              endRequest(res, {
                  error: err.message || JSON.stringify(err)
              });

              /*if (err.stack)
              {
                  console.error(err.stack);
              }*/
          });
      }
      catch (e)
      {
          console.error(e);

          endRequest(res, {
              error: JSON.stringify(e)
          });
      }
  });
}
