const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce usage of next-intl Link for internal routes instead of raw <a> tags',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      JSXElement(node) {
        const isAnchor = node.openingElement.name.name === 'a';
        if (!isAnchor) return;

        const hrefAttr = node.openingElement.attributes.find(
          (attr) => attr.name && attr.name.name === 'href'
        );

        if (!hrefAttr || !hrefAttr.value) return;

        let hrefValue = '';
        if (hrefAttr.value.type === 'Literal') {
          hrefValue = hrefAttr.value.value;
        } else if (hrefAttr.value.type === 'JSXExpressionContainer' && hrefAttr.value.expression.type === 'Literal') {
          hrefValue = hrefAttr.value.expression.value;
        }

        // Only enforce for internal links (starting with /)
        if (typeof hrefValue === 'string' && hrefValue.startsWith('/')) {
          context.report({
            node,
            message: 'Use <ButtonPrimary> or <Link> from @/lib/i18n/navigation instead of raw <a> tags for internal routes to ensure proper locale prefixing.',
          });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'require-intl-link': rule,
  },
};
