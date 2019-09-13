// Данные
// const data = {
//     api: {
//         task_api: '/api/v1/task',
//         category_api: '/api/v1/category',
//     },
//     todos: [
//         {"id":"1", "title":"Задача 1", "autor":"Давид Ч.", "expiry_date":"20.09.2019"},
//         {"id":"2", "title":"Задача 2", "autor":"Давид Ч.", "expiry_date":"21.09.2019"},
//         {"id":"3", "title":"Задача 3", "autor":"Давид Ч.", "expiry_date":"23.09.2019"},
//     ]
// }


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Filters
 
// Преобразует датц в формат => "mm/dd/yyyy"
Vue.filter('datetime', function (value) {
    moment.locale('ru');
    if (!value) return ''
    return moment(value).format('L');
})

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Components

// Задача
const Task = {
    template: `<div class="row mt-1 p-2 border border-warning">
                    <div class="col-5 border-right border-warning">
                        <span> {{ todo.title }} </span>
                    </div>
                    <div class="col-2 text-center border-right border-warning">
                        <span> {{ todo.autor }} </span>
                    </div>
                    <div class="col-2 text-center border-right border-warning">
                        <span> {{ todo.expiry_date | datetime }} </span>
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


// Ввод новых задач
const Footer = {
    template: ` <div class="row mt-1 p-2 border border-warning fixed-bottom">
                    <div class="col-5 border-right border-warning">
                        <span>
                            <input type="text" placeholder="Задача" name="title">
                        </span>
                    </div>
                    <div class="col-2 text-center border-right border-warning">
                        <span> 
                            <input type="text" placeholder="Автор" name="autor">
                        </span>
                    </div>
                    <div class="col-2 text-center border-right border-warning">
                        <span>
                            <input type="text" placeholder="Выполнить до" name="expity_date">
                        </span>
                    </div>
                    <div class="col-3 text-center">
                        <span>
                            <input class="btn btn-outline-success" type="button" name="create" value="Создать">
                        </span>
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
                        <div class="col-5 border-right border-success">
                            <span>Описание задачи</span>
                        </div>
                        <div class="col-2 text-center border-right border-success">
                            <span>Автор</span>
                        </div>
                        <div class="col-2 text-center border-right border-success">
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

                    <Footer/>

                </div>`,

    components: {
        Task,
        Footer
    },

    data: function () {
        return {
            task_api: '/api/v1/task',
            todos: [],
        }
    },

    methods: {
        getTodos: function () {
            axios.get(this.task_api)
                .then(response => (this.todos = response.data.todos))
                .catch(error => console.log(error))
        },
        updateTodos: function () {
            console.log('delete')
        },
        clearTodos: function () {
            this.todos = []
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



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Vue El

// Экземпляр приложения Vue
const todoapp = new Vue({
    el: '#todoapp',
    components: {
        // 'todo-header': TodoHeader,
        'todo-content': TodoContent,
        // 'todo-footer': TodoFooter,
    },

    // data: {
        
    // },

})