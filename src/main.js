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
    }
  }
})
app.mount('#app')
