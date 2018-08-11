/**
`<f-language-select>` is a dropdown menu to select language.

Loads native language name using [maikudou/iso639-js](https://github.com/maikudou/iso639-js)
and SVG flag icon using [Protoss78/flag-icon](https://github.com/Protoss78/flag-icon)

Example:

    <f-language-select selected="en"></f-language-select>

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';

import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import 'flag-icon/flag-icon.js';
import '@mkazlauskas/iso639-js/iso639_enUS.js';
import './finterface-language-select.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
window.FirmFirm = window.FirmFirm || {};
FirmFirm.LanguageSelect = class LanguageSelect extends FInterface.LanguageSelect(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: flex;
        align-items: center;
        --iron-image-placeholder: {
          width: 100%;
        };
      }

      flag-icon {
        height: var(--flag-icon-height, 60px);
        width: calc(var(--flag-icon-height, 60px) / 3 * 4);
        cursor: pointer;
      }

      paper-dropdown-menu {
        --paper-input-container-input: {
          text-align: center;
          font-size: 1.2em;
        };
        --paper-input-container-underline: {
          display: none;
        };
      }

      paper-item { margin-bottom: 8px; }
      paper-item span { margin-left: 8px; }
      paper-item:last-of-type { margin-bottom: 0; }

    </style>

    <flag-icon class="selected" key="[[_flagFromLang(selected)]]" on-tap="_toggle"></flag-icon>
    <paper-dropdown-menu id="langSelectMenu" no-label-float="" opened="{{_opened}}">
      <paper-listbox slot="dropdown-content" attr-for-selected="data-locale" selected="{{selected}}">
        <template is="dom-repeat" items="[[options]]">
          <paper-item data-locale\$="[[item.lang]]">
            <flag-icon key="[[item.flag]]"></flag-icon>
            <span>[[_languageName(item.lang)]]</span>
          </paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
`;
  }

  static get is() { return 'f-language-select'; }

  _languageName(code) {
    var alpha3 = iso639.alpha2to3mapping[code];
    var names = iso639.names[alpha3];
    if (!names) return '?';
    if (names.nativeName) return names.nativeName;
    return names.name;
  }

  _flagFromLang(lang) {
    if (!lang) return;
    const opt = this.options.find(function(o) {
      return o.lang === lang;
    });
    if (opt) return opt.flag;
  }

  _toggle() {
    this._opened = !this._opened;
  }
}
customElements.define(FirmFirm.LanguageSelect.is, FirmFirm.LanguageSelect);
