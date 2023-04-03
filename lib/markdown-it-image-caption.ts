export default function figcaptionPlugin(md) {
  const renderImage = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const titleAttr = tokens[idx].attrs.find((x) => x[0] === "title");
    if (titleAttr) {
      const title = titleAttr[1];
      return `<figure>${
        renderImage(tokens, idx, options, env, self)
      }<figcaption>${title}</figcaption></figure>`;
    }
    return renderImage(tokens, idx, options, env, self);
  };
}
