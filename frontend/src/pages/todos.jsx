import { useEffect, useState } from 'react';
import useApi from '../hooks/use-api'
import dataRequest from '../api/dataRequest'
import "./todos.css";

export default function Todos() {

  const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const getTodos = useApi(dataRequest);
	const addTodos = useApi(dataRequest);
	const updateTodos = useApi(dataRequest);
	const deleteTodos = useApi(dataRequest);
	
	useEffect(() => {
		setUserInfo(localStorage.getItem("userInfo"))
		GetTodos();
	}, []);


	const GetTodos = async () => {
    const reqOptions = {mode: 'cors',headers : {Authorization: `Bearer ${userInfo.token}`}}
    try {
      setLoading(true)
      const data = await getTodos.request(`http://localhost:5000/api/todos/${userInfo._id}`,reqOptions);
			setTodos(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
		
	}

	const updateTodo = async id => {
		const requestOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				finished: true
			})}

		const data = await updateTodos.request(`http://localhost:5000/api/todos/${userInfo._id}`,requestOptions);

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.finished = true;
			}

			return todo;
		}));
		
	}

	const addTodo = async () => {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: newTodo
			})
		}
		const data = await addTodos.request(`http://localhost:5000/api/todos/${userInfo._id}`, requestOptions);

		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async id => {
		const data = await deleteTodos.request(`http://localhost:5000/api/todos/${userInfo._id}?todoID=${id}`, { method: "DELETE" });

		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}

	return (
		<div className="App">
			<h1>To Do List</h1>
			<h4>Your tasks</h4>

			<div className="todos">
        {
          todos.length >0 && todos.map(todo => (
            <div className={
              "todo" + (todo.finished ? " is-complete" : "")
            } key={todo._id} onClick={() => updateTodo(todo._id)}>
              <div className="checkbox"></div>
  
              <div className="text">{todo.text}</div>
  
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
            </div>
          )) 
        }
				{ loading && (<p>loading</p>) }

        { !loading && (<p>Currently you don't have any tasks</p>) }
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}
