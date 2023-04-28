---
title: Static Site Generation
---

Static site generators are a good fit for the Open Innovations stack as they allow us to create large static websites from layouts coupled with data. This meets our principle of sustainability and helps us use the web as it was intended.

Lume is a static site generator (SSG) based on the Deno Javascript runtime ecosystem. The key building blocks of Lume are pages and layouts.

## Pages

A page in Lume is defined by a file comprising at a minimum some content. Lume allows a number of formats to [defining a page](https://lume.land/docs/getting-started/your-first-page/): the primary formats that we use are [Nunjucks](https://lume.land/plugins/nunjucks/) and [Markdown](https://lume.land/plugins/markdown/). Pages in Lume are broken down into page data and content. 

## Page data

[Page data](https://lume.land/docs/getting-started/page-data/) or frontmatter defines data, typically in a YAML format, that will later be used in constructing the page. As an aside, content itself is merely another data entity, so it would be possible to entirely define a page in a YAML file.

### Page url

The url variable is a special page data entity that defines the path of the page in the built site. Lume defaults to making a url based on the path of the file. This can be overriden by explicitly setting a url value. Note that urls should end with a / character. Setting a url to false prevents the page from being rendered.

As an example, a markdown file at path `/about/team/index.md` will have a url of `/about/team/`. This would be the same as `/about/team.md` or the page `/pages/team-about.md` _if the url is set to_ `/about/team/`. Generally, it’s preferable where possible to use the implicit path with an index file, as it’s a bit clearer which page needs to be changed.

## Layouts

It would be possible to explicitly write all the html required to create the page in each file, but this would become repetitive, and mean that it would be difficult to make changes that affect the whole site.

[Layouts](https://lume.land/docs/getting-started/create-a-layout/) help solve this problem by defining the common elements of a page (such as HTML head element, and potentially headers and footers) and then injecting page data into them. This means that the page files can focus on content and any styling changes are applied in one place.

A layout can be applied to a page by defining the layout page data element. By default, Lume looks for layouts in the _includes special folder in the site source directory. By convention, we put all layouts in the `_includes/layouts/` folder to ease maintenance.

As an example, setting `layout: layouts/page.njk` would render the page by injecting page data (including content) into the layout found in `_includes/layouts/page.njk`.

Layouts themselves can have layouts, defined in the same way (setting the layout property)! This allows pages to inherit multiple wrappers. A typical chain might look like this `page` &rarr; `layouts/blog.njk` &rarr; `layouts/page.njk` &rarr; `layouts/base.njk`. In this chain

* `layouts/base.njk` defines the standard site content (html definitions, etc).
* `layouts/page.njk` add the headers and footers and sets up the main content so that all pages on the site look similar (NB this could be in base, but it’s sometimes cleaner to have an extra layer).
* `layouts/blog.njk` defines additional blog post related content (date, tags, etc) which are not relevant to all pages.
* Finally, the `page` provides the content to generate the specific blog post.

There will almost certainly be a large number of pages which are generated from the same layout, meaning it’s an efficient way of constructing large and maintainable websites.

## Shared data

There is an additional way of defining data in Lume: [shared data](https://lume.land/docs/getting-started/shared-data/) . This is a really powerful tool, which sets shared data properties for all pages on a site. These are set either in data files named `_data.yaml` (or `_data.json` or one of many other another formats supported by Lume), or in files stored in an `_data` directory. A common use case for this is setting a default layout for pages by adding a `layout` property to `_data.yaml` at the top level of a site source.

Shared data is accessible from within templates in the same way as page data, and can be overridden within the page. Data in `_data` directories is constructed into a nested structure when rendering, so data provided in `_data/source/one.yaml` will can be accessed in pages as `source.one`.

Shared data applies to at the folder level at which is defined any any subfolders. This means that data defined at the site source root is visible to all pages in the site, wheras if data is defined in `blog/_data.yaml` (or similar) it will only be available to pages in the blog folder or below. This can be really useful when dealing with large volumes of data.

## Configuring lume

[Lume configuration](https://lume.land/docs/configuration/config-file/) is done in a `_config.js` or `_config.ts` file. 

A few key things that are set up in this file include the site source directory (by setting the `src` property of the `lume()` factory. By convention, we use `src` as the site source directory. Another important property is the `location` of the site. This is really useful to ensure that lume knows how to treat relative URLs if the site is not published at the root of the target site.

The `_config` file is also where the site build is configured with plugins, filters, etc

## Include files 

TBC

## Components

TBC
