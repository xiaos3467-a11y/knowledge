# 图解讲义馆 · 九册

纯静态单文件教学页,无构建、无依赖:

| 册 | 文件 | 主题色 |
|---|---|---|
| Redis 图解讲义 | `redis-illustrated.html` | 朱 |
| MySQL 图解讲义 | `mysql-illustrated.html` | 靛 |
| Spring 图解讲义 | `spring-illustrated.html` | 翠 |
| Spring Boot 图解讲义 | `spring-boot-illustrated.html` | 缃 |
| Java 并发 图解讲义 | `java-concurrency-illustrated.html` | 玄 |
| JVM 图解讲义 | `jvm-illustrated.html` | 赭 |
| 计算机网络 图解讲义 | `network-illustrated.html` | 金 |
| 后端架构师 图解讲义 | `architecture-illustrated.html` | 紫 |
| AI Agent 图解讲义 | `ai-agent-illustrated.html` | 青 |
| 门厅(入口) | `index.html` | — |

## 本地打开

双击任意 `.html` 即可,离线可用(字体走 Google Fonts,断网自动落回系统字体)。

## 部署到 Vercel(三选一)

1. **拖拽**:打开 <https://vercel.com/new/drop>,把本文件夹整个拖进去。
2. **CLI**:`npm i -g vercel` → 在本目录执行 `vercel`,首次会引导登录/关联项目;上线用 `vercel --prod`。(`.vercelignore` 已排除 `.claude` 等杂项)
3. **GitHub**:推成仓库 → Vercel 控制台 Import Project → Framework Preset 选 **Other** → 直接 Deploy。以后 push 即自动发布。

> `vercel.json` 已配好短路由:`/redis`、`/mysql`、`/spring`、`/boot`、`/juc`、`/jvm`、`/net`、`/arch`、`/agent`;并默认开启 clean URL(`/redis-illustrated.html` 也可写作 `/redis-illustrated`)。
> 页面内的互链仍用完整 `.html` 相对路径——这样**双击本地文件也能跑**,两套场景通吃。
> 免费 Hobby 计划的流量额度对这种页面绰绰有余。
> 国内网络对 `*.vercel.app` 的连通性时好时坏,介意的话绑一个自己的域名即可改善。

