require('shelljs/make')

const toDefs = require('./src/toDefs')

target.svgo = () => {
  ls('inkscape').forEach(dir => {
    exec(`./node_modules/.bin/svgo --config=svgo.js --pretty -f inkscape/${dir} -o optimized/${dir}`)
  })
}

target.defs = () => {
  ls('optimized').forEach(dir => {
    const path = `${__dirname}/optimized/${dir}`
    mkdir('-p', `${__dirname}/dist`)
    toDefs(dir, ls(path).map(file => `${path}/${file}`), `${__dirname}/dist/${dir}.svg`)
  })
}
