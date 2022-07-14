import { createApp } from 'vue'
import Todos from './api/todos'

const apiTodos = new Todos()
const app = createApp({
  data() {
    return {
      todos: [],
      form: {
        text: '',
        done: false
      }
    }
  },
  created() {
    this.fetchTodos()
  },
  methods: {
    async fetchTodos() {
      this.todos = await apiTodos.index()
    },
    async createTodo() {
      const data = await apiTodos.store(this.form)
      this.todos.push(data)
      this.form.text = ''
      this.form.done = false
    },
    async toggleTodoStatus(todo) {
      const data = await apiTodos.update({
        ...todo,
        done: !todo.done
      })
      const index = this.todos.findIndex(({ id }) => id == data.id)
      this.todos[index] = data
    }
  }
})
app.mount('#app')
