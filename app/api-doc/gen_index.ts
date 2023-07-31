import axios from 'axios';
import path from 'path';
import fsExtra from '../common/fs-extra';

axios
  .get('https://classserviceapi-g64.doc.coding.io/', {
    headers: {
      cookie:
        'eid=576f34a0-88b3-4882-b8f5-14eb316f22bc; operation_release_uv=%7B%22513197%22%3A%7B%22id%22%3A513197%2C%22expire_at%22%3A%222023-07-29%2023%3A59%3A59%22%7D%7D; operation_doc_uv=%7B%221439800%22%3A%7B%22id%22%3A1439800%2C%22expire_at%22%3A%222023-07-29%2023%3A59%3A59%22%7D%7D; coding_api_document_production_session=eyJpdiI6IkhwS3JMZHNKMGdzKzYyYkVQMWJyRUE9PSIsInZhbHVlIjoiT1dcL3BrSnFuUkdiVTZiNTRNbTU4eGpkdm1OazdGRnRRUjRScFplQlRJdWRlN3FYWWVNZjh4QXIzZzFcL3lhdU1SIiwibWFjIjoiYjkwNzNiZDQ0NmQzOTM5OGVlODYzMTZiMWE2YmRjZmQ2ZjNhMjgxZjJkODYwZjZiMDgxZTBjYTdhYmIxNmUyMyJ9',
    },
  })
  .then(res => {
    if (res.status === 200) {
      fsExtra.writeFileSync(path.join(__dirname, 'index.html'), res.data, 'utf-8');
      console.log(`${res.status} ${res.statusText}`);
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  });
