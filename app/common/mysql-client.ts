import { createPool } from 'mysql2';

/**
 * MySQL客户端
 */
class MysqlClient {
  constructor(config) {
    this.pool = createPool(config).promise();
  }

  /**
   * 获取当前连接池
   * @returns
   */
  getPool() {
    return this.pool;
  }

  /**
   * 从连接池中获取一个连接
   * @returns
   */
  getConnection() {
    return this.pool.getConnection();
  }

  /**
   * 关闭连接池
   * @returns
   */
  end() {
    return this.pool.end();
  }

  /**
   * 执行SQL语句，优势是更灵活，可以用??代替表名、字段、索引名；用?代替数据
   * @param {*} sql
   * @param {*} values
   * @returns
   */
  query(sql, values) {
    return this.pool.query(sql, values).then(res => res[0]);
  }

  /**
   * 用于执行SQL语句，利用MySQL的PreparedStatement机制来预编译SQL语句，优势是数据库原生支持的预编译机制，性能更高
   * @param {*} sql
   * @param {*} values
   * @returns
   */
  execute(sql, values) {
    return this.pool.execute(sql, values).then(res => res[0]);
  }
}

export default MysqlClient;
