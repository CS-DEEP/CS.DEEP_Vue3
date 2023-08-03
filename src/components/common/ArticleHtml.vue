<template>
  <div v-html="content"></div>
</template>

<script lang="ts">
export default {
  name: "ArticleHtml",
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(this.content)
  }
}
</script>


<style scoped>
:root {
  --side-bar-bg-color: #fafafa;
  --control-text-color: #777;
}

/* open-sans-regular - latin-ext_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  src: local('Open Sans Regular'), local('OpenSans-Regular'), url('../../assets/font/open-sans-v17-latin-ext_latin-regular.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD, U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* open-sans-italic - latin-ext_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: normal;
  src: local('Open Sans Italic'), local('OpenSans-Italic'), url('../../assets/font/open-sans-v17-latin-ext_latin-italic.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD, U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* open-sans-700 - latin-ext_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  src: local('Open Sans Bold'), local('OpenSans-Bold'), url('../../assets/font/open-sans-v17-latin-ext_latin-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD, U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* open-sans-700italic - latin-ext_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: bold;
  src: local('Open Sans Bold Italic'), local('OpenSans-BoldItalic'), url('../../assets/font/open-sans-v17-latin-ext_latin-700italic.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD, U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

:deep(html) {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

:deep(body) {
  font-family: "Open Sans", 'Times New Roman', "Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  color: rgb(51, 51, 51);
  line-height: 1.6;
}

:deep(#write) {
  max-width: 860px;
  margin: 0 auto;
  padding: 30px;
  padding-bottom: 100px;
}

@media only screen and (min-width: 1400px) {
  #write {
    max-width: 1024px;
  }
}

@media only screen and (min-width: 1800px) {
  #write {
    max-width: 1200px;
  }
}

:deep(#write > ul:first-child),
#write > ol:first-child {
  margin-top: 30px;
}

:deep(a) {
  color: #4183C4;
}

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: normal;
  line-height: 1.4;
  cursor: text;
}

:deep(h1:hover a.anchor),
:deep(h2:hover a.anchor),
:deep(h3:hover a.anchor),
:deep(h4:hover a.anchor),
:deep(h5:hover a.anchor),
:deep(h6:hover a.anchor) {
  text-decoration: none;
}

:deep(h1 tt),
:deep(h1 code) {
  font-size: inherit;
}

:deep(h2 tt),
:deep(h2 code) {
  font-size: inherit;
}

:deep(h3 tt),
:deep(h3 code) {
  font-size: inherit;
}

:deep(h4 tt),
:deep(h4 code) {
  font-size: inherit;
}

:deep(h5 tt),
:deep(h5 code) {
  font-size: inherit;
}

:deep(h6 tt),
:deep(h6 code) {
  font-size: inherit;
}

:deep(h1) {
  font-size: 2.25em;
  line-height: 1.2;
  border-bottom: 1px solid #eee;
}

:deep(h2) {
  font-size: 1.75em;
  line-height: 1.225;
  border-bottom: 1px solid #eee;
}

:deep(h3) {
  font-size: 1.5em;
  line-height: 1.43;
}

:deep(h4) {
  font-size: 1.25em;
}

:deep(h5) {
  font-size: 1em;
}

:deep(h6) {
  font-size: 1em;
  color: #777;
}

:deep(p),
:deep(blockquote),
:deep(ul),
:deep(ol),
:deep(dl),
:deep(table) {
  font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  margin: 0.8em 0;
}

:deep(li > ol),
:deep(li > ul) {
  margin: 0 0;
  padding: 10px;
}

:deep(hr) {
  height: 2px;
  padding: 0;
  margin: 16px 0;
  background-color: #e7e7e7;
  border: 0 none;
  overflow: hidden;
  box-sizing: content-box;
}

:deep(li p.first) {
  display: inline-block;
}

:deep(ul),
:deep(ol) {
  padding-left: 30px;
}

:deep(ul:first-child),
:deep(ol:first-child) {
  margin-top: 0;
}

:deep(ul:last-child),
:deep(ol:last-child) {
  margin-bottom: 0;
}

:deep(blockquote) {
  border-left: 4px solid #dfe2e5;
  padding: 0 15px;
  color: #777777;
}

:deep(blockquote blockquote) {
  padding-right: 0;
}

:deep(table) {
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  word-break: initial;
  text-align: center;
}

:deep(table tr) {
  border: 1px solid #dfe2e5;
  margin: 0;
  padding: 0;
}

:deep(table tr:nth-child(2n)),
:deep(thead) {
  background-color: #f8f8f8;
}

:deep(table th) {
  font-weight: bold;
  border: 1px solid #dfe2e5;
  border-bottom: 0;
  margin: 0;
  padding: 6px 13px;
}

:deep(table td) {
  border: 1px solid #dfe2e5;
  margin: 0;
  padding: 6px 13px;
}

:deep(table th:first-child),
:deep(table td:first-child) {
  margin-top: 0;
}

:deep(table th:last-child),
:deep(table td:last-child) {
  margin-bottom: 0;
}

:deep(.CodeMirror-lines) {
  padding-left: 4px;
}

:deep(.code-tooltip) {
  box-shadow: 0 1px 1px 0 rgba(0, 28, 36, .3);
  border-top: 1px solid #eef2f2;
}

:deep(.md-fences),
:deep(code),
:deep(tt) {
  font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  border: 1px solid #e7eaed;
  background-color: #f8f8f8;
  border-radius: 3px;
  padding: 0;
  padding: 2px 4px 0px 4px;
  font-size: 1.0em;
}

:deep(code) {
  background-color: #f3f4f4;
  padding: 0 2px 0 2px;
}

:deep(.md-fences) {
  margin-bottom: 15px;
  margin-top: 15px;
  padding-top: 8px;
  padding-bottom: 6px;
}

:deep(.md-task-list-item > input) {
  margin-left: -1.3em;
}

@media print {
  html {
    font-size: 13px;
  }

  table,
  pre {
    page-break-inside: avoid;
  }

  pre {
    word-wrap: break-word;
  }
}

:deep(.md-fences) {
  background-color: #f8f8f8;
}

:deep(#write pre.md-meta-block) {
  padding: 1rem;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f7f7f7;
  border: 0;
  border-radius: 3px;
  color: #777777;
  margin-top: 0 !important;
}

:deep(.mathjax-block > .code-tooltip) {
  bottom: .375rem;
}

:deep(.md-mathjax-midline) {
  background: #fafafa;
}

:deep(#write > h3.md-focus:before) {
  left: -1.5625rem;
  top: .375rem;
}

:deep(#write > h4.md-focus:before) {
  left: -1.5625rem;
  top: .285714286rem;
}

:deep(#write > h5.md-focus:before) {
  left: -1.5625rem;
  top: .285714286rem;
}

:deep(#write > h6.md-focus:before) {
  left: -1.5625rem;
  top: .285714286rem;
}

:deep(.md-image > .md-meta) {
  /*border: 1px solid #ddd;*/
  border-radius: 3px;
  padding: 2px 0px 0px 4px;
  font-size: 0.9em;
  color: inherit;
}

