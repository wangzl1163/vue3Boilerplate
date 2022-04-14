import { wrapLabelsData, wrapQuery, wrapQueryRange } from "./CreateRequest";
import { createApi } from "./ApiFactory";

const query = (metrics, params) =>
   wrapQuery("database_mysql")("monitor-master", metrics, params);
const queryRange = (metrics, params) =>
   wrapQueryRange("database_mysql")("monitor-master", metrics, params);

// #region mysql 列表
// 获取MySQL的label data
function mysqlLabelData(monitorName, params) {
   return wrapLabelsData("database_mysql")(monitorName, params);
}

// pod的host（IP）和port
function hostAndPort(monitorName, params) {
   return wrapLabelsData("database_mysql")(monitorName, params);
}

// 运行状态
function runningStatus(params = null) {
   return query("mysql:up", params);
}

// 存储大小
function storeSize(params = null) {
   return query("mysql:table:size", params);
}

// innodb 缓冲池大小
function innodbPoolSize(params = null) {
   return query("mysql:innodb:pool:size", params);
}

// QPS
function qps(params = null) {
   return query("mysql:qps", params);
}

// 网络接收速率
function networkReceiveRate(params = null) {
   return query("mysql:received:bytes:irate", params);
}

// 网络发送速率
function networkSendRate(params = null) {
   return query("mysql:sent:bytes:irate", params);
}
// #endregion

// #region 详情
// 运行时间
function runningTime(params = null) {
   return query("mysql:up:time", params);
}

// 主从同步延迟时间
function masterSlaveSyncDelay(params = null) {
   return query("mysql:replication:seconds", params);
}

// qps line
function qpsRange(params = null) {
   return queryRange("mysql:qps", params);
}

// 网络接收流量(kb)
function networkReceiveRange(params = null) {
   return queryRange("mysql:received:bytes:irate", params);
}

// 网络发送流量(kb)
function networkSendRange(params = null) {
   return queryRange("mysql:sent:bytes:irate", params);
}

// 当前连接数
function connectionNumber(params = null) {
   return queryRange("mysql:current:connected", params);
}

// 最大连接数
function connectionMaxNumber(params = null) {
   return queryRange("mysql:max:connected", params);
}

// 最大使用连接数
function connectionMaxUsedNumber(params = null) {
   return queryRange("mysql:used:max:connected", params);
}

// 服务端连接失败速率
function serverConnectionFailRate(params = null) {
   return queryRange("mysql:aborted:connect:irate", params);
}

// 客户端连接失败速率
function clientConnectionFailRate(params = null) {
   return queryRange("mysql:aborted:client:irate", params);
}

// 运行线程数
function threadRunningNumber(params = null) {
   return queryRange("mysql:thread:running", params);
}

// 创建临时表速率
function createTempTableRate(params = null) {
   return queryRange("mysql:create:table:irate", params);
}

// 创建临时磁盘表速率
function createTempDiskTableRate(params = null) {
   return queryRange("mysql:create:disk:table:irate", params);
}

// 创建临时文件速率
function createTempFileRate(params = null) {
   return queryRange("mysql:create:file:irate", params);
}

// 立刻获得表锁速率
function tableLockImmediateRate(params = null) {
   return queryRange("mysql:lock:immediate:irate", params);
}

// 等待表锁速率
function tableLockWaitRate(params = null) {
   return queryRange("mysql:lock:waited:irate", params);
}

// 高速查询缓存大小
function highSpeedQueryCacheSize(params = null) {
   return queryRange("mysql:query:cache:size", params);
}

// 查询缓存空闲大小
function freeQueryCacheSize(params = null) {
   return queryRange("mysql:qcache:free:size", params);
}

// 多个索引负载速率
function indexLoadRate(params = null) {
   return queryRange("mysql:handlers:irate", params);
}

// 命令执行速率
function commandExecuteRate(params = null) {
   return queryRange("mysql:commands:irate", params);
}

// 命令一小时执行次数
function commandExecute1HourNumber(params = null) {
   return queryRange("mysql:commands:total:1h", params);
}

// innodb缓存数据大小
function innodbCacheDataSize(params = null) {
   return queryRange("mysql:innodb:data:size", params);
}

// innodb缓存空闲大小
function innodbCacheFreeSize(params = null) {
   return queryRange("mysql:innodb:free:size", params);
}

// innodb日志缓存大小
function innodbCacheLogSize(params = null) {
   return queryRange("mysql:innodb:log:size", params);
}

// innodb字典缓存大小
function innodbCacheDictionarySize(params = null) {
   return queryRange("mysql:innodb:dictionary:size", params);
}

// 键值缓存大小
function keyValueCacheSize(params = null) {
   return queryRange("mysql:key:buffer:size", params);
}

// 查询缓存次数
function queryCacheNumber(params = null) {
   return queryRange("mysql:qcache:in:cache:irate", params);
}

// 命中缓存速率
function hitCacheRate(params = null) {
   return queryRange("mysql:qcache:hits:irate", params);
}

// 插入缓存速率
function insertCacheRate(params = null) {
   return queryRange("mysql:qcache:insert:irate", params);
}

// 没有缓存查询速率
function noCacheQueryRate(params = null) {
   return queryRange("mysql:qcache:not:cache:irate", params);
}

// 删除缓存速率
function deleteCacheRate(params = null) {
   return queryRange("mysql:qcache:lowmem:irate", params);
}
// #endregion

export default {
   deleteCacheRate,
   noCacheQueryRate,
   insertCacheRate,
   hitCacheRate,
   queryCacheNumber,
   keyValueCacheSize,
   innodbCacheDictionarySize,
   innodbCacheLogSize,
   innodbCacheFreeSize,
   innodbCacheDataSize,
   commandExecute1HourNumber,
   commandExecuteRate,
   indexLoadRate,
   freeQueryCacheSize,
   highSpeedQueryCacheSize,
   tableLockWaitRate,
   tableLockImmediateRate,
   createTempFileRate,
   createTempDiskTableRate,
   createTempTableRate,
   threadRunningNumber,
   clientConnectionFailRate,
   serverConnectionFailRate,
   connectionMaxUsedNumber,
   connectionMaxNumber,
   connectionNumber,
   networkSendRange,
   networkReceiveRange,
   qpsRange,
   networkSendRate,
   networkReceiveRate,
   qps,
   masterSlaveSyncDelay,
   innodbPoolSize,
   storeSize,
   runningStatus,
   runningTime,
   mysqlLabelData,
   hostAndPort
};
