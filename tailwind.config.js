/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-10-21 10:24:19
 * @LastEditTime: 2022-12-30 10:28:27
 * @LastEditors: 王占领
 */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
   important: false,
   content: [
      "./index.html",
      "./src/App.vue",
      "./src/Components/**/*.vue",
      "./src/Layout/**/*.{vue,tsx,jsx}",
      "./src/Views/**/*.{vue,jsx,tsx}"
   ],
   corePlugins: [
      // 启用的核心插件/工具类。
      // preflight 插件用来开启 tailwind 的对 html 元素的默认样式设置，preflight 插件未启用，
      // 否则会影响 element 的样式，需要在 element 样式引入前引入。
      "margin",
      "padding",
      "backgroundColor",
      "alignItems",
      "alignSelf",
      "backgroundImage",
      "backgroundOpacity",
      "backgroundOrigin",
      "backgroundPosition",
      "backgroundRepeat",
      "backgroundSize",
      "borderColor",
      "borderOpacity",
      "borderRadius",
      "borderStyle",
      "borderWidth",
      "boxShadow",
      "boxShadowColor",
      "boxSizing",
      "cursor",
      "display",
      "fill",
      "flex",
      "flexBasis",
      "flexDirection",
      "flexShrink",
      "flexGrow",
      "float",
      "fontFamily",
      "fontSize",
      "fontStyle",
      "fontWeight",
      "gap",
      "height",
      "inset",
      "justifyContent",
      "justifyItems",
      "justifySelf",
      "lineHeight",
      "listStyleType",
      "maxHeight",
      "maxWidth",
      "minHeight",
      "minWidth",
      "opacity",
      "order",
      "overflow",
      "placeholderColor",
      "position",
      "strokeWidth",
      "stroke",
      "space",
      "textAlign",
      "textColor",
      "textDecoration",
      "textDecorationStyle",
      "textIndent",
      "textOverflow",
      "textTransform",
      "transform",
      "transformOrigin",
      "transitionDelay",
      "transitionDuration",
      "transitionProperty",
      "transitionTimingFunction",
      "translate",
      "verticalAlign",
      "visibility",
      "whitespace",
      "width",
      "zIndex",
      "wordBreak"
   ],
   theme: {
      // 覆盖/屏蔽默认主题配置
      colors: {
         transparent: "transparent",
         current: "currentColor",
         black: colors.black,
         white: {
            100: colors.white,
            85: "rgba(255, 255, 255, 0.85)",
            60: "rgba(255, 255, 255, 0.6)"
         },
         brand: {
            primary: "var(--color-primary)" // 主色，对应 element 的 color-primary
         },
         font: {
            // 对应 element 的字体（文本）颜色
            primary: "var(--text-color-primary)",
            regular: "var(--text-color-regular)",
            secondary: "var(--text-color-secondary)",
            placeholder: "var(--text-color-placeholder)",
            disabled: "var(--text-color-disabled)"
         },
         line: {
            // 对应 element 中的 border 的颜色
            darker: "var(--border-color-darker)",
            dark: "var(--border-color-dark)",
            base: "var(--border-color)",
            light: "var(--border-color-light)",
            lighter: "var(--border-color-lighter)",
            "extra-light": "var(--border-color-extra-light)"
         },
         fill: {
            darker: "var(--fill-color-darker)",
            dark: "var(--fill-color-dark)",
            base: "var(--fill-color)",
            light: "var(--fill-color-light)",
            lighter: "var(--fill-color-lighter)",
            "extra-light": "var(--fill-color-extra-light)"
         },
         "page-bg": "var(--bg-color-page)",
         mask: "var(--mask-color)"
      },
      screens: {},
      spacing: {
         0: "0px",
         px: "1px",
         0.5: "2px",
         1: "4px",
         1.5: "6px",
         2: "8px",
         3: "12px",
         4: "16px",
         5: "20px",
         6: "24px",
         7: "28px",
         8: "32px",
         9: "36px",
         10: "40px",
         15: "60px"
      },
      fontSize: {
         sm: ["12px", "16px"],
         base: ["14px", "20px"],
         me: ["16px", "24px"],
         lg: ["24px", "32px"],
         xl: ["36px", "44px"],
         DEFAULT: "14px"
      },
      fontFamily: { inherit: "inherit", mono: defaultTheme.fontFamily.mono },
      extend: {
         // 继承默认主题的配置
         lineHeight: {
            initial: "initial"
         },
         flexBasis: {
            fit: "fit-content"
         },
         borderRadius: {
            DEFAULT: "6px"
         }
      }
   },
   plugins: []
};
