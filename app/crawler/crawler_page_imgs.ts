import Crawler from 'crawler';

const c = new Crawler({
  maxConnections: 10,
  jQuery: false,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const content = res.body;

      {
        const url_regexp = new RegExp(`(https?://)?(([a-zA-Z\d\.\-_]+)/)+([a-zA-Z\d\.\-_]+).(js|css)`, 'g');

        const urls = content.match(url_regexp) as string[];
        if (urls && urls.length > 0) {
          for (const url of urls) {
            console.log(url);

            if (url.startsWith('static/')) {
              c.queue('https://www.ljlx.com' + '/' + url);
            }
          }
        }
      }

      {
        const url_regexp = new RegExp(`(https?://)?(([a-zA-Z\d\.\-_]+)/)+([a-zA-Z\d\.\-_]+).(jpe?g|png|gif)`, 'g');
        const urls = content.match(url_regexp) as string[];
        if (urls && urls.length > 0) {
          for (const url of urls) {
            console.log(url);

            if (url.startsWith('static/')) {
              // c.queue('https://www.ljlx.com' + '/' + url);
            }
          }
        }
      }
    }
    done();
  },
});

// Queue just one URL, with default callback
c.queue(['https://deepinout.com/regexp/regexp-tutorials/67_the_regular_expression_match_method.html']);
