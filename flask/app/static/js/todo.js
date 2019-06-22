

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
                    <span class="mr-3">
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
            mrAutoClass: 'mr-auto'
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
    data: function () {
        return {
            
        }
    },
}


const todoapp = new Vue({
    el: '#todoapp',
    components: {
        'category-item': CategoryItem,
        'todo-item': TodoItem
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