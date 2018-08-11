import '@polymer/polymer/polymer-legacy.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
window.FInterface = window.FInterface || {};

/**
 * `FInterface.LanguageSelect` exposes properties for any language select element.
 *
 * @polymerBehavior
 */
FInterface.LanguageSelect = dedupingMixin(function(superClass) {
  return class LanguageSelect extends superClass {
    static get properties() {
      return {
        /**
         * Language options to choose from. Each item has the following format:
         * ```json
         * {
         *   flag: String(ISO 3166-1 alpha-2),
         *   lang: String(ISO 639-1)
         * }```
         *
         * @default [ us:en, es:es lt:lt ]
         */
        options: {
          type: Array,
          notify: true,
          value: function() {
            return [
              { flag: 'us', lang: 'en' },
              { flag: 'es', lang: 'es' },
              { flag: 'lt', lang: 'lt' }
            ];
          }
        },

        /*
         * Selected option's `lang` property value.
         */
        selected: {
          type: String,
          notify: true
        }
      };
    }
  }
});
