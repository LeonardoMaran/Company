import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import '../styles/Calendar.sass';

export default class Calendar extends Component {
  render() {
    const days = ["日", "一", "二", "三", "四", "五", "六"];
    const months = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    return (
      <div id="calendar">
        <header id="title">
          <span id="prev" className="fa fa-angle-left"></span>
          <span id="date">{moment().get('year')} 年 {months[moment().get('month')]} 月</span>
          <span id="next" className="fa fa-angle-right"></span>
        </header>
        <table id="content">
          <thead>
            <tr>{days.map((day, i) => <th key={i}>{day}</th>)}</tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    );
  }
}
