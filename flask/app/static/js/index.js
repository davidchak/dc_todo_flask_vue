// TODO: удалить вывод в консоль
// TODO: написать функцию обновления только измененных 
// 		 или недостающих задач(TODO)


moment.locale('ru');

var data = {
    	endpoint: '/task',
    	newTodo: '',
    	todos: []
	}


const todoapp = new Vue({
	
	el: '#todo-list',
	delimiters: ['[[', ']]'],
    data: data,

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

		getTodos: function(){
			axios.get(this.endpoint)
				.then(function (response) {
				todoapp.$data.todos = response.data.todos	
			})
				.catch(function (error) {
					console.log(error);
			})
		}, 

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
		}
	},

	filters: {
		moment: function (value) {
		   moment(value).format('LL');
	  	}
	},

	created: function(){
		this.getTodos()
	}
})