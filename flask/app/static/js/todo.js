// Шапка
// const TodoHeader = {
//     template: `<div class="col-12 fixed-top border-bottom border-success">
//                         <h3>{{ app_text }}</h3>
//                     </div>`,

//     data: function () {
//         return {
//             app_text: 'Todo Header'
//         }
//     }
// }

// Задача
const Task = {
    template: `<div class="row mt-1 p-2 border border-warning">
                    <div class="col-5">
                        <span> {{ todo.title }} </span>
                    </div>
                    <div class="col-2 text-center">
                        <span> {{ todo.autor }} </span>
                    </div>
                    <div class="col-2 text-center">
                        <span> {{ todo.expiry_date }} </span>
                    </div>
                    <div class="col-3 text-center">
                        <span>Действия</span>
                    </div>
                </div>`,
    props: ['todo'],

    methods: {
        add: function () {
            console.log('add')
        },
        delete: function () {
            console.log('delete')
        },
        update: function () {
            console.log('update')
        },
    },  
}


// Список задач
const TodoList = {
    template: `<div class="col-12">
                    <div class="row mt-1 p-2 border border-success">
                        <div class="col-5">
                            <span>Описание задачи</span>
                        </div>
                        <div class="col-2 text-center">
                            <span>Автор</span>
                        </div>
                        <div class="col-2 text-center">
                            <span>Выполнить до</span>
                        </div>
                        <div class="col-3 text-center">
                            <span>Действия</span>
                        </div>
                    </div>   
                    
                    <Task 
                        v-for="todo in todos"
                        v-bind:todo="todo"
                        v-bind:key="todo.id">
                    </Task>
                </div>`,

    components: {
        Task
    },

    data: function () {
        return {
            task_api: '/api/v1/task',
            todos: []
        }
    },

    methods: {
        getTodos: function () {
            console.log('Download todos from backend');
            axios.get(this.task_api)
                .then(function (response) {
                    // # TODO: решить проблему с загрузкой данных в переменную
                    this.$data.todos = response.data.todos;
                    console.log(response.data.todos);
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        updateTodos: function () {
            console.log('delete');
        },
        clearTodos: function () {
            console.log('update');
        }
    }, 

    created: function () {
        this.getTodos()
    } 

}


// Основное блок программы
const TodoContent = {
    template:   `<div class="container border-left border-right border-success" style="min-height: 100vh;">  
                    <TodoList/>
                </div>`,
    components: {
        TodoList,
    },
}


// Подвал
// const TodoFooter = {
//     template: `<div class="col-12 fixed-bottom border-top border-success">
//                     <span>Version: {{ ver }}</span>
//                 </div>`,

//     data: function () {
//         return {
//             app_text: 'Todo Footer',
//             ver: '0.1b'
//         }
//     }
// }


// Экземпляр приложения Vue
const todoapp = new Vue({
    el: '#todoapp',
    components: {
        // 'todo-header': TodoHeader,
        'todo-content': TodoContent,
        // 'todo-footer': TodoFooter,
    },

    data: {
        category_api: '/api/v1/category',
        task_api: '/api/v1/task',
    },

})