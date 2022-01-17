import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const createTable = (tableName, x, y, time) => {
  let query = "";
  query += `CREATE TABLE ${tableName} (id int NOT NULL AUTO_INCREMENT, comment varchar(255) NOT NULL, x float NOT NULL, y float NOT NULL, timeX varchar(10) NOT NULL, timeY varchar(10) NOT NULL, primary key (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8; `;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x/y', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x0/y0', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x1/y1', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x2/y2', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x3/y3', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x4/y4', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x5/y5', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = "";
  query += `INSERT INTO ${tableName} (comment, x, y, timeX, timeY) VALUES ('x9/y9', ${x}, ${y}, '${time}', '${time}');`;
  connection.query(query, (err) => {
    if (err) throw err;
  });
};

export const updatePriceToDB = async (table_name, x, y, time) => {
  const points = await getCurrentPoints(table_name);

  const K = 0.01;

  let x0 = points[1].x;
  let x1 = points[2].x;
  let x2 = points[3].x;
  let x3 = points[4].x;
  let x4 = points[5].x;
  let x5 = points[6].x;
  let x9 = points[7].x;

  let y0 = points[1].y;
  let y1 = points[2].y;
  let y2 = points[3].y;
  let y3 = points[4].y;
  let y4 = points[5].y;
  let y5 = points[6].y;
  let y9 = points[7].y;

  //actions of algoritm

  //   x
  if (x < x0) {
    x0 = x;
    x1 = x0;
    x9 = Math.round(x0 * (1 + K) * 100) / 100;
  } else {
    if (x > x9) {
      if (x1 === x0) {
        x5 = x4;
        x4 = x3;
        x3 = x2;
        x2 = x1;
      }
      x9 = x;
      x0 = Math.round((x9 / (1 + K)) * 100) / 100;
    }
  }

  //   y
  if (y > y0) {
    y0 = y;
    y1 = y0;
    y9 = Math.round((y0 / (1 + K)) * 100) / 100;
  } else {
    if (y < y9) {
      if (y1 === y0) {
        y5 = y4;
        y4 = y3;
        y3 = y2;
        y2 = y1;
      }
      y9 = y;
      y0 = Math.round(y9 * (1 + K) * 100) / 100;
    }
  }

  // write in db

  let query;

  query = `UPDATE ${table_name} SET x = ${x}, y = ${y} ${
    x !== points[0].x ? `, timeX = '${time}'` : ``
  } ${
    y !== points[0].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x/y';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = `UPDATE ${table_name} SET x = ${x0}, y = ${y0} ${
    x0 !== points[1].x ? `, timeX = '${time}'` : ``
  } ${
    y0 !== points[1].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x0/y0';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = `UPDATE ${table_name} SET x = ${x1}, y = ${y1} ${
    x1 !== points[2].x ? `, timeX = '${time}'` : ``
  } ${
    y1 !== points[2].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x1/y1';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = `UPDATE ${table_name} SET x = ${x2}, y = ${y2} ${
    x2 !== points[3].x ? `, timeX = '${time}'` : ``
  } ${
    y2 !== points[3].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x2/y2';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = `UPDATE ${table_name} SET x = ${x3}, y = ${y3} ${
    x3 !== points[4].x ? `, timeX = '${time}'` : ``
  } ${
    y3 !== points[4].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x3/y3';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = `UPDATE ${table_name} SET x = ${x4}, y = ${y4} ${
    x4 !== points[5].x ? `, timeX = '${time}'` : ``
  } ${
    y4 !== points[5].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x4/y4';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = `UPDATE ${table_name} SET x = ${x5}, y = ${y5} ${
    x5 !== points[6].x ? `, timeX = '${time}'` : ``
  } ${
    y5 !== points[6].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x5/y5';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });

  query = `UPDATE ${table_name} SET x = ${x9}, y = ${y9} ${
    x9 !== points[7].x ? `, timeX = '${time}'` : ``
  } ${
    y9 !== points[7].y ? `, timeY = '${time}'` : ``
  } WHERE comment='x9/y9';`;
  connection.query(query, (err) => {
    if (err) throw err;
  });
};

const getCurrentPoints = async (table_name) => {
  const query = `SELECT comment, x, y FROM ${table_name};`;

  return new Promise(function (resolve, reject) {
    connection.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res.slice(res));
    });
  });
};

connection.connect((err) => {
  if (err) throw err;
});

export const isExistTable = (table_name, x, y, time) => {
  connection.query(`SHOW TABLES LIKE '${table_name}'`, (err, isExist) => {
    if (err) throw err;
    isExist.length === 0
      ? createTable(table_name, x, y, time)
      : updatePriceToDB(table_name, x, y, time);
  });
};
