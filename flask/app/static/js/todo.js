
const TodoFilters = {
	template: 	`<div class="col-12">
					<div class="row">
						<div class="col-12 text-center">
							<a v-on:click="showFilters = !showFilters"  href="#"><i class="fa fa-cogs" aria-hidden="true"></i></a>
						</div>
					</div>
					<div v-show="showFilters" class="row">
						<div  class="col-12  my-1" style="height: 100px;">
							<span>Фильтры</span> 
						</div>
					</div>
				</div>`,
	props: [],
	data: function(){
		return {
			showFilters: false,
		}
	},
}


const NewTodo = {
	template: 	`<div class="row">
					<div class="col-sm-12 col-md-8 col-lg-8 mr-auto ml-auto text-center">
						<div class="input-group">
							<input  type="text" class="form-control" placeholder="Новая задача"  aria-describedby="button-addon2" v-model="newTodo">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" type="button" id="button-addon2" v-on:click="createTodo">
									<i class="fa fa-plus" aria-hidden="true"></i>
								</button>
							</div>
						</div>
					</div>
				</div>`,
	props: [],
	data: function(){
		return {
			endpoint: '/task',
			newTodo: ''
		}
	},
	methods: {
		createTodo: function(){

			if (this.newTodo !== ''){
				axios.post(this.endpoint, {
				    title: this.newTodo
			  	}).then(function (response) {
			    	if (response.data.success){
			    		todoapp.$data.todos = response.data.todos;
			    	} else {
			    		console.log('DBError: ', response.data.error);
			    	}
			  	}).catch(function (error) {
				    console.log(error);
			 	});	

			this.newTodo = '';
			}
		} 
	}
}




const TodoItem = {
	template: 	`<div class="col-12 mr-auto ml-auto border-bottom border-success py-1">
					<div class="row" style="font-size: 1.3em;">

						<div class="col-8 align-items-bottom">
							<div class="row mx-2 h-100">
								<p class="mb-1 align-self-end">
									<span class="mx-2">{{ index + 1 }}.</span>
									{{ todo.title }}
								</p>
							</div>
						</div>
					
						<div class="col-4 text-right" style="font-size: 1em;">
							
							<a class="text-success mx-2" href="#" v-on:click="showTaskInfo = !showTaskInfo">
								<i class="fa fa-info" aria-hidden="true"></i>
							</a>
							
							<a class="text-warning mx-2" href="#" v-on:click="completeTodo(todo.id)">
								<i class="fa fa-check" aria-hidden="true"></i>
							</a>
							
							<a class="text-danger mx-2" href="#" v-on:click="deleteTodo(todo.id)">
								<i class="fa fa-times" aria-hidden="true"></i>
							</a>

						</div>
					</div>
					<div v-show="showTaskInfo" class="row">
						<div class="col-12 m-2">
							<p>Описание: {{ todo.body }}</p>
							<p>Создано: {{ todo.created }}</p>
							<hr>
							<p>Автор: {{ todo.autor }}</p>
						</div>
					</div>
				</div>`,
	props: ['todo', 'index'],
	data: function(){
		return {
			endpoint: '/task',
			showTaskInfo: false,
		}
	},


	methods: {

		completeTodo: function(id){
			axios.put(this.endpoint, {
				    id: id
		  	}).then(function (response) {
		    	if (response.data.success){
		    		todoapp.$data.todos = response.data.todos;
		    	} else {
		    		console.log('DBError: ', response.data.error);
		    	}
		  	}).catch(function (error) {
			    console.log(error);
		 	});	
		},

		deleteTodo: function(id){
			axios.delete(this.endpoint, {
				    params: { id: id }
		  	}).then(function (response) {
		    	if (response.data.success){
		    		todoapp.$data.todos = response.data.todos;
		    	} else {
		    		console.log('DBError: ', response.data.error);
		    	}
		  	}).catch(function (error) {
			    console.log(error);
		 	});	
		},
	}	
}// EndComponent





const todoapp = new Vue({
	
	el: '#todo-list',
	components: {
		'todo-item': TodoItem,
		'todo-filters': TodoFilters,
		'new-todo': NewTodo				
	},
	
	data: {
    	endpoint: '/task',
    	todos: [],
    	appname: 'Todo-List'
	},
	
	methods: {
		getTodos: function(){
			axios.get(this.endpoint)
				.then(function (response) {
				todoapp.$data.todos = response.data.todos	
			})
				.catch(function (error) {
					console.log(error);
			})
		}, 
	}, // EndMethods


	created: function(){
		this.getTodos()
	}

})