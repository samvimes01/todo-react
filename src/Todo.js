import React from "react";
import randomstring from "randomstring";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.randId = randomstring.generate.bind(null, 5);


    this.state = {
      todos: [
        { id: this.randId(), value: 1, text: '111', isDone: false },
        { id: this.randId(), value: 2, text: '222', isDone: false },
      ],
      newItemText: '',
      archivedTodos: [],
      itemsToShow: [],
    };

  }

  handleItemSelection = (value) => {
    this.setState(({ todos }) =>{
      const todoInd =  todos.findIndex(el => el.value === value);
      
      todos[todoInd].isDone = !todos[todoInd].isDone;

      return {
        todos,
        itemsToShowCommand: '',
      };
    });
  }

  handleItemAdded = () => {
    this.setState(({ todos, newItemText, }) => {
      let newTodo = {
        id: this.randId(),
        value: todos.length + 1,
        text: newItemText,
        isDone: false
      };

      return {
        todos: [ ...todos, newTodo ],
        newItemText: '',
        itemsToShowCommand: '',
      };
    });
  }

  handleNewItemTextChange = (text) => {
    this.setState({
      newItemText: text
    });
  }

  archive = () => {
    this.setState(({ todos, archivedTodos }) => {
      let newTodos = todos.filter(el => !el.isDone);
      const selectedTodos = todos.filter(el=> el.isDone); 

      return {
        todos: [ ...newTodos ],
        archivedTodos: [ ...archivedTodos, ...selectedTodos ],
        itemsToShowCommand: '',
      };
    });
  };

  getUnDoneCount = () => {
    return this.state.todos.filter(el => !el.isDone).length;
  }

  show = (key) => {
    switch(key) {
      case 'all':
        this.setState(prevState => (
          {
            itemsToShow: [ ...prevState.todos, ...prevState.archivedTodos ],
            itemsToShowCommand: key,
          }
        ));
        break;
      case 'done':
        this.setState(prevState => (
          {
            itemsToShow: prevState.todos.filter(el => el.isDone),
            itemsToShowCommand: key,
          }
        ));
        break;
      case 'active':
        this.setState(prevState => (
          {
            itemsToShow: prevState.todos.filter(el => !el.isDone),
            itemsToShowCommand: key,
          }
        ));
        break;
      case 'archived':
        this.setState(prevState => (
          {
            itemsToShow: prevState.archivedTodos,
            itemsToShowCommand: key,
          }
        ));
        break;
      default:
        this.setState({
          itemsToShow: [],
          itemsToShowCommand: '',
        });
        break;
    }
  }


  render() {
    const { todos, newItemText, itemsToShow, itemsToShowCommand } = this.state;

    return (
      <div className='todo'>
        <h2 className='todo__title'>My Todo</h2>
        <span>{this.getUnDoneCount()} of {todos.length} remaining</span>
      [ <span className="todo__archive" onClick={this.archive}>archive</span> ]
        <ul className='todo__list'>
          {todos.map(todo => (
            <Todo.Item
              key={todo.id}
              value={todo.value}
              isDone={todo.isDone}
              onClick={() => this.handleItemSelection(todo.value)}
            >
              {todo.text}
            </Todo.Item>
          ))}
        </ul>

        <input
          type='text'
          className='todo__new-item-text'
          value={newItemText}
          onChange={event => {
            this.handleNewItemTextChange(event.target.value);
          }}
        />

        <button className='todo__add-button' onClick={() => this.handleItemAdded()}>
          Add
        </button>

        <Todo.Controls showFn={this.show}/>
        <Todo.ShowRoom items={itemsToShow} header={itemsToShowCommand} />
      </div>
    );
  }
}

Todo.Item = ({ value, children, isDone, onClick }) => {
  return (
    <li className='todo__item' onClick={() => onClick(value)}>
      <input 
        type="checkbox" 
        name="isDone"
        checked={isDone}
        onChange={() => null}
      />
      <span className={isDone ? 'todo__item-crossed' : ''}>
       {children}
      </span> 
    </li>
  );
};

Todo.Controls = ({showFn}) => {
  return (
    <div>
      <button onClick={() => showFn('all')}>All</button>
      <button onClick={() => showFn('done')}>Done</button>
      <button onClick={() => showFn('active')}>Active</button>
      <button onClick={() => showFn('archived')}>Archived</button>
      <button onClick={() => showFn()}>Hide</button>
    </div>
  );
};

Todo.ShowRoom = ({items, header }) => {
  if (header) {
    return (
      <div className="todo__showroom">
        <h3>{header}</h3>
        {items.map(el => (
          <p key={el.id}>{el.text}</p>
        ))}
      </div>
    );
  } else {
    return ('');
  }
};

export default Todo;
