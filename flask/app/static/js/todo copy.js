

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('datetime', function (value) {
    if (!value) return ''
    return moment(value).format('L');
})


const TodoItem = {
    template: `<div class="col-12 border-bottom border-success d-flex align-items-center" style="min-height: 55px;">
                    <span class="mr-3" v-on:click="completeTask = !competeTask">
                        <i class="fa fa-circle-o" aria-hidden="true"></i>
                    </span>
                    <span v-bind:class="[ todo.overdue  ? errorClass:'' , mrAutoClass ]">{{ todo.title }}</span>
                    <span class="mr-3">{{ todo.autor }}</span>
                    <span class="mr-3">{{ todo.expiry_date | datetime }}</span>
                    <span><i class="fa fa-star-o" aria-hidden="true"></i></span>
                </div>`,
    props: ['todo'],
    data: function () {
        return  {
            errorClass: 'text-danger',
            mrAutoClass: 'mr-auto',
            completeTask: false,
        }
    }
}

const NewTodoItem = {
    template:   `<div class="col-12 border-bottom border-success d-flex align-items-center" style="min-height: 55px;">
                    <div v-show="!showInputFields" class="input-group input-group-sm">
                        <span v-on:click="showInputFields = !showInputFields" class="input-group-text rounded-pill">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </span>

                    </div>

                    <div v-show="showInputFields" class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <span v-on:click="showInputFields = !showInputFields" class="input-group-text">
                                <i class="fa fa-minus" aria-hidden="true"></i>
                            </span>
                        </div>
                        <input v-model="todoTitle" type="text" aria-label="First name" class="form-control" size="40" placeholder="Новая задача">
                        <select v-model="selectedGroup" class="custom-select" id="inputGroupSelect04">
                            <!-- TODO: вывод списка групп приложений через VueJS -->
                            <option  v-for="category in categories"
                                v-bind:value="category.name">
                                    {{ category.description }}
                                </option>
                        </select>
                        <div class="input-group-append">
                            <button v-on:click="createNewTask" class="btn btn-outline-success" type="button">Создать</button>
                        </div>
                    </div>
                </div>`,
    props: ['categories'],
    data: function(){
        return {
            todoTitle: '',
            selectedGroup: '',
            showInputFields: false,
        }
    },
    methods: {
        createNewTask: function(){
            if (this.todoTitle !== ''){
                console.log(this.todoTitle, this.selectedGroup);
                this.todoTitle = '';
            }
        }
    }
}

const CategoryItem = {
    template: `<li class="my-2" style="list-style: none;">
                    <span>
                        <i class="fa fa-tasks" aria-hidden="true"></i>
                        <span class="h6 ml-2 mr-3"><a href="">{{ category.description | capitalize }}</a></span>
                        <span class="badge badge-light">{{ category.task_count }}</span>
                    </span>
                </li>`,
    props: ['category'],
}

const NewTaskGroup = {
    template:   `<div class="col-12">
                    <span v-on:click="showInput = !showInput" v-show="showInput" class="color-success">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        Создать группу
                    </span>
                    <div v-show="!showInput" class="input-group input-group-sm mb-3">
                        <input v-model="inputValue" type="text" class="form-control" placeholder="Название группы" aria-label="Название группы" aria-describedby="button3">
                        <div class="input-group-append">
                            <button v-on:click="createNewGroup" class="btn btn-outline-secondary" type="button" id="button3">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div> 
                </div>`,
    data: function () {
        return {
            showInput: true,
            inputValue: '',
        }
    }, 


    methods: {
        createNewGroup: function(){
            if (this.inputValue !== ''){
                this.showInput = true;
                // TODO: Отправка данных на сервер и получение нового списка
                console.log(this.inputValue);
                this.inputValue = '';
            }
            
        }
    }, 
}

const todoapp = new Vue({
    el: '#todoapp',
    components: {
        'category-item': CategoryItem,
        'todo-item': TodoItem,
        'new-task-group': NewTaskGroup,
        'new-todo-item': NewTodoItem
    },

    data: {
        category_api: '/api/v1/category',
        task_api: '/api/v1/task',
        categories: [],
        todos: [],
        appname: 'todoapp'
    },

    methods: {
        getCategories: function () {
            axios.get(this.category_api)
                .then(function (response) {
                    todoapp.$data.categories = response.data.categories
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getAllTasks: function() {
            axios.get(this.task_api)
                .then(function (response) {
                    todoapp.$data.todos = response.data.todos
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, // EndMethods


    created: function () {
        this.getCategories(),
        this.getAllTasks()
    },

})