import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    activeTagOption: tagsList[0].optionId,
    taskInput: '',
    tasksList: [],
    activeTagsList: [],
  }

  onChangeInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({activeTagOption: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()

    const {taskInput, activeTagOption} = this.state
    const {displayText} = tagsList.filter(
      each => each.optionId === activeTagOption,
    )[0]
    const newTask = {
      id: uuidv4(),
      optionId: activeTagOption,
      taskInput,
      displayText,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      activeTagOption: tagsList[0].optionId,
      taskInput: '',
    }))
  }

  toggleBtn = event => {
    const {activeTagsList} = this.state

    if (activeTagsList.includes(event.target.id)) {
      const filteredActiveTagsList = activeTagsList.filter(
        each => each !== event.target.id,
      )
      this.setState({activeTagsList: filteredActiveTagsList})
    } else {
      this.setState(prevState => ({
        activeTagsList: [...prevState.activeTagsList, event.target.id],
      }))
    }
  }

  renderForm = () => {
    const {activeTagOption, taskInput} = this.state
    return (
      <div>
        <h1>Create a task</h1>
        <form onSubmit={this.onAddTask}>
          <div>
            <label htmlFor="taskInput">Task</label>
            <input
              id="taskInput"
              type="text"
              value={taskInput}
              onChange={this.onChangeInput}
              placeholder="Enter the task here"
            />
          </div>
          <div>
            <label htmlFor="option">Tags</label>
            <select
              id="option"
              value={activeTagOption}
              onChange={this.onChangeOption}
            >
              {tagsList.map(each => (
                <option value={each.optionId}>{each.displayText}</option>
              ))}
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    )
  }

  renderTags = () => (
    <div>
      <h1>Tags</h1>
      <ul>
        {tagsList.map(each => (
          <li key={each.optionId}>
            <button id={each.optionId} type="button" onClick={this.toggleBtn}>
              {each.displayText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  renderTasks = () => {
    const {tasksList, activeTagsList} = this.state

    console.log(activeTagsList)
    let filteredTasksList

    if (activeTagsList.length === 0) {
      filteredTasksList = tasksList
    } else {
      filteredTasksList = tasksList.filter(each =>
        activeTagsList.includes(each.optionId),
      )
    }
    console.log(filteredTasksList)

    return (
      <div>
        <h1>Tasks</h1>
        {tasksList.length === 0 ? (
          <p>No Tasks Added Yet</p>
        ) : (
          <ul>
            {filteredTasksList.map(each => (
              <li key={each.id}>
                <p>{each.taskInput}</p>
                <p>{each.displayText}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        {this.renderTags()}
        {this.renderTasks()}
      </div>
    )
  }
}

export default App
