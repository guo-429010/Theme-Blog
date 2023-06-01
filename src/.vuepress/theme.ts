import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme(
  {
    hostname: "http://guo123.top",

    author: {
      name: "JiuHous",
      url: "http://guo123.top",
    },

    iconAssets: "iconfont",

    logo: "/logo.svg",

    favicon: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "docs",

    fullscreen: true,

    navbar: [
      { text: "首页", icon: "home", link: "/" },
      { text: "演示", icon: "select", link: "/demo/" },
      {
        text: "博文",
        icon: "blog",
        prefix: "/posts/",
        children: [
          "cherry",
          "dragonfruit",
          "tomato",
          "strawberry",
          {
            text: "苹果",
            link: "apple"
          },
          {
            text: "香蕉",
            link: "banana"
          }
        ]
      },
      {
        text: "V2 文档",
        icon: "note",
        link: "https://theme-hope.vuejs.press/zh/",
      },
    ],
    sidebar: {
      "/demo/": [
        {
          text: '主要功能与配置演示',
          icon: "select",
          collapsible: false,
          children: [
            "",
            "page",
            "markdown",
            "encrypt",
            "disable"
          ]
        }
      ],
      "/posts/": [
        {
          text: "博客文章",
          collapsible: false,
          icon: "blog",
          children: [
            "cherry",
            "dragonfruit",
            "strawberry",
            "tomato",
            {
              text: "苹果",
              prefix: "apple",
              collapsible: true,
              children: "structure"
            },
            {
              text: "香蕉",
              prefix: "banana",
              collapsible: true,
              children: "structure"
            }
          ]
        }
      ]
    },

    blog: {
      avatar: "/assets/images/avatar.png",
      roundAvatar: true,
      name: "JiuHous",
      description: "未觉池塘春草梦，阶前梧叶已秋声。",
      medias: {
        Gitee: "https://gitee.com/guo567",
        GitHub: "https://github.com/guo-429010",
        QQ: "tencent://Message/?Uin=1309042148&websiteName=www.oicqzone.com&Menu=yes"
      },
      articlePerPage: 6
    },

    footer: "赣ICP备2022010645号",
    copyright: "Copyright © 2023 JiuHous",
    displayFooter: true,

    plugins: {
      blog: true,

      comment: {
        provider: "Giscus",
      },

      // all features are enabled for demo, only preserve features you need here
      mdEnhance: {
        align: true,
        attrs: true,
        chart: true,
        codetabs: true,
        demo: true,
        echarts: true,
        figure: true,
        flowchart: true,
        gfm: true,
        imgLazyload: true,
        imgSize: true,
        include: true,
        katex: true,
        mark: true,
        mermaid: true,
        playground: {
          presets: ["ts", "vue"],
        },
        presentation: {
          plugins: ["highlight", "math", "search", "notes", "zoom"],
        },
        stylize: [
          {
            matcher: "Recommended",
            replacer: ({ tag }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommended",
                };
            },
          },
        ],
        sub: true,
        sup: true,
        tabs: true,
        vPre: true,
        vuePlayground: true,
      }
    }
  },
  {
    custom: true
  }
);
