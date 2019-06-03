
const app = new Vue({
	
	el: '#todo-list',
	delimiters: ['[[', ']]'],
    data: {
    	endpoint: '/task/',
    	newTodo: '',
    	todos_count: 0,
    	todos: []
	},
	

	methods: {
		create: function(){
			if (this.newTodo !== ''){
				this.todos.push({
					title: this.newTodo,
					body: this.newTodo
				});
				this.newTodo = '';
			} else {
				console.log('Error!');
			}
		}, 
		fetchData: function(){
			axios.get(this.endpoint)
				.then(function (response) {
				return response.data
			})
				.catch(function (error) {
					console.log(error);
			})
		}
	},
	mounted: function(){
		fetch('/task').then(
			function(response){
				console.log(response.json());
			}
		)
	},
})