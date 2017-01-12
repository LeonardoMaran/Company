import request from 'superagent';
import NProgress from 'nprogress';
import config from '../../config.ejs';
import Session from './Session';

class ApiCaller {
  handleError(err, res) {
    console.log(err.message);
  }

  encodeQuery(value) {
    if (Object.isString(value)) {
      if(value.length > 0) return value;
    } else if (Object.isArray(value)) {
      if(value.length > 0) return JSON.stringify(value);
    } else if (Object.isObject(value)) {
      if(Object.size(value) > 0) return JSON.stringify(value);
    } else if (value != null && value != undefined) {
      return JSON.stringify(value);
    }
    return null;
  }

  loadData(path, query, callback) {
    NProgress.start();
    let req = request.get(config.apiUrl + path);
    Object.keys(query).forEach(segment => {
      let value = this.encodeQuery(query[segment]);
      if (value != null) {
        req.query({[segment]: value});
      }
    });
    let account = Session.current();
    if (account) {
      req.set('Authorization', 'Bearer ' + account.token);
    }
    req.end((err, res) => {
      if (err) {
        this.handleError(err, res);
      } else {
        callback && callback(res.body);
      }
      NProgress.done();
    });
  }

  postData(path, data, callback) {
    NProgress.start();
    let req = request.post(config.apiUrl + path);
    let account = Session.current();
    if (account) {
      req.set('Authorization', 'Bearer ' + account.token);
    }
    if (data) {
      req.send(data);
    }
    req.end((err, res) => {
      if (err) {
        this.handleError(err, res);
        callback && callback(res, err);
      } else {
        callback && callback(res, err);
      }
      NProgress.done();
    });
  }

  deleteData(path, data, callback) {
    NProgress.start();
    let req = request.delete(config.apiUrl + path);
    let account = Session.current();
    if (account) {
      req.set('Authorization', 'Bearer ' + account.token);
    }
    if (data) {
      req.send(data);
    }
    req.end((err, res) => {
      if (err) {
        this.handleError(err, res);
        callback && callback(res, err);
      } else {
        callback && callback(res, err);
      }
      NProgress.done();
    });
  }

  updateData(name, id, data) {
    let account = Session.current();
    if (account == null) return;
    NProgress.start();
    let req = request
      .patch(config.apiUrl + '/api/' + name + "/" + id)
      .set('Authorization', 'Bearer ' + account.token)
      .send(data);
    return new Promise(resolve => {
      req.end((err, res) => {
        if (err) {
          this.handleError(err, res);
        } else {
          resolve(res.body);
        }
        NProgress.done();
      });
    });
  }

  updateDataItem(name, id, field, value) {
    let account = Session.current();
    if (account == null) return;
    NProgress.start();
    let req = request
      .patch(config.apiUrl + '/api/' + name + "/" + id)
      .set('Authorization', 'Bearer ' + account.token)
      .send({[field]: value});
    return new Promise(resolve => {
      req.end((err, res) => {
        if (err) {
          this.handleError(err, res);
        } else {
          resolve(res.body);
        }
        NProgress.done();
      });
    });
  }

  uploadFile(name, file) {
    let account = Session.current();
    if (account == null) return;
    if (file == null || file === undefined) return {};
    NProgress.start();
    let req = request.post(config.apiUrl + '/api/file/upload/' + name)
      .set('Authorization', 'Bearer ' + account.token)
      .attach(name, file);
    return new Promise(resolve => {
      req.end((err, res) => {
        if (err) {
          this.handleError(err, res);
        } else {
          resolve(res.body);
        }
        NProgress.done();
      });
    });
  }
}

export default new ApiCaller();
