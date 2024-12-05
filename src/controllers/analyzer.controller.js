const axios = require('axios');
const cheerio = require('cheerio');
const { createError } = require('../utils/error');
const {
  extractForms,
  extractInputs,
  extractSelects,
  extractButtons,
  extractTextareas,
  extractLabels,
  extractFieldsets,
  extractDataLists,
  extractIframes,
  extractLinks,
  extractImages
} = require('../utils/elementExtractors');
const { extractMetadata } = require('../utils/metadataExtractor');

exports.analyzePage = async (req, res, next) => {
  try {
    const { url, headers = {} } = req.body;

    // Configure axios request
    const config = {
      headers: {
        // Default headers
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        // Merge with custom headers
        ...headers
      },
      validateStatus: function (status) {
        // Consider any status less than 500 as success to handle redirects and auth challenges
        return status < 500;
      },
      maxRedirects: 5,
      timeout: 30000 // 30 seconds timeout
    };

    const response = await axios.get(url, config);

    // Handle authentication required responses
    if (response.status === 401 || response.status === 403) {
      throw createError(response.status, 'Authentication required for this page');
    }

    // Handle redirect chains
    if (response.status >= 300 && response.status < 400) {
      throw createError(response.status, 'Redirect detected, please provide the final URL');
    }

    const $ = cheerio.load(response.data);

    // Extract all elements
    const elements = {
      forms: extractForms($),
      inputs: extractInputs($),
      selects: extractSelects($),
      buttons: extractButtons($),
      textareas: extractTextareas($),
      labels: extractLabels($),
      fieldsets: extractFieldsets($),
      datalists: extractDataLists($),
      iframes: extractIframes($),
      links: extractLinks($),
      images: extractImages($)
    };

    // Extract metadata
    const metadata = extractMetadata($);

    // Additional page statistics
    const statistics = {
      totalForms: elements.forms.length,
      totalInputs: elements.inputs.length,
      totalSelects: elements.selects.length,
      totalButtons: elements.buttons.length,
      totalTextareas: elements.textareas.length,
      totalLinks: elements.links.length,
      totalImages: elements.images.length,
      totalIframes: elements.iframes.length
    };

    res.json({
      url: response.config.url, // Final URL after any redirects
      status: response.status,
      headers: response.headers,
      elements,
      metadata,
      statistics,
      timing: {
        responseTime: response.headers['x-response-time'],
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error.response) {
      next(createError(error.response.status, `Error analyzing page: ${error.message}`));
    } else {
      next(createError(500, `Error analyzing page: ${error.message}`));
    }
  }
};