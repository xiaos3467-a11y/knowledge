# 图解讲义馆 · 十六册

纯静态单文件教学页,无构建、无依赖:

| 册 | 文件 | 主题色 |
|---|---|---|
| Redis 图解讲义 | `redis-illustrated.html` | 朱 |
| MySQL 图解讲义 | `mysql-illustrated.html` | 靛 |
| Spring 图解讲义 | `spring-illustrated.html` | 翠 |
| Spring Boot 图解讲义 | `spring-boot-illustrated.html` | 缃 |
| Java 并发 图解讲义 | `java-concurrency-illustrated.html` | 玄 |
| JVM 图解讲义 | `jvm-illustrated.html` | 赭 |
| Netty 与 IO 模型 图解讲义 | `netty-illustrated.html` | 黛 |
| 微服务与 Spring Cloud 图解讲义 | `spring-cloud-illustrated.html` | 阵 |
| 设计模式 图解讲义 | `design-patterns-illustrated.html` | 斑 |
| Kubernetes 图解讲义 | `kubernetes-illustrated.html` | 蔚 |
| Elasticsearch 图解讲义 | `elasticsearch-illustrated.html` | 翠 |
| 大模型原理 图解讲义 | `llm-illustrated.html` | 曜 |
| Kafka 图解讲义 | `kafka-illustrated.html` | 绛 |
| SRE 与稳定性工程 图解讲义 | `sre-illustrated.html` | 炎 |
| AI 平台工程 图解讲义 | `llm-platform-illustrated.html` | 航 |
| 计算机网络 图解讲义 | `network-illustrated.html` | 金 |
| 后端架构师 图解讲义 | `architecture-illustrated.html` | 紫 |
| AI Agent 图解讲义 | `ai-agent-illustrated.html` | 青 |
| 术语词典(106 条跨册索引) | `glossary.html` | 典 |
| 门厅(入口) | `index.html` | — |

## 本地打开

双击任意 `.html` 即可,离线可用(字体走 Google Fonts,断网自动落回系统字体)。

## 部署到 Vercel(三选一)

1. **拖拽**:打开 <https://vercel.com/new/drop>,把本文件夹整个拖进去。
2. **CLI**:`npm i -g vercel` → 在本目录执行 `vercel`,首次会引导登录/关联项目;上线用 `vercel --prod`。(`.vercelignore` 已排除 `.claude` 等杂项)
3. **GitHub**:推成仓库 → Vercel 控制台 Import Project → Framework Preset 选 **Other** → 直接 Deploy。以后 push 即自动发布。

> `vercel.json` 已配好短路由:`/redis`、`/mysql`、`/spring`、`/boot`、`/juc`、`/jvm`、`/netty`、`/net`、`/kafka`、`/es`、`/k8s`、`/patterns`、`/cloud`、`/sre`、`/llmops`、`/llm`、`/arch`、`/agent`;并默认开启 clean URL(`/redis-illustrated.html` 也可写作 `/redis-illustrated`)。
> 页面内的互链仍用完整 `.html` 相对路径——这样**双击本地文件也能跑**,两套场景通吃。
> 免费 Hobby 计划的流量额度对这种页面绰绰有余。
> 国内网络对 `*.vercel.app` 的连通性时好时坏,介意的话绑一个自己的域名即可改善。


## 学习进度与自测

- 每册卷末有 5 题自测(判分+解析+回跳原讲),大厅有得分徽章/已读打卡/继续在读
- 数据存在浏览器 localStorage(`kn.quiz.*` / `kn.read.*` / `kn.visit.*`),`file://` 本地打开与线上网站是**两个 origin,进度互不相通**
- 题库源在 `tools/bank/`。**改题库后**须 `node tools/inject.mjs --force-data` 才会把新题写进各册数据区;此后数据区以册内为准(可手改题目),而 `--check` 会把"册内数据 ≠ 题库"报为漂移——两边择一改齐归零
- 日常校验:`node tools/inject.mjs --check` 应 `changed:0`(引擎/进度条/SEO 代码区以 `tools/partials` 为准自动对齐,数据区两边择一人工对齐)
- 术语词典由 `node tools/gen-glossary.mjs` 生成(词条数据内嵌该脚本,出处锚点生成前全量验证)
