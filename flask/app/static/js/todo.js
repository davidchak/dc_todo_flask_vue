const CategoryItem = {
    template: `<li class="my-2" style="list-style: none;">
                    <span>
                        <i class="fa fa-tasks" aria-hidden="true"></i>
                        <span class="h6 ml-2 mr-3"><a href="">{{ category.name }}</a></span>
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
    },

    data: {

        endpoint: '/api/v1/category',
        categories: [],
        appname: 'todoapp'
    },

    methods: {
        getCategories: function () {
            axios.get(this.endpoint)
                .then(function (response) {
                    todoapp.$data.categories = response.data.categories
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
    }, // EndMethods


    created: function () {
        this.getCategories()
    }

})