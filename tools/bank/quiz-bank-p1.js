// 夜间构建资产 · 卷末自测题库 part1（6 册 × 5 题）
// 字段：q 题干 / o 四选项 / a 正确下标 / why 解析 / ref 回跳锚点 / rt 锚点名
const BANK=global.BANK||(global.BANK={});

BANK['redis-illustrated']=[
 {q:'Redis 官方口径里"单线程"指的是什么？',o:['整个进程只有一个线程','网络 IO 与命令执行都是单线程','仅命令执行是单线程；网络 IO 6.0+ 起多线程','只指后台定时任务线程'],a:2,
  why:'Redis 6.0 的多线程只负责网络读写与协议解析，命令执行仍然串行——"单线程模型"说的从来是执行。',ref:'#ch-loop',rt:'第二讲 · 事件循环'},
 {q:'线上执行 KEYS * 为什么是事故？',o:['它会清空所有键','O(N) 全库扫描且串行执行下阻塞所有后续命令','它只返回前 1000 个键','它会关闭 RDB 持久化'],a:1,
  why:'单线程执行意味着一条慢命令让所有人排队；KEYS 遍历整库正是最典型的慢命令，用 SCAN 渐进替代。',ref:'#ch-loop',rt:'第二讲 · 事件循环'},
 {q:'缓存"击穿"与"雪崩"的区别是？',o:['击穿是 Redis 挂了，雪崩是 MySQL 挂了','击穿=一个大热key过期被并发打穿；雪崩=大批key同时到期或实例整体不可用','两者相同，只是叫法不同','击穿只发生在 Cluster 模式'],a:1,
  why:'一个是"单点瞬间"（互斥重建/逻辑过期），一个是"同一时刻"（TTL 加随机打散/高可用兜底），病因与药方都不同。',ref:'#ch-cache',rt:'第七讲 · 三大缓存问题'},
 {q:'部分复制（增量重连）依赖的三要素是？',o:['replid + offset + 环形 backlog','RDB 文件名 + 偏移 + 心跳','zmyid + epoch + 日志','binlog 位点 + GTID + UUID'],a:0,
  why:'主库把最近发送的命令写进环形 backlog，副本报上 replid 与自己的 offset，缺口还在窗口内就只补发差值；被覆盖则退回全量。',ref:'#ch-repl',rt:'第八讲 · 主从复制'},
 {q:'Cluster 模式下想让两个 key 必然落在同一分片，用什么手段？',o:['把值设成一样','key 里使用相同的 {hash tag}','给它们设同样的 TTL','开 ASK 重定向'],a:1,
  why:'CRC16 只对花括号内的内容哈希：{user:1001}.name 与 {user:1001}.age 同槽，多键操作（Lua/MULTI）才有活路。',ref:'#ch-cluster',rt:'第十讲 · Cluster'},
];

BANK['mysql-illustrated']=[
 {q:'InnoDB 二级索引的叶子节点里存放的是？',o:['整行数据','主键值','行物理地址','页号+偏移'],a:1,
  why:'叶子存"索引列+主键"，要整行得拿主键回聚簇索引再走一遍——这就是回表；存主键而非地址，是为了页分裂搬家时不用维护指针。',ref:'#ch-two',rt:'第三讲 · 回表'},
 {q:'EXPLAIN 结果 Extra 出现 "Using index" 意味着？',o:['发生了全表扫描','覆盖索引命中，无需回表','索引用错了','需要 filesort'],a:1,
  why:'查询要的列都在二级索引叶子上（索引列+主键），二级树直接答完——省掉回表的"第二次乘法"。',ref:'#ch-two',rt:'第三讲 · 覆盖'},
 {q:'两阶段提交中，redo 停在 prepare、binlog 完整，崩溃恢复时应该？',o:['回滚该事务','提交该事务','重放 binlog 后人工裁决','挂起等待运维确认'],a:1,
  why:'恢复时以 binlog 为裁判：redo prepare + binlog 完整 → 提交（从库也可能收到这条，必须主从一致）；没有 binlog 才回滚。',ref:'#ch-wal',rt:'第五讲 · 两阶段提交'},
 {q:'REPEATABLE READ 下 InnoDB 防"写幻读"的主力武器是？',o:['MVCC 快照','间隙锁（Gap Lock）','串行隔离级别','表锁'],a:1,
  why:'快照读防住"读幻"，当前读（UPDATE/FOR UPDATE）靠 next-key/间隙锁把"插入的空档"也锁住；混用两种读口径仍会亲眼见"幻"。',ref:'#ch-lock',rt:'第八讲 · 锁'},
 {q:'varchar 列 = 数字（不带引号）导致索引失效的根因是？',o:['MySQL 不支持字符串比较数字','隐式类型转换作用在列上，等价于给列套了函数','varchar 不能建索引','需要开 only_full_group_by'],a:1,
  why:'转列不转值：对每一行做 CAST(phone AS DOUBLE) 再比较，排序树被函数打乱；加引号即恢复 ref。',ref:'#ch-explain',rt:'第九讲 · EXPLAIN'},
];

BANK['spring-illustrated']=[
 {q:'三级缓存中第三级（singletonFactories）存在的核心理由是？',o:['加快查找速度','把"给裸对象还是提前代理"的决策延迟到真有人来要早期引用时','存储销毁回调','给 prototype 用的'],a:1,
  why:'若两级缓存直存裸对象，AOP 需要代理时会出现"裸对象与代理各一份"的分裂；存 ObjectFactory 让代理化恰好发生一次。',ref:'#ch-cycle',rt:'第三讲 · 三级缓存'},
 {q:'构造器注入的循环依赖为什么三级缓存也救不了？',o:['因为构造器太慢','A 连实例化都没完成，没有任何引用可提前曝光','Spring 故意不支持','要改用 @Resource'],a:1,
  why:'早期引用依赖"空壳对象已存在"；构造参数解析发生在实例化之前，工厂无从注册——只能 @Lazy 占位或拆环。',ref:'#ch-cycle',rt:'第三讲 · 构造器死锁'},
 {q:'@Transactional 标在私有方法上，事务生效吗？',o:['生效，CGLIB 什么都能拦','不生效：子类无法覆写 private 方法，代理织不进去','生效但只回滚不提交','抛异常启动失败'],a:1,
  why:'CGLIB 靠继承覆写，private 跨类不可见、final/static 同理——代理根本没有插手的机会，马甲没穿上。',ref:'#ch-pit',rt:'第五讲 · 代理禁区'},
 {q:'REQUIRED 传播下内层方法抛异常被外层 catch，外层最后提交会？',o:['正常提交，互不影响','抛 UnexpectedRollbackException：共享事务已被标记 rollback-only','自动回滚外层但不报错','降级为 NOT_SUPPORTED'],a:1,
  why:'一条船上的标记：inner 把共享事务标成只许回滚，outer 看不见异常却提交时被事务管理器揭穿——要隔离换 REQUIRES_NEW。',ref:'#ch-prop',rt:'第八讲 · 传播行为'},
 {q:'@TransactionalEventListener(AFTER_COMMIT) 解决什么问题？',o:['让事件更快','把副作用（发短信/投递）推迟到业务事务提交成功之后，回滚则不执行','替代 MQ','解决事件乱序'],a:1,
  why:'同步监听在事务提交前执行，事务回滚了短信却已发出；AFTER_COMMIT 让"成了才做"由容器保证。',ref:'#ch-event',rt:'第十一讲 · 事件'},
];

BANK['spring-boot-illustrated']=[
 {q:'自动配置类的候选清单在 Boot 3 从哪里读取？',o:['spring.factories','META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports','bootstrap.yml','@ComponentScan'],a:1,
  why:'2.7 双轨、3.0 起 imports 文件接管自动配置清单（其余 SPI 仍在 spring.factories）；漏注册这行,自动配置类就是普通类。',ref:'#ch-auto',rt:'第三讲 · 漏斗'},
 {q:'@ConditionalOnMissingBean 在自动配置里的意义是？',o:['加速启动','用户自定义了同类型 Bean 时，官方默认配置自动让位','防止重复加载 yml','开启并行装配'],a:1,
  why:'"你没配我才配"——覆盖默认值的机制底座；这也是自定义 starter 必须会写的一行。',ref:'#ch-auto',rt:'第三讲 · 条件'},
 {q:'配置优先级（高→低）正确的是？',o:['application.yml > profile yml > 环境变量 > 命令行','命令行 > 环境变量 > profile yml > application.yml','@PropertySource 最高','默认值高于 yml'],a:1,
  why:'水塔从上往下灌：命令行救火最大；profile 压主文件；@PropertySource 更低；改配置不生效先背这条链。',ref:'#ch-cfg',rt:'第五讲 · 水塔'},
 {q:'fat jar 的 Main-Class 是谁？',o:['你的 Application','JarLauncher（由它反射调用 Start-Class）','spring-boot-loader','DispatcherServlet'],a:1,
  why:'MANIFEST 里 Main-Class=JarLauncher、Start-Class=你的类；LaunchedURLClassLoader 直读嵌套 jar——"jar 里跑 jar"的全部秘密。',ref:'#ch-jar',rt:'第六讲 · jar 解剖'},
 {q:'@WebMvcTest 里 @Autowired Repository 报无此 Bean，原因与解法是？',o:['缓存没清;重启','切片只装 web 层,Repository 根本不在场;下游改 @MockitoBean','版本 bug','加 @SpringBootTest'],a:1,
  why:'切片的快正是"少装"带来的；给切片要 Mock 下游，全链路才用 @SpringBootTest——测试金字塔的分工。',ref:'#ch-slice',rt:'第九讲 · 切片'},
];

