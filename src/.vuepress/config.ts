import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "py tutorial",
  description: "sch246的python教程",

  head: [
    ['link', { rel: 'stylesheet', href: '/pyscript/release/core.css' }],
    ['script', { type: 'module', src: '/pyscript/release/core.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js' }]
  ],

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: false,

  // 代码超过6行才显示行号
  markdown: {
    code: {
      lineNumbers: 6,
    },
  },
  extendsMarkdown: (md) => {
    const f = md.renderer.rules.text ?? ((tokens, idx) => tokens[idx].content);
    md.renderer.rules.text = (...args) =>
      f(...args).replace(
        /##(.+)##/g,
        '<span title="你知道的太多了" class="cover">$1</span>'
      );
      let a = md.renderer.rules.fence
      md.renderer.rules.fence = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        let info = token.info.trim()
        // 检查语言是否为 "py edit"
        for (const check of ['py edit','python edit','py m-edit','python m-edit']){
          if (info.startsWith(check)) {
            // 返回定制的 PyScriptEditor 组件
            info = info.replace(check,'')

            let add = (check==='py m-edit' || check==='python m-edit')?'mpy':'py'

            if (info){
              return `<pre type="${add}-editor" ${info.trim()}>${token.content}</pre>`
            } else {
              return `<pre type="${add}-editor">${token.content}</pre>`
            }
          }
        }
        // 默认渲染方式
        let b = a ?? self.renderToken
        return b(tokens, idx, options, env, self);
      };
  },

  plugins: [
  ],
});
