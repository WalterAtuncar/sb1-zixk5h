const extractForms = ($) => {
  const forms = [];
  $('form').each((i, form) => {
    forms.push({
      id: $(form).attr('id'),
      name: $(form).attr('name'),
      action: $(form).attr('action'),
      method: $(form).attr('method')?.toUpperCase() || 'GET',
      enctype: $(form).attr('enctype'),
      target: $(form).attr('target'),
      novalidate: $(form).attr('novalidate') !== undefined,
      autocomplete: $(form).attr('autocomplete')
    });
  });
  return forms;
};

const extractInputs = ($) => {
  const inputs = [];
  $('input').each((i, el) => {
    inputs.push({
      type: $(el).attr('type') || 'text',
      name: $(el).attr('name'),
      id: $(el).attr('id'),
      value: $(el).attr('value'),
      placeholder: $(el).attr('placeholder'),
      required: $(el).prop('required'),
      formId: $(el).closest('form').attr('id'),
      autocomplete: $(el).attr('autocomplete'),
      pattern: $(el).attr('pattern'),
      min: $(el).attr('min'),
      max: $(el).attr('max'),
      step: $(el).attr('step'),
      minlength: $(el).attr('minlength'),
      maxlength: $(el).attr('maxlength'),
      readonly: $(el).prop('readonly'),
      disabled: $(el).prop('disabled'),
      checked: $(el).prop('checked'),
      multiple: $(el).prop('multiple'),
      accept: $(el).attr('accept'),
      capture: $(el).attr('capture'),
      list: $(el).attr('list'),
      className: $(el).attr('class')
    });
  });
  return inputs;
};

const extractSelects = ($) => {
  const selects = [];
  $('select').each((i, el) => {
    const options = [];
    $(el).find('option').each((j, opt) => {
      options.push({
        value: $(opt).attr('value'),
        text: $(opt).text().trim(),
        selected: $(opt).prop('selected'),
        disabled: $(opt).prop('disabled'),
        label: $(opt).attr('label'),
        className: $(opt).attr('class')
      });
    });

    selects.push({
      name: $(el).attr('name'),
      id: $(el).attr('id'),
      required: $(el).prop('required'),
      formId: $(el).closest('form').attr('id'),
      multiple: $(el).prop('multiple'),
      size: $(el).attr('size'),
      disabled: $(el).prop('disabled'),
      autofocus: $(el).prop('autofocus'),
      className: $(el).attr('class'),
      options
    });
  });
  return selects;
};

const extractButtons = ($) => {
  const buttons = [];
  $('button, input[type="submit"], input[type="button"], input[type="reset"]').each((i, el) => {
    buttons.push({
      type: $(el).prop('tagName').toLowerCase() === 'button' ? 
            $(el).attr('type') || 'submit' : 
            $(el).attr('type'),
      text: $(el).text().trim() || $(el).attr('value'),
      id: $(el).attr('id'),
      name: $(el).attr('name'),
      formId: $(el).closest('form').attr('id'),
      disabled: $(el).prop('disabled'),
      className: $(el).attr('class'),
      formaction: $(el).attr('formaction'),
      formmethod: $(el).attr('formmethod'),
      formtarget: $(el).attr('formtarget'),
      formnovalidate: $(el).attr('formnovalidate') !== undefined
    });
  });
  return buttons;
};

const extractTextareas = ($) => {
  const textareas = [];
  $('textarea').each((i, el) => {
    textareas.push({
      name: $(el).attr('name'),
      id: $(el).attr('id'),
      value: $(el).val(),
      placeholder: $(el).attr('placeholder'),
      required: $(el).prop('required'),
      formId: $(el).closest('form').attr('id'),
      rows: $(el).attr('rows'),
      cols: $(el).attr('cols'),
      minlength: $(el).attr('minlength'),
      maxlength: $(el).attr('maxlength'),
      wrap: $(el).attr('wrap'),
      readonly: $(el).prop('readonly'),
      disabled: $(el).prop('disabled'),
      className: $(el).attr('class'),
      spellcheck: $(el).attr('spellcheck')
    });
  });
  return textareas;
};

const extractLabels = ($) => {
  const labels = [];
  $('label').each((i, el) => {
    labels.push({
      for: $(el).attr('for'),
      text: $(el).text().trim(),
      className: $(el).attr('class')
    });
  });
  return labels;
};

const extractFieldsets = ($) => {
  const fieldsets = [];
  $('fieldset').each((i, el) => {
    const legend = $(el).find('legend').first().text().trim();
    fieldsets.push({
      id: $(el).attr('id'),
      name: $(el).attr('name'),
      disabled: $(el).prop('disabled'),
      form: $(el).attr('form'),
      legend,
      className: $(el).attr('class')
    });
  });
  return fieldsets;
};

const extractDataLists = ($) => {
  const datalists = [];
  $('datalist').each((i, el) => {
    const options = [];
    $(el).find('option').each((j, opt) => {
      options.push({
        value: $(opt).attr('value'),
        label: $(opt).attr('label'),
        text: $(opt).text().trim()
      });
    });
    datalists.push({
      id: $(el).attr('id'),
      options
    });
  });
  return datalists;
};

const extractIframes = ($) => {
  const iframes = [];
  $('iframe').each((i, el) => {
    iframes.push({
      src: $(el).attr('src'),
      name: $(el).attr('name'),
      id: $(el).attr('id'),
      width: $(el).attr('width'),
      height: $(el).attr('height'),
      sandbox: $(el).attr('sandbox'),
      allow: $(el).attr('allow'),
      loading: $(el).attr('loading'),
      className: $(el).attr('class')
    });
  });
  return iframes;
};

const extractLinks = ($) => {
  const links = [];
  $('a').each((i, el) => {
    links.push({
      href: $(el).attr('href'),
      text: $(el).text().trim(),
      id: $(el).attr('id'),
      target: $(el).attr('target'),
      rel: $(el).attr('rel'),
      download: $(el).attr('download'),
      hreflang: $(el).attr('hreflang'),
      type: $(el).attr('type'),
      className: $(el).attr('class')
    });
  });
  return links;
};

const extractImages = ($) => {
  const images = [];
  $('img').each((i, el) => {
    images.push({
      src: $(el).attr('src'),
      alt: $(el).attr('alt'),
      id: $(el).attr('id'),
      width: $(el).attr('width'),
      height: $(el).attr('height'),
      loading: $(el).attr('loading'),
      decoding: $(el).attr('decoding'),
      srcset: $(el).attr('srcset'),
      sizes: $(el).attr('sizes'),
      className: $(el).attr('class')
    });
  });
  return images;
};

module.exports = {
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
};