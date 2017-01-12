import React, {Component, PropTypes} from 'react';
// import 'react-date-picker/index.css';
// import {DateField, Calendar, TransitionView} from 'react-date-picker';
//
// export default function DateTimePicker(props) {
//   return <DateField {...props}>
//     <TransitionView
//       footer={true}
//       clearButton={false}
//       todayButtonText="今天"
//       okButtonText="确定"
//       cancelButtonText="取消"
//     >
//       <Calendar
//         navigation={true}
//         forceValidDate={true}
//         highlightWeekends={true}
//         highlightToday={true}
//         weekNumbers={false}
//         weekStartDay={0}
//       />
//     </TransitionView>
//   </DateField>;
// }

import DateTime from 'react-datetime';

export default function DateTimePicker(props) {
  let {inputFormat, minDate, mode, defaultValue, defaultText, onChange} = props;
  let newProps = {};
  if (inputFormat) {
    let [dateFormat, timeFormat] = inputFormat.split(' ');
    newProps.dateFormat = dateFormat;
    if (timeFormat) {
      newProps.timeFormat = timeFormat;
    }
  }
  if (minDate) {
    newProps.isValidDate = current => current.isAfter(minDate);
  }
  if (mode == 'date') {
    newProps.timeFormat = false;
  }
  if (defaultValue) {
    newProps.defaultValue = defaultValue;
  }
  if (defaultText) {
    newProps.inputProps = {placeholder: defaultText};
  }
  if (onChange) {
    newProps.onChange = value => onChange(value.valueOf());
  }
  return <DateTime closeOnSelect {...newProps} />;
}
