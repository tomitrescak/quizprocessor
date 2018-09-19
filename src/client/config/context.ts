// import * as DataStore from 'nedb';
// const db = new DataStore({ filename: 'dist/db/data.db', autoload: true });

// const electron = require('electron');

// var db = new DataStore({
//     filename: path.join(electron.app.getPath('userData'), 'data.db'),
//     autoload: true
// });

// console.log(path.join(electron.app.getPath('userData'), 'data.db'));

declare global {
  namespace App {
    export type Context = typeof context;
  }
}

export const context = {
  // db: {
  //   find(query: any, projection?: any) {
  //     return new Promise<any[]>((resolve, reject) => {
  //       db.find(query, projection, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       })
  //     })
  //   },
  //   findOne(query: any, projection?: any) {
  //     return new Promise((resolve, reject) => {
  //       db.findOne(query, projection, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       })
  //     })
  //   },
  //   insert(query: any) {
  //     return new Promise((resolve, reject) => {
  //       db.insert(query, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       })
  //     })
  //   },
  //   update(query: any, updateQuery: any, options?: DataStore.UpdateOptions) {
  //     return new Promise((resolve, reject) => {
  //       db.update(query, updateQuery, options, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       })
  //     })
  //   },
  //   remove(query: any, options: DataStore.RemoveOptions) {
  //     return new Promise((resolve, reject) => {
  //       db.remove(query, options, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       })
  //     })
  //   }
  // }
}
