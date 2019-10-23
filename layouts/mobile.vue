<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
const rem =
  "(function (doc, win) {     \
  var reg = new RegExp('(^|&)zoom=([^&]*)(&|$)');     \
  var r = win.location.search.substr(1).match(reg);     \
  var zoom = 100;    \
  if (r && unescape(r[2])) {    \
      zoom = unescape(r[2])   \
  }   \
  var docEl = doc.documentElement,    \
      resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',    \
      recalc = function () {    \
          var clientWidth = docEl.clientWidth || doc.body.clientWidth;    \
          if (!clientWidth) return;   \
          if (clientWidth >= 750) {   \
              clientWidth = 750;    \
          }   \
          docEl.style.fontSize = zoom * (clientWidth / 750) + 'px';   \
      };    \
  if (!doc.addEventListener) return;    \
  win.addEventListener(resizeEvt, recalc, false);   \
  recalc();   \
})(document, window);";
export default {
  head() {
    return {
      title: "test",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "this is test page"
        },
        {
          hid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui"
        },
        {
          hid: "screen-orientation",
          name: "screen-orientation",
          content: "portrait"
        },
        {
          hid: "apple-mobile-web-app-capable",
          name: "apple-mobile-web-app-capable",
          content: "yes"
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "telephone=no"
        },
        {
          hid: "full-screen",
          name: "full-screen",
          content: "yes"
        },
        {
          hid: "x5-fullscreen",
          name: "x5-fullscreen",
          content: "true"
        },
        {
          'http-equiv': "Expires",
          content: "0"
        },
        {
          'http-equiv': "Pragma",
          content: "no-cache"
        },
        {
          'http-equiv': "Cache-Control",
          content: "no-cache, no-store, must-revalidate"
        }
      ],
      script: [{ innerHTML: rem, type: "text/javascript", charset: "utf-8" }],
      __dangerouslyDisableSanitizers: ["script"]
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button,
.button:visited {
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover,
.button:focus {
  color: #fff;
  background-color: #000;
}

.title {
  color: #000;
  font-weight: 300;
  font-size: .25rem;
  margin: 0;
}
</style>
