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

        if (typeof hrefValue !== 'string' || !hrefValue.startsWith('/')) return;

        // Route Handler unter /api sind keine lokalisierten Seiten. Sie
        // liefern Dateien aus — IFC, CSV, ZIP —, und `Link` aus
        // @/lib/i18n/navigation wuerde ihnen ein Sprachpraefix voranstellen,
        // unter dem es sie nicht gibt. Ein <a> ist hier die richtige und
        // einzige Moeglichkeit; ausserdem soll ein Download die Seite gar
        // nicht wechseln, sondern gespeichert werden.
        if (hrefValue.startsWith('/api/')) return;

        // Dasselbe gilt fuer statische Dateien unter public/: ein Pfad, dessen
        // letztes Segment eine Dateiendung traegt (/pdf/katalog.pdf,
        // /images/foo.jpg), zeigt auf eine Datei und nicht auf eine Seite.
        // Ein Sprachpraefix davor ergaebe eine Adresse, die es nicht gibt.
        const letztesSegment = hrefValue.split('?')[0].split('#')[0].split('/').pop() || '';
        if (/\.[a-z0-9]{2,5}$/i.test(letztesSegment)) return;

        // Nur interne Seitenlinks pruefen.
        {
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
