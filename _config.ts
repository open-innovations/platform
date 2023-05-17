import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import inline from 'lume/plugins/inline.ts';
import metas from "lume/plugins/metas.ts";
import svgo from "lume/plugins/svgo.ts";
import postcss from "lume/plugins/postcss.ts";

import imageCaption from "./lib/markdown-it-image-caption.ts";

const markdown = {
  plugins: [imageCaption],
  keepDefaultPlugins: true,
};
const search = {
  returnPageData: true
};

const site = lume({
  src: './docs',
  location: new URL("https://open-innovations.github.io/platform/"),
  components: {
    cssFile: '/assets/css/components.css',
    jsFile: '/assets/js/components.js',
  }
}, {
  markdown,
  search,
});

site.use(base_path());
site.use(svgo());
site.use(inline());
site.use(metas());
site.use(date());
site.use(postcss({}));

site.filter('flatten_object', (o: Record<string, Record<string, unknown>>) => Object.entries(o).map(([key, props]) => ({ ...props, key })))

site.copy('CNAME');
site.copy('.nojekyll');

site.remoteFile('assets/images/icons/cc.svg', 'https://mirrors.creativecommons.org/presskit/icons/cc.svg')
site.remoteFile('assets/images/icons/by.svg', 'https://mirrors.creativecommons.org/presskit/icons/by.svg')

export default site;
