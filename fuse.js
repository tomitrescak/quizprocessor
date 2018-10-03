const {
  Sparky,
  FuseBox,
  JSONPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  EnvPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  QuantumPlugin
} = require('fuse-box');
// const StubPlugin = require('proxyrequire').FuseBoxStubPlugin(/\.tsx?/);
const JsxControlsPugin = require('jsx-controls-loader').fuseBoxPlugin;
// const TestConfig = require('fuse-test-runner').TestConfig;

/////////////////////////////////////////////
// SERVER
/////////////////////////////////////////////

/////////////////////////////////////////////
// DEV
/////////////////////////////////////////////

function initFuse(isDebug) {
  const defaultFuse = FuseBox.init({
    homeDir: 'src',
    output: 'public/$name.js',
    plugins: [JsxControlsPugin, WebIndexPlugin({ template: 'src/web.html', target: 'index.html' })],
    shim: {
      crypto: {
        exports: '{ randomBytes: () => crypto.getRandomValues(new global.Uint16Array(1))[0] }'
      }
    }
  });

  defaultFuse.dev({
    port: 3000,
    httpServer: true
  });

  defaultFuse
    .bundle('vendor')
    // Watching (to add dependencies) it's damn fast anyway
    //.watch()
    // first bundle will get HMR related code injected
    // it will notify as well
    .hmr()
    .target('browser')
    .instructions(' ~ index.tsx'); // nothing has changed here

  defaultFuse
    .bundle('client')
    .watch() // watch only client related code
    .hmr()
    .target('browser')
    .sourceMaps(true)
    .instructions(' !> [index.tsx]');

  return defaultFuse;
}

Sparky.task('default', () => {
  const fuse = initFuse(false);
  fuse.run();
});

Sparky.task('debug', () => {
  const fuse = initFuse(true);
  fuse.run();
});

/////////////////////////////////////////////
// PRODUCTION
/////////////////////////////////////////////

const uglify2 = {
  compress: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true
  },
  output: {
    comments: false
  },
  sourceMap: false,
  verbose: true,
  exclude: /compiler\.js/i
};

Sparky.task('production', () => {
  const productionFuse = FuseBox.init({
    homeDir: 'src',
    output: 'dist/$name',
    hash: true,
    tsConfig: 'tsconfig.json',
    plugins: [
      EnvPlugin({ NODE_ENV: 'production' }),
      WebIndexPlugin({ template: 'src/web.html' }),
      JsxControlsPugin
    ],
    shim: {
      crypto: {
        exports:
          '{ randomBytes: function(length) { return crypto.getRandomValues(new global.Uint8Array(length)) }}'
      }
    }
  });

  productionFuse
    .bundle('vendor.min.js')
    .target('browser')
    .instructions('~ index.tsx'); // nothing has changed here

  productionFuse
    .bundle('client.min.js')
    .target('browser')
    .instructions(' !> [index.tsx]');

  productionFuse.run();
  // .then(producer => {
  //   var current = 0;
  //   return new Promise(completed => {
  //     producer.bundles.forEach((bundle, name) => {
  //       var cs = require('checksum');
  //       var output = bundle.context.output.lastPrimaryOutput;

  //       cs.file('public/' + output.filename, function(err, sum) {
  //         const fs = require('fs');
  //         const file = fs.readFileSync('public/index.html', 'utf8');
  //         const newFile = file.replace(`/${output.filename}`, `/${output.filename}?${sum}`);
  //         fs.writeFileSync('public/index.html', newFile, 'utf-8');
  //         if (++current == producer.bundles.size) {
  //           completed();
  //         }
  //       });
  //     });
  //   });
  // })
  // .then(() => {
  //   console.log('Building server');
  //   return initServer(false);
  // });
});
