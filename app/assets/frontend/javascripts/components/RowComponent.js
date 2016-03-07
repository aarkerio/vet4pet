// react
class Row extends React.Component {
  onClick() {
    const { dispatch, id } = this.props;
    console.log('click on row: ', id);
  }
  
  render() {
    const { dispatch, id } = this.props;
    return (
      <tr
        onClick={this.onClick.bind(this)}
        style={{
          border: '3px solid green'
        }}>
        {Array(5).fill().map((v, i) => <td key={i}>{id + '-' + (i+1)} </td>)}
      </tr>
    );
  }
}

class Table extends React.Component {
  componentDidMount() {
    const { dispatch, rows, id } = this.props;
    _.times(rows, function(n) {
      var rowId = `${id}-${n+1}`;
      dispatch(addRow(rowId));
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, id, rows, rowIds } = this.props;
    var nextTable = nextProps.table;
    var diffRows = nextProps.rows - rows;
    
    if (diffRows > 0) {
      _.times(diffRows, function(n) {
        var newRowId = `${id}-${rowIds.length+n+1}`;
        dispatch(addRow(newRowId));
      });
    }
    
    if (diffRows < 0) {
      
      rowIds
        .slice(rowIds.length + diffRows)
        .forEach(function(rowId) {
          dispatch(removeRow(rowId));
        });

    }
  }
  
  render() {
    const { rowIds, Rows, dispatch } = this.props;

    return (
      <table style={{
        width: '100%',
        border: '4px solid blue'
      }}>
        <tbody>
          {rowIds.map(function(rowId, i) {
            let row = Rows[rowId];
            return (<Row key={i} id={row && row.id} dispatch={dispatch} />);
          })}
        </tbody>
      </table>
    );
  }
}

function tableSelector(state) {
  return {
    rowIds: state.table.rowIds
  };
}
Table = ReactRedux.connect(tableSelector)(Table);

class Container extends React.Component {
  
  onChangeTableRows(v) {
    this.props.dispatch(changeTableRows(v));
  }

  render() {
    const { dispatch, table, rows } = this.props;

    return (
      <div>

        <button onClick={this.onChangeTableRows.bind(this, 5)}>change table rows to 5</button>
        <button onClick={this.onChangeTableRows.bind(this, 1)}>change table rows to 1</button>
                          
        <Table
          id={table.id}
          rows={table.rows}
          //rowIds={table.rowIds}
          Rows={rows}
          dispatch={dispatch} />
      </div>
    );
  }
}

function containerSelector(state) {
  return {
    table: state.table,
    rows: state.rows
  };
}
Container = ReactRedux.connect(containerSelector)(Container);

// redux
// actions
var ADD_ROW = 'ADD_ROW';
var REMOVE_ROW = 'REMOVE_ROW';
var CHANGE_TABLE_ROWS = 'CHANGE_TABLE_ROWS';

var addRow = function(id) {
  return {
    type: ADD_ROW,
    row: {
      id: id
    }
  };
};
var removeRow = function(id) {
  return {
    type: REMOVE_ROW,
    row: {
      id: id
    }
  };
};
var changeTableRows = function(rows) {
  return {
    type: CHANGE_TABLE_ROWS,
    table: {
      rows: rows
    }
  };
};

// reducers
var initState = {
  table: { id: 1, rows: 1, rowIds: []},
  row: { id: null },
  rows: {},
};

function table(table = initState.table, action) {
  switch (action.type) {
    case ADD_ROW:
      return Object.assign({}, table, { rowIds: table.rowIds.concat(action.row.id)});
    case REMOVE_ROW:
      return Object.assign({}, table, { rowIds: table.rowIds.slice(0, table.rows) });
    case CHANGE_TABLE_ROWS:
      return Object.assign({}, table, { rows: action.table.rows });
    default:
      return table;
  }
}

function rows(rows = initState.rows, action) {
  switch (action.type) {
    case ADD_ROW:
      return Object.assign({}, rows, {
        [action.row.id]: Object.assign({}, initState.row, action.row)
      });
    case REMOVE_ROW:
      return _.omit(rows, action.row.id);

    default:
      return rows;
  }
}

function app(state = {}, action) {
  return {
    table: table(state.table, action),
    rows: rows(state.rows, action),
  };
};

var store = Redux.createStore(app);
store.subscribe(function() {
  console.log(store.getState());
});

var root = document.getElementById('root');
var Provider = ReactRedux.Provider;
ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  root
);
