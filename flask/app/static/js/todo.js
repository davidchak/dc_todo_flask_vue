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
});

// Разворачивает массив
Vue.filter('reverse', function (value) {
    return value.slice().reverse();
});


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
                        <input v-on:click="completeTask(todo.id)" class="btn btn-outline-success" type="button" name="complete" value="Выполнено">
                        <input v-on:click="deleteTask(todo.id)" class="btn btn-outline-danger" type="button" name="remove" value="Удалить">
                    </div>
                </div>`,
    props: ['todo'],

    methods: {
        deleteTask: function (id) {
            axios.delete(this.$parent.task_api + '?id='+id)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
            this.$parent.updateTodos();
            console.log('delete task', id)
        },
        completeTask: function (id) {
            // # TODO: реализовать изменение статуса задачи через родителя
            console.log('complete task', id)
        },
    },  
}


// Ввод новых задач
const AddTask = {
    template: ` <div class="row mt-1 p-2 border border-success">
                    <div class="col-5 border-right border-success">
                        <span>
                            <input v-model='title' class="form-control" type="text" placeholder="Задача" name="title">
                        </span>
                    </div>
                    <div class="col-2 text-center border-right border-success">
                        <span> 
                            <input v-model='autor' class="form-control" type="text" placeholder="Автор" name="autor">
                        </span>
                    </div>
                    <div class="col-2 text-center border-right border-success">
                        <span>
                            <input v-model='expity_date' class="form-control" type="text" placeholder="Выполнить до" name="expity_date">
                        </span>
                    </div>
                    <div class="col-3 text-center">
                        <span>
                            <input v-on:click="createTask" class="btn btn-outline-success" type="button" name="create" value="Создать">
                        </span>
                    </div>
                </div>`,
    data: function(){
        return {
            title: '',
            autor: '',
            expity_date: ''
        }
    },

    methods: {
        createTask: function () {
            // # TODO: обновить список задач у родителя
            // # TODO: сделать валидатор заполненности 
            if (this.title != ''){
                axios.post(this.$parent.task_api, {
                    title: this.title
                })
                .then(response => console.log(response.data))
                .catch(error => console.log(error));
                // this.$parent.getTodos();
                this.resetValues();
                this.$parent.updateTodos();
            } else {
                console.log('Пустое поле');
            }

        },
        resetValues: function(){
            this.title = '',
            this.autor = '',
            this.expity_date = ''
        }
    }
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

                    <AddTask/>

                </div>`,

    components: {
        Task,
        AddTask
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
            this.getTodos();
            console.log('Updated!');
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