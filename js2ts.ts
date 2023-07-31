import readdirp from "readdirp"
import fsExtra from 'fs-extra';
import path from "path";


let appPath = path.join(__dirname, 'app');


  readdirp.promise('./app', {
    fileFilter: ['*.js']
  }).then(res => {
    for (let i = 0; i < res.length; i++) {
      const item = res[i];
      console.log(item)

      fsExtra.renameSync(path.join(appPath, item.path), path.join(appPath, item.path.replace('.js', '.ts')))
    }
  })
