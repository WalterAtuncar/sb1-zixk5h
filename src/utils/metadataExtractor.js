const extractMetadata = ($) => {
  // Basic metadata
  const metadata = {
    title: $('title').text().trim(),
    charset: $('meta[charset]').attr('charset'),
    viewport: $('meta[name="viewport"]').attr('content'),
    description: $('meta[name="description"]').attr('content'),
    keywords: $('meta[name="keywords"]').attr('content'),
    author: $('meta[name="author"]').attr('content'),
    generator: $('meta[name="generator"]').attr('content'),
    robots: $('meta[name="robots"]').attr('content'),
    themeColor: $('meta[name="theme-color"]').attr('content'),
  };

  // Open Graph metadata
  metadata.openGraph = {
    title: $('meta[property="og:title"]').attr('content'),
    type: $('meta[property="og:type"]').attr('content'),
    url: $('meta[property="og:url"]').attr('content'),
    image: $('meta[property="og:image"]').attr('content'),
    description: $('meta[property="og:description"]').attr('content'),
    siteName: $('meta[property="og:site_name"]').attr('content'),
  };

  // Twitter Card metadata
  metadata.twitter = {
    card: $('meta[name="twitter:card"]').attr('content'),
    site: $('meta[name="twitter:site"]').attr('content'),
    creator: $('meta[name="twitter:creator"]').attr('content'),
    title: $('meta[name="twitter:title"]').attr('content'),
    description: $('meta[name="twitter:description"]').attr('content'),
    image: $('meta[name="twitter:image"]').attr('content'),
  };

  // Favicon and other icons
  const icons = [];
  $('link[rel*="icon"]').each((i, el) => {
    icons.push({
      rel: $(el).attr('rel'),
      href: $(el).attr('href'),
      type: $(el).attr('type'),
      sizes: $(el).attr('sizes'),
    });
  });
  metadata.icons = icons;

  return metadata;
};

module.exports = { extractMetadata };