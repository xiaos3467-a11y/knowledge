// 夜间构建资产 · 卷末自测题库 part2（6 册 × 5 题）
const BANK=global.BANK||(global.BANK={});

BANK['network-illustrated']=[
 {q:'TCP 三次握手最少要三次的原因是？',o:['网络规定如此','两次无法确认"服务端发→客户端收"这个方向；第三次恰好顺带确认双方','防重放攻击','同步时钟'],a:1,
  why:'每次握手都在验一个方向：①验我发你能收 ②验你发我能收+确认① ③确认②——两次永远差最后一条腿。',ref:'#ch-tcp',rt:'第三讲 · 握手'},
 {q:'TIME_WAIT 等 2MSL 的两个目的是？',o:['等计费完成','保证最后的 ACK 丢了能重答；让本连接旧包在网络中死透再复用四元组','等 TCP_NODELAY 生效','冷却服务器端口'],a:1,
  why:'最后 ACK 丢失→对端重发 FIN 还能应答；旧包若串进同端口新连接就是数据污染——两个"善后"。',ref:'#ch-tcp',rt:'第四讲 · 挥手'},
 {q:'收到 3 个重复 ACK 触发的动作是？',o:['超时重传','快重传：不等 RTO 立即补发丢失段','关闭连接','缩小到 1 个段'],a:1,
  why:'重复 ACK 说明后面包还在到、只有中间那一个没到——比干等 RTO 快一个数量级，是"丢包证据"而非"失联证据"。',ref:'#ch-loss',rt:'第五讲 · 快重传'},
 {q:'拥塞控制里"慢启动"名字的真实含义是？',o:['一开始就慢速发送','指数增长快速探路，到 ssthresh 才转线性加法','先降速再恢复','仅用于新连接'],a:1,
  why:'它其实是最猛的加速阶段：每个 RTT 翻倍；AIMD 的"乘性减+加性增"才构成锯齿与公平收敛。',ref:'#ch-cong',rt:'第六讲 · 拥塞'},
 {q:'HTTP/3(QUIC) 相对 HTTP/2 最本质的改良是？',o:['头部压缩更强','把多路复用到传输层：每条流独立重传，丢包不再连坐全部流','支持 WebSocket','使用 UDP 所以不可靠'],a:1,
  why:'H2 的复用只到应用层，TCP 有序交付一丢全堵；QUIC 把"流"下放传输协议，队头阻塞从根上拆掉。',ref:'#ch-hol',rt:'第七讲 · 队头阻塞'},
];

BANK['netty-illustrated']=[
 {q:'epoll 相对 select 的两大结构性优势是？',o:['支持更多协议','注册一次免每轮全量拷贝；就绪链表回调，返回 O(就绪数) 而非 O(总 fd)','没有 1024 限制而已','使用共享内存'],a:1,
  why:'select 每轮把整张 fd 集合用户↔内核来回搬；epoll_ctl 注册一次,epoll_wait 直接摘"谁就绪了"的名单。',ref:'#ch-io',rt:'第一讲 · IO 模型'},
 {q:'Netty"一个 Channel 终生绑定一个 EventLoop"带来的最大红利是？',o:['线程更多','Handler 里无共享竞争、免加锁（无锁串行化）','零拷贝','自动重连'],a:1,
  why:'所有事件在同一线程串行处理——竞态从源头消失；代价也随之而来：绝不能在 handler 里干阻塞活。',ref:'#ch-loop',rt:'第三讲 · EventLoop'},
 {q:'Pipeline 里入站事件的方向是？',o:['tail→head','head→tail，且只有 InboundHandler 参与；写向相反且只有 Outbound 参与','随机','双向广播'],a:1,
  why:'入站读事件从 head 流到业务，出站 write 从触发节点流回 head——两条单行道;忘 fireChannelRead 链就在你这站断掉。',ref:'#ch-pipe',rt:'第四讲 · Pipeline'},
 {q:'ByteBuf 相比 JDK ByteBuffer 最省心的改良是？',o:['不用关闭','读游标写游标分离,flip() 整个概念消失','支持 gzip','自动扩容到无限'],a:1,
  why:'readerIndex/writerIndex 各走各的，读写之间不再需要翻转仪式；配合引用计数与池化才是完整体。',ref:'#ch-buf',rt:'第五讲 · ByteBuf'},
 {q:'LengthFieldBasedFrameDecoder 的参数集在解决什么？',o:['加密','告诉拆包器:长度字段在哪、几字节、要不要加自身、跳过长 header——把 TCP 流切回消息','压缩','心跳'],a:1,
  why:'TCP 无消息边界,一切"读固定字节数"都会漂移;把边界规则交给长度字段,协议解码=拆包器+两个映射器。',ref:'#ch-frame',rt:'第七讲 · 拆包'},
];

BANK['kafka-illustrated']=[
 {q:'HW（高水位）的定义是？',o:['Leader 的 LEO','ISR 全体副本 LEO 的最小值——消费者只能读到这条线以下','最大分区号','生产者的 ack 数'],a:1,
  why:'"至少被 ISR 每个副本持有"才算已提交;Leader 独跑再快,消费者也不能提前看到没复制完的数据。',ref:'#ch-replica',rt:'第二讲 · LEO/HW'},
 {q:'acks=all + min.insync.replicas=2 的运行时含义是？',o:['永远不丢也不拒写','ISR≥2 才接受写；缩到 1 时直接拒绝写入——用可用性换持久性','全部副本落盘才 ack','每两秒同步一次'],a:1,
  why:'三件套(rep≥3+acks=all+min.insync=2)才是"确认过的写不丢"的完整契约;NotEnoughReplicasException 是它的痛觉。',ref:'#ch-replica',rt:'第二讲 · ISR'},
 {q:'Kafka 的"顺序保证"边界是？',o:['全局有序','单分区内有序;同 key 靠 hash 进同一分区才谈得上该 key 有序','同 group 有序','跨集群有序'],a:1,
  why:'分区是唯一有序单元;扩分区会重排 hash 抽屉顺序,历史 key 的新消息可能换区——顺序承诺要按业务键设计。',ref:'#ch-order',rt:'第五讲 · 有序'},
 {q:'消费端"自动提交 offset"最典型的事故是？',o:['重复消费','处理未完成 offset 已提交,崩溃即永久跳过这批消息','性能慢','触发 rebalance'],a:1,
  why:'提交时机与处理完成的错位:先提后做=丢,先做后提=重;要 exactly-once 语义靠幂等或事务,不靠提交时机玄学。',ref:'#ch-consume',rt:'第三讲 · 位移'},
 {q:'Lag 监控里"一个分区独高、其余贴地"说明？',o:['网络分区','热点 key 全挤同一分区;加分区救不了 hash,要先治 key 分布','消费者太多','磁盘满'],a:1,
  why:'齐涨才是吞吐缺口;"独高"是数据分布问题——加盐二次分发或消费端按 key 并行,别急着扩容。',ref:'#ch-lag',rt:'第七讲 · 积压'},
];

BANK['elasticsearch-illustrated']=[
 {q:'写一条文档后默认"搜不到",要等谁？',o:['merge','refresh(默认 1s)生成可搜的小 segment;NRT=每秒批量可搜','flush','translog'],a:1,
  why:'写入先进 in-memory buffer+translog,refresh 才建 segment 打开搜索——"刚写的搜不到"是设计而非 bug。',ref:'#ch-write',rt:'第二讲 · 写入路径'},
 {q:'text 与 keyword 字段的分工是？',o:['等价','text 分词供全文检索;keyword 整串供精确匹配/聚合/排序','text 更快','keyword 只能存数字'],a:1,
  why:'字段先定性:要"搜到"用 text,要"精确等于/分组"用 keyword;一个字段两者常常都要(multi-field)。',ref:'#ch-map',rt:'第四讲 · 分词'},
 {q:'BM25 相对 TF-IDF 的"防刷"改良是？',o:['引入 IDF','词频饱和:同词出现 100 次不会比 5 次相关 20 倍','用余弦','向量检索'],a:1,
  why:'TF 进 (k1+1)tf/(tf+k1(1-b+b·len/avg)) 的饱和函数,堆砌关键词收益递减;再叠字段长度归一。',ref:'#ch-bm25',rt:'第三讲 · BM25'},
 {q:'from=999980&size=20 的真实代价是？',o:['只读 20 条','每分片都要取前 100 万条归并,协调节点再堆排;默认 1 万窗口是护栏','等价游标','自动转 scroll'],a:1,
  why:'深分页在分布式下被分片数放大;search_after 书签式续读才是 O(size)——跳页交互请限页或改游标。',ref:'#ch-page',rt:'第六讲 · 深分页'},
 {q:'routing=hash(doc_id)%shards 决定了？',o:['副本数','文档落哪个主分片,查询同函数点名直达;分片数变更=全量搬家(split/reindex)','磁盘布局','超时'],a:1,
  why:'一个 hash 函数统治写入与查询两条路;这也是"业务键 routing 点查单片直达"与"分片数不可改"的同源原理。',ref:'#ch-clu',rt:'第七讲 · 路由'},
];