BANK['java-concurrency-illustrated']=[
 {q:'线程池提交任务的真实顺序是？',o:['线程池满→队列→拒绝','核心→最大线程→队列','workerCount<core 建核心线程→入队→队满才建临时线程→还满才拒绝','随机分配'],a:2,
  why:'反直觉但铁律：队列没满之前，maximumPoolSize 根本没机会用；所以无界队列=max 失效（Executors.newFixedThreadPool 的坑）。',ref:'#ch-pool',rt:'第七讲 · 线程池'},
 {q:'volatile 保证什么、不保证什么？',o:['保证原子性','保证可见性与有序性，不保证原子性（volatile i++ 仍丢更新）','什么都不保证','只保证顺序'],a:1,
  why:'写即刷主存+失效他核缓存；读写前后插屏障禁重排；但"读-改-写"三步的原子性要靠锁或原子类。',ref:'#ch-vol',rt:'第三讲 · volatile'},
 {q:'DCL 单例里 new 的三步重排会造成什么？',o:['死锁','另一线程第一重检查通过，拿到"半初始化"对象','内存泄漏','CPU 空转'],a:1,
  why:'分配→初始化→赋引用可被重排；volatile 禁止后两步越界，配合双检锁才完整——两个知识点锁死在一起。',ref:'#ch-lock',rt:'第四讲 · 双检'},
 {q:'AQS 抢锁失败的线程去了哪里？',o:['忙等自旋到底','包装成节点挂 CLH 双向队列，park 挂起，等前驱唤醒','进入 Object.wait 集','抛异常'],a:1,
  why:'state+CLH 队列+park/unpark 就是 AQS 的全部家底；公平与否只差"加锁前先看没看队头"一行。',ref:'#ch-aqs',rt:'第六讲 · AQS'},
 {q:'ThreadLocal 在哪个场景必然泄漏？',o:['方法结束即 remove','线程池线程不死，弱 key 被回收后 value 挂表里无人再触','static 修饰 ThreadLocal','用 InheritableThreadLocal'],a:1,
  why:'Entry 弱 key 变 null 但强 value 还在；线程复用即"永远没人再开这个抽屉"——set 必配 finally remove 的纪律。',ref:'#ch-tl',rt:'第八讲 · ThreadLocal'},
];

BANK['jvm-illustrated']=[
 {q:'JDK8 之后方法区的实现在哪里？',o:['还在堆里的永久代','Metaspace，本地内存','虚拟机栈','直接内存里固定 64M'],a:1,
  why:'永久代退役，类元数据搬进 Metaspace（受 MaxMetaspaceSize 限制）；动态生成类失控会 OOM: Metaspace 而非堆 OOM。',ref:'#ch-regs',rt:'第一讲 · 数据区'},
 {q:'判断对象可回收，HotSpot 用什么算法？',o:['引用计数','可达性分析（GC Roots 遍历）','标记-清除','复制算法'],a:1,
  why:'引用计数破在循环引用；从栈引用/静态变量/JNI 等根出发走不到的即死——Python 才主要靠计数加循环探测。',ref:'#ch-alive',rt:'第三讲 · 死活'},
 {q:'minor GC 后 Survivor 两块的角色是？',o:['随机用','from↔to 每次翻转，复制只发生在两块之间，免整理','一块存对象一块存引用','其中一块常驻老年代'],a:1,
  why:'复制成本只付"活下来的"，翻转只是换名字——但对象就在两块间反复搬家,直到熬够年龄晋升。',ref:'#ch-gen',rt:'第五讲 · 分代'},
 {q:'卡表（Card Table）解决什么问题？',o:['对象分配慢','minor GC 避免把老年代当 roots 全扫：只扫脏卡里的跨代引用','类加载慢','栈溢出'],a:1,
  why:'写屏障"记一笔"（老年→年轻的引用落在哪张 512B 卡），换 minor 时老年代本体免扫——空间换时间的记账。',ref:'#ch-ct',rt:'第六讲 · 卡表'},
 {q:'容器里 JVM 被 OOMKilled(137) 而日志无 OOM 异常，为什么？',o:['日志丢了','cgroup 内存超限速内核直接 SIGKILL，JVM 来不及抛任何异常','堆太小','JIT 崩溃'],a:1,
  why:'老 JDK 按宿主机算默认堆；容器感知或 MaxRAMPercentage 把上限画进红线内——两种死法现场完全不同。',ref:'#ch-cgroup',rt:'第十一讲 · 容器'},
];
