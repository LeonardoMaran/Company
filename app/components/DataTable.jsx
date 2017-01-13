import React, {Component, PropTypes} from 'react';

export default class DataTable extends Component {
  static propTypes = {
    fields: PropTypes.array,
    items: PropTypes.array
  };

  render() {
    let showField = (field, item) => {
      if (field.name) {
        let value = item[field.name];
        if (field.format) {
          return field.format(value);
        } else {
          return value;
        }
      } else if (field.compute) {
        return field.compute(item);
      } else {
        return field.content;
      }
    };

    let {fields, items, ...other} = this.props;
    return (
      <table className="table data-table" {...other}>
        <thead>
        <tr>
          {fields.map((field, i) => <th key={i} className="text-center">{field.label}</th>)}
        </tr>
        </thead>
        <tbody>
        {items.map((item, i) =>
          <tr key={i}>
            {fields.map((field, j) => <td key={j} className={`text-${field.align ? field.align : 'center'}`}>{showField(field, item)}</td>)}
          </tr>
        )}
        </tbody>
      </table>
    );
  }
}