BANK['kubernetes-illustrated']=[
 {q:'Pod 是调度单位而不是容器的核心原因是？',o:['省内存','表达"必须同生共死、共享 netns/volume 的进程组"这一协作单元','启动快','方便日志'],a:1,
  why:'应用+sidecar/init 容器共享同一网络栈与卷;把协作关系写进调度边界——这是 Pod 存在的全部理由。',ref:'#ch-pod',rt:'第一讲 · Pod'},
 {q:'Service 是什么？',o:['一个进程','一组动态 Pod 的稳定访问入口(虚拟 IP+DNS+Endpoint 名单),不是容器','网关设备','Ingress'],a:1,
  why:'Pod 是临时 IP 的牲口,Service 发工牌:名字固定、后端名单随摘随补——"谁在那"变成动态清单。',ref:'#ch-svc',rt:'第三讲 · Service'},
 {q:'Pod 就绪探针(readiness)失败与存活探针(liveness)失败的区别？',o:['都重启','readiness 只摘流量不杀容器;liveness 失败直接重启容器','都只告警','无区别'],a:1,
  why:'依赖抖了≠进程死了;把 readiness 的活派给 liveness,重启风暴就是标准结局。',ref:'#ch-life',rt:'第五讲 · 探针'},
 {q:'requests 与 limits 各管什么？',o:['都管运行','requests 管调度预算(够不够放),limits 管运行天花板(CPU 限流/内存超限杀)','前者管安全','后者管启动'],a:1,
  why:'调度只看 requests;超 limit 的 OOMKill/节流是运行期的账——只设一个等于两头都失控,QoS 三档也由它们定。',ref:'#ch-hpa',rt:'第六讲 · QoS'},
 {q:'kubectl apply 之后 Pod 诞生的接力顺序是？',o:['kubelet→etcd→scheduler','apiserver 校验写 etcd→controller 建 Pod→scheduler 绑定节点→kubelet 拉起','先起容器','轮询查询'],a:1,
  why:'没有任何一环是"命令":每一步都是 watch 到期望与现实的差异后自己动——声明式的接力棒。',ref:'#ch-arch',rt:'第七讲 · apply'},
];

BANK['design-patterns-illustrated']=[
 {q:'策略模式主流程"新增零改动"的收益前提是？',o:['写满接口注释','分支多、每支有独立逻辑且会真实变化;三个 if 硬套策略反而是过度设计','全部用枚举','禁止 if'],a:1,
  why:'模式甜点区在"真变化";预防性抽象是反模式清单第一条——先让 if 疼过再请策略。',ref:'#ch-strategy',rt:'第一讲 · 策略'},
 {q:'装饰器相对继承组合能力的本质优势是？',o:['更快','运行期自由叠层(洋葱),组合数 n 层;继承是编译期静态组合,4 能力=16 子类','更省内存','类型安全'],a:1,
  why:'Buffered(GZIP(File)) 随手换序;代价是洋葱圈层顺序本身成了语义——解错一层就乱码。',ref:'#ch-decor',rt:'第二讲 · 装饰器'},
 {q:'单例七式里能同时免疫反射与序列化攻击的是？',o:['双重检查锁','枚举(JVM 对枚举构造反射直接抛异常,序列化按 name 解析)','静态内部类','饿汉'],a:1,
  why:'私构造挡不住 setAccessible+newInstance="第二个实例";readResolve 是可忘的补丁,枚举是语言级免疫。',ref:'#ch-single',rt:'第三讲 · 擂台'},
 {q:'观察者模式对"加下游"的改进体现在？',o:['广播更快','新下游=新订阅者文件,上游发布器零改动;代价是要自己管注销与顺序','省内存','强类型'],a:1,
  why:'依赖方向被掰正(上游不认识下游)——Spring 事件、MQ、前端响应式全是这个骨架的不同肌肉。',ref:'#ch-obs',rt:'第四讲 · 观察者'},
 {q:'责任链"顺序设计"的考点是？',o:['节点越多越好','同一请求可被前段短路;先验明正身还是先省算力,两种顺序对应两种威胁模型','必须注册中心','禁止改序'],a:1,
  why:'限流放鉴权前后各有对错:防越权探测先鉴权,防无脑打满先限流——链的装配顺序本身是架构决策。',ref:'#ch-chain',rt:'第五讲 · 责任链'},
];
