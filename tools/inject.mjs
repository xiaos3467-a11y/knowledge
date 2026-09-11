// tools/inject.mjs · 图解讲义馆资产注入管线（整区替换 + 版本标记 + all-or-nothing）
// 用法: node tools/inject.mjs [--check] [--force-seo]
// 区块契约: kn:seo(head) / kn:pbar(body) / kn:quiz-data(仅缺失时初写,注入器之后只读) / kn:quiz-engine(版本替换)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.join(__dirname,'..');
global.BANK=null;
for(const p of ['p1','p2','p3'])require('./bank/quiz-bank-'+p+'.js');
const BANK=global.BANK;

const META={ // slug -> {file,han,c,desc}
 redis:{f:'redis-illustrated',han:'朱',c:'#CE3B24',d:'Redis 内存缓存十二讲：事件循环、数据结构、持久化、三大缓存问题、主从哨兵 Cluster 与分布式锁的交互动画讲义。'},
 mysql:{f:'mysql-illustrated',han:'靛',c:'#15607E',d:'MySQL 存储引擎十二讲：B+ 树、回表覆盖、WAL 两阶段提交、MVCC、隔离级别与锁、EXPLAIN 与容量实演的交互动画讲义。'},
 spring:{f:'spring-illustrated',han:'翠',c:'#3D7A2C',d:'Spring 十二讲：IoC、Bean 生命周期、三级缓存循环依赖、AOP 代理禁区、事务传播与失效、扩展点与 MVC 流程讲义。'},
 boot:{f:'spring-boot-illustrated',han:'缃',c:'#B4530A',d:'Spring Boot 十一讲：自动装配漏斗、BOM 仲裁、配置水塔、fat jar、Actuator、自研 starter 与测试切片的图解讲义。'},
 'java-concurrency':{f:'java-concurrency-illustrated',han:'玄',c:'#3D5A80',d:'Java 并发十一讲：JMM、volatile、锁升级、CAS/AQS、线程池沙盘、ThreadLocal、ConcurrentHashMap 与 CompletableFuture 图解讲义。'},
 jvm:{f:'jvm-illustrated',han:'赭',c:'#8B5E3C',d:'JVM 十一讲：运行时数据区、对象布局、GC 算法与收集器搬球赛、卡表、类加载、JIT、诊断命令与容器内存的图解讲义。'},
 network:{f:'network-illustrated',han:'金',c:'#7D6B1E',d:'计算机网络十讲：封装解封装、TCP 握手挥手、重传与拥塞控制、QUIC、HTTP/TLS/DNS 与身份认证排障的图解讲义。'},
 netty:{f:'netty-illustrated',han:'黛',c:'#41605C',d:'Netty 与 IO 模型十讲：select/epoll、EventLoop、Pipeline、ByteBuf 引用计数、零拷贝、拆包心跳与私有协议解码的图解讲义。'},
 kafka:{f:'kafka-illustrated',han:'绛',c:'#7C2F52',d:'Kafka 九讲：分区路由、ISR/HW 水位、消费组重平衡、幂等级联、参数生死矩阵、Lag 诊室与事务 LSO 的图解讲义。'},
 elasticsearch:{f:'elasticsearch-illustrated',han:'松',c:'#2E6B4F',d:'Elasticsearch 七讲：倒排索引实验室、写入路径与近实时、BM25 打分、聚合、深分页与集群路由的图解讲义。'},
 kubernetes:{f:'kubernetes-illustrated',han:'蔚',c:'#326CE5',d:'Kubernetes 七讲：调度台、Pod 解剖、调和环、Service 网络、PV/PVC、探针与优雅下线、HPA 与控制面接力的图解讲义。'},
 'design-patterns':{f:'design-patterns-illustrated',han:'斑',c:'#7A5C2E',d:'设计模式九讲：GoF 23 格宫格、策略/装饰器/单例擂台/观察者/责任链/代理/建造者浅拷贝的实景样板间讲义。'},
 'spring-cloud':{f:'spring-cloud-illustrated',han:'阵',c:'#4763A0',d:'微服务与 Spring Cloud 九讲：注册心跳、least-active、灰度阀门、配置热更、重试风暴与韧性五问的图解讲义。'},
 architecture:{f:'architecture-illustrated',han:'紫',c:'#6B3FA0',d:'后端架构师十三讲：CAP、一致性哈希、限流熔断、雪花 ID、MQ 可靠性、分布式事务、单元化与容量估算的决策地图讲义。'},
 'ai-agent':{f:'ai-agent-illustrated',han:'青',c:'#0F6E73',d:'AI Agent 十二讲：会跑的迷你 Agent 循环、温度采样、工具调用、记忆策略、RAG、评测、提示注入攻防与成本工程讲义。'},
 llm:{f:'llm-illustrated',han:'曜',c:'#1F3A63',d:'大模型原理九讲：注意力之网、QKV 手算、Transformer Block、训练三部曲、KV Cache、显存墙与 LoRA 的图解讲义。'},
 'llm-platform':{f:'llm-platform-illustrated',han:'航',c:'#33566B',d:'AI 平台工程十讲：AI 网关、级联路由、Prompt 注册表、评测进 CI、LLM 可观测、自建盈亏线、FinOps 与模型生命周期讲义。'},
 sre:{f:'sre-illustrated',han:'炎',c:'#B03A2E',d:'SRE 与稳定性工程十讲：错误预算、多窗口燃烧率告警、事故指挥、变更治理、容量拐点与混沌演练的消防队讲义。'},
};

