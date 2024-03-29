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

    repo: "https://github.com/guo-429010/Theme-Blog",

    docsDir: "src",

    fullscreen: true,

    navbar: [
      { text: "首页", icon: "home", link: "/" },
      { text: "前端", icon: "vscode", link: "/front/" },
      { text: "后端", icon: "template", link: "/back/" },
      { text: "工具", icon: "config", link: "/tool/" },
      { text: "文章", icon: "article", link: "/hot/" }
    ],
    sidebar: {
      "/back/": [
        '',
        {
          text: 'Java',
          icon: "java",
          collapsible: true,
          prefix: "java",
          children: "structure"
        },
        {
          text: 'Linux',
          icon: "linux",
          collapsible: true,
          prefix: "linux",
          children: "structure"
        },
        {
          text: 'MySQL',
          icon: "mysql",
          collapsible: true,
          prefix: "mysql",
          children: "structure"
        },
        {
          text: 'Node',
          icon: "nodeJS",
          collapsible: true,
          prefix: "node",
          children: "structure"
        }
      ],
      "/front/": [
        '',
        {
          text: 'Vue',
          icon: "vue",
          collapsible: true,
          prefix: "vue",
          children: "structure"
        },
        {
          text: 'React',
          icon: 'react',
          collapsible: true,
          prefix: "react",
          children: "structure"
        },
        {
          text: 'JavaScript',
          icon: "javascript",
          collapsible: true,
          prefix: "js",
          children: "structure"
        },
        {
          text: 'Css',
          icon: "css",
          collapsible: true,
          prefix: "css",
          children: "structure"
        },
        {
          text: 'Html',
          icon: "html",
          collapsible: true,
          prefix: "html",
          children: "structure"
        }
      ],
      "/tool/": "structure",
      "/hot/": [
        {
          text: '文心一言',
          icon: "/assets/icon/yiyan.png",
          collapsible: true,
          prefix: "yiyan",
          children: "structure"
        },
        {
          text: '必应',
          icon: "/assets/icon/bing.svg",
          collapsible: true,
          prefix: "bing",
          children: "structure"
        },
        {
          text: '问题记录',
          icon: 'write',
          collapsible: true,
          prefix: 'record',
          children: "structure"
        }
      ]
    },

    sidebarSorter: ['readme','order'],

    headerDepth: 4,

    blog: {
      avatar: "/assets/images/avatar.png",
      roundAvatar: true,
      name: "JiuHous",
      description: "未觉池塘春草梦，阶前梧叶已秋声。",
      timeline: '从初识灵感的那一刻，到字句斟酌的反复推敲，再到最终破壳而出的作品，每个瞬间都充满了无尽的的可能和瑰丽。犹如一部文艺电影，细节丰富，情节跌宕，让人陶醉。让我们一起用时间书写，用情感酝酿，用文字铭记，那些独一无二的时刻。',
      medias: {
        Gitee: "https://gitee.com/guo567",
        GitHub: "https://github.com/guo-429010",
        QQ: "tencent://Message/?Uin=1309042148&websiteName=www.oicqzone.com&Menu=yes"
      },
      articlePerPage: 6
    },

    footer: `<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">赣ICP备2022010645号</a>`,
    copyright: "Copyright © 2023 JiuHous",
    displayFooter: true,

    plugins: {
      blog: true,

      comment: {
        provider: "Giscus",
        repo: "guo-429010/Theme-Blog",
        repoId: "R_kgDOJqF4kQ",
        category: "Announcements",
        categoryId: "DIC_kwDOJqF4kc4CW4TS"
      },

      copyCode: {
        duration: 1000
      },

      // all features are enabled for demo, only preserve features you need here
      mdEnhance: {
        align: true,
        attrs: true,
        chart: true,
        codetabs: true,
        demo: {
          jsfiddle: false,
          codepen: false
        },
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
        card: true,
        playground: {
          presets: ["ts", "vue"],
        },
        presentation: true,
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