:deep(.md-tag) {
  color: #a7a7a7;
  opacity: 1;
}

:deep(.md-toc) {
  margin-top: 20px;
  padding-bottom: 20px;
}

:deep(.sidebar-tabs) {
  border-bottom: none;
}

:deep(#typora-quick-open) {
  border: 1px solid #ddd;
  background-color: #f8f8f8;
}

:deep(#typora-quick-open-item) {
  background-color: #FAFAFA;
  border-color: #FEFEFE #e5e5e5 #e5e5e5 #eee;
  border-style: solid;
  border-width: 1px;
}

:deep(.on-focus-mode blockquote) {
  border-left-color: rgba(85, 85, 85, 0.12);
}

:deep(header),
:deep(.context-menu),
:deep(.megamenu-content),
:deep(footer) {
  font-family: "Segoe UI", "Arial", sans-serif;
}

:deep(.file-node-content:hover .file-node-icon),
:deep(.file-node-content:hover .file-node-open-state) {
  visibility: visible;
}

:deep(.mac-seamless-mode #typora-sidebar) {
  background-color: #fafafa;
  background-color: var(--side-bar-bg-color);
}

:deep(.md-lang) {
  color: #b4654d;
}

:deep(#md-notification .btn) {
  border: 0;
}

:deep(.dropdown-menu .divider) {
  border-color: #e5e5e5;
  opacity: 0.4;
}

:deep(.ty-preferences .window-content) {
  background-color: #fafafa;
}

:deep(.ty-preferences .nav-group-item.active) {
  color: white;
  background: #999;
}

:deep(.menu-item-container a.menu-style-btn) {
  background-color: #f5f8fa;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 100%, 0));
}
</style>
