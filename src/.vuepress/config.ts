import { defineUserConfig } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import theme from "./theme.js";

const _dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: "/",
  lang: 'zh-CN',
  locales: {
    "/": {
      lang: "zh-CN",
      title: "但偏偏风渐渐",
      description: "JiuHous Blog"
    }
  },
  theme,
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      _dirname,
      "./components/BlogHero.vue"
    )
  }
});
