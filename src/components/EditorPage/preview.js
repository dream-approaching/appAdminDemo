export const preview = body => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <title>Preview Content</title>
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: auto;
        background-color: #fff;
      }
      body {
        padding: 0 16px;
      }
      .app-block-bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 8px;
        border: 1px solid #ddd;
      }
      .app-block-left {
        display: flex;
        flex-direction: row;
        flex: 1;
      }
      .app-icon {
        min-width: 1.653rem;
        width: 1.653rem;
        height: 1.653rem;
        border-radius: 5px;
        overflow: hidden;
      }
      .app-icon img {
        width: 100%;
        height: 100%;
      }
      .app-content {
        margin-left: 0.426rem;
      }
      .app-title {
        font-size: 0.4rem;
        color: #333;
        display: block;
      }
      .app-desc {
        font-size: 0.346rem;
        color: #707070;
      }
      .downloadBtn {
        background: linear-gradient(180deg, #ff676e, #ff8c60);
        width: 2.666rem;
        padding: 8px 0;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-content: center;
        color: #fff;
        margin-left: 0.426rem;
      }
      .container {
        box-sizing: border-box;
        width: 1000px;
        max-width: 100%;
        min-height: 100%;
        margin: 0 auto;
        padding: 30px 20px;
        overflow: hidden;
        background-color: #fff;
        border-right: solid 1px #eee;
        border-left: solid 1px #eee;
      }
      .container img,
      .container audio,
      .container video {
        max-width: 100%;
        height: auto;
      }
      .container p {
        white-space: pre-wrap;
        min-height: 1em;
      }
      .container pre {
        padding: 15px;
        background-color: #f1f1f1;
        border-radius: 5px;
      }
      .container blockquote {
        margin: 0;
        padding: 15px;
        background-color: #f1f1f1;
        border-left: 3px solid #d1d1d1;
      }
      .braft-output-content p {
        min-height: 1em;
      }
      .braft-output-content .image-wrap img {
        max-width: 100%;
        height: auto;
      }
      .braft-output-content ul,
      .braft-output-content ol {
        margin: 16px 0;
        padding: 0;
      }
      .braft-output-content blockquote {
        margin: 0 0 10px 0;
        padding: 15px 20px;
        background-color: #f1f2f3;
        border-left: solid 5px #ccc;
        color: #666;
        font-style: italic;
      }
      .braft-output-content pre {
        max-width: 100%;
        max-height: 100%;
        margin: 10px 0;
        padding: 15px;
        overflow: auto;
        background-color: #f1f2f3;
        border-radius: 3px;
        color: #666;
        font-family: monospace;
        font-size: 14px;
        font-weight: normal;
        line-height: 16px;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      .braft-output-content pre pre {
        margin: 0;
        padding: 0;
      }
      .image-wrap img {
        line-height: 0; /*用于消除图片默认的下边距，或者用line-height:0;也行*/
      }
      .image-wrap + p:empty {
        display: none;
      }
    </style>
  </head>
  <body>
    ${body}
    <script>
      (function(win, lib) {
        var doc = win.document;
        var docEl = doc.documentElement;
        var metaEl = doc.querySelector('meta[name="viewport"]');
        var flexibleEl = doc.querySelector('meta[name="flexible"]');
        var dpr = 0;
        var scale = 0;
        var tid;
        var flexible = lib.flexible || (lib.flexible = {});

        var appArr = document.getElementsByClassName('app-block-bar')
        for (var i = 0, len = appArr.length; i < len; i++) {
          const { name, desc, logo } = appArr[i].dataset;
          appArr[i].innerHTML = '<div class="app-block-left"><div class="app-icon"><img alt="download" src="'+logo+'"></div><div class="app-content"><span class="app-title">'+name+'</span><span class="app-desc">'+desc+'</span></div></div><div class="downloadBtn"><span>下载</span></div>'
        }
        
        



        if (metaEl) {
          console.warn('将根据已有的meta标签来设置缩放比例');
          var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
          if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
          }
        } else if (flexibleEl) {
          var content = flexibleEl.getAttribute('content');
          if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
              dpr = parseFloat(initialDpr[1]);
              scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
              dpr = parseFloat(maximumDpr[1]);
              scale = parseFloat((1 / dpr).toFixed(2));
            }
          }
        }

        if (!dpr && !scale) {
          var isAndroid = win.navigator.appVersion.match(/android/gi);
          var isIPhone = win.navigator.appVersion.match(/iphone/gi);
          var devicePixelRatio = win.devicePixelRatio;
          if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
              dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
              dpr = 2;
            } else {
              dpr = 1;
            }
          } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
          }
          scale = 1 / dpr;
        }

        docEl.setAttribute('data-dpr', dpr);
        if (!metaEl) {
          metaEl = doc.createElement('meta');
          metaEl.setAttribute('name', 'viewport');
          metaEl.setAttribute(
            'content',
            'initial-scale=' +
              scale +
              ', maximum-scale=' +
              scale +
              ', minimum-scale=' +
              scale +
              ', user-scalable=no'
          );
          if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
          } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
          }
        }

        function refreshRem() {
          var width = docEl.getBoundingClientRect().width;
          if (width / dpr > 540) {
            width = 540 * dpr;
          }
          var rem = width / 10;
          docEl.style.fontSize = rem + 'px';
          flexible.rem = win.rem = rem;
        }

        win.addEventListener(
          'resize',
          function() {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
          },
          false
        );
        win.addEventListener(
          'pageshow',
          function(e) {
            if (e.persisted) {
              clearTimeout(tid);
              tid = setTimeout(refreshRem, 300);
            }
          },
          false
        );

        if (doc.readyState === 'complete') {
          doc.body.style.fontSize = 12 * dpr + 'px';
        } else {
          doc.addEventListener(
            'DOMContentLoaded',
            function(e) {
              doc.body.style.fontSize = 12 * dpr + 'px';
            },
            false
          );
        }

        refreshRem();

        flexible.dpr = win.dpr = dpr;
        flexible.refreshRem = refreshRem;
        flexible.rem2px = function(d) {
          var val = parseFloat(d) * this.rem;
          if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
          }
          return val;
        };
        flexible.px2rem = function(d) {
          var val = parseFloat(d) / this.rem;
          if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
          }
          return val;
        };
      })(window, window['lib'] || (window['lib'] = {}));
    </script>
  </body>
</html>
`;
};