const CHECK=process.argv.includes('--check'),FORCED_SEO=process.argv.includes('--force-seo'),FORCE_DATA=process.argv.includes('--force-data');
const PBAR=fs.readFileSync(path.join(__dirname,'partials/pbar.html'),'utf8');
const ENGINE=fs.readFileSync(path.join(__dirname,'partials/quiz-engine.html'),'utf8');

function favicon(han,c){
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='${c}'/><text x='50' y='73' font-size='62' text-anchor='middle' fill='white' font-family='serif' font-weight='900'>${han}</text></svg>`;
  return `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(svg)}">`;
}
function seoBlock(m,pageTitle){
  return `<!--kn:seo-->\n<meta name="description" content="${m.d}">\n<meta property="og:title" content="${pageTitle}">\n<meta property="og:description" content="${m.d}">\n<meta property="og:type" content="article">\n${favicon(m.han,m.c)}\n<!--/kn:seo-->`;
}
function dataBlock(items){
  return `<!--kn:quiz-data v1-->\n<script>window.__KN_QUIZ_DATA__=${JSON.stringify(items).replace(/</g,'\\u003c')}</script>\n<!--/kn:quiz-data-->`;
}
// 通用: 成对标记整区替换 / 无则插入(after=true 插到锚点之后,否则之前)
function applyBlock(html,{open,close,content,anchor,after}){
  const i=html.indexOf(open),j=html.indexOf(close);
  if(i>-1&&j>-1&&j>i){
    return html.slice(0,i)+content+html.slice(j+close.length);
  }
  if((i>-1)!==(j>-1))throw new Error('标记破损: '+open);
  let pos=anchor?html.indexOf(anchor):-1;
  if(pos>-1&&anchor&&after)pos+=anchor.length;
  if(pos>-1)return html.slice(0,pos)+content+'\n'+html.slice(pos);
  if(html.includes('</body>'))return html.replace('</body>',content+'\n</body>');
  throw new Error('无插入点 '+open);
}
/* 两阶段:全部算完放内存,零错误才统一落盘(check 模式只比对) */
const errors=[];const pending=[];let changed=0;
for(const slug in META){
  const m=META[slug],file=path.join(ROOT,m.f+'.html');
  let html;
  try{html=fs.readFileSync(file,'utf8');}catch(e){errors.push(slug+':读取失败');continue;}
  const orig=html;
  const bookSlug=m.f.replace(/-illustrated$/,''); // 契约:slug=文件名词干(与大厅卡片 id 一致)
  try{
    // head: seo
    if(FORCED_SEO||!html.includes('<!--kn:seo-->')){
      const title=(html.match(/<title>([^<]*)<\/title>/)||[,''])[1];
      html=applyBlock(html,{open:'<!--kn:seo-->',close:'<!--/kn:seo-->',content:seoBlock(m,title),anchor:'</title>',after:true});
    }
    const items=BANK[m.f];
    if(items){
      for(const it of items){
        const id=String(it.ref||'').replace('#','');
        if(!id||!new RegExp('id="'+id+'"').test(html))throw new Error('锚点缺失 '+it.ref);
        if(!Array.isArray(it.o)||it.o.length!==4)throw new Error('选项非法');
        if(!Number.isInteger(it.a)||it.a<0||it.a>3)throw new Error('正确项下标非法');
        if(!/^#[\w-]+$/.test(String(it.ref)))throw new Error('ref 非锚点格式: '+it.ref);
      }
      const wantData=dataBlock(items);
      if(!html.includes('<!--kn:quiz-data')||FORCE_DATA){
        html=applyBlock(html,{open:'<!--kn:quiz-data',close:'<!--/kn:quiz-data-->',content:wantData,anchor:'<style>.home-back'});
      }else if(CHECK){
        // check 模式:在册数据区与题库重算结果比对,漂移计入 changed
        const i0=html.indexOf('<!--kn:quiz-data'),i1=html.indexOf('<!--/kn:quiz-data-->');
        if(html.slice(i0,i1+'<!--/kn:quiz-data-->'.length)!==wantData)html=applyBlock(html,{open:'<!--kn:quiz-data',close:'<!--/kn:quiz-data-->',content:wantData,anchor:null});
      }
      // 引擎: 版本替换
      html=applyBlock(html,{open:'<!--kn:quiz-engine',close:'<!--/kn:quiz-engine-->',content:ENGINE.replace(/\{\{SLUG\}\}/g,bookSlug),anchor:'<style>.home-back'});
    }else errors.push(slug+': 题库缺失');
    // pbar
    html=applyBlock(html,{open:'<!--kn:pbar',close:'<!--/kn:pbar-->',content:PBAR,anchor:'<style>.home-back'});
  }catch(e){errors.push(slug+': '+e.message);continue;}
  if(html!==orig){changed++;pending.push([file,html]);}
}
if(!errors.length&&!CHECK)for(const [f,h] of pending)fs.writeFileSync(f,h);
console.log(JSON.stringify({mode:CHECK?'check':'inject',changed,books:Object.keys(META).length,errors},null,1));
if(errors.length)process.exit(2);
if(CHECK&&changed>0)process.exit(1);
