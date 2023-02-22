import { useState, useEffect } from "react";

import { Configuration, OpenAIApi } from "openai";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import classes from "./Todo.module.css";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { compose } from "@mui/system";

const Todo = () => {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem("MY_APP_STATE")) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [typoControl, setTypoControl] = useState("Add Todos to the List");

  // API key create .env to store secret key
  const REACT_APP_AI_Key =
    "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";
  const configuration = new Configuration({
    apiKey: REACT_APP_AI_Key,
  });
  const openai = new OpenAIApi(configuration);

  // this will run whenever todosList dependency updates
  useEffect(() => {
    window.localStorage.setItem("MY_APP_STATE", JSON.stringify(todos));
    if (todos.length > 0) {
      setTypoControl("Todo List");
    }
  }, [todos]);

  const getImage = async (todo) => {
    const res = await openai.createImage({
      prompt: todo,
      n: 1,
      size: "512x512",
    });
    return res.data.data[0].url;
  };

  const handleTodoAdd = async () => {
    setLoading(true);
    let imageGenerated = await getImage(inputTodo);
    if (!inputTodo) return;
    setTodos([...todos, { id: Date.now(), title: inputTodo, img: imageGenerated }]);
    setInputTodo('');
    setLoading(false);
  };

  const handleTodoDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const todoListItem = todos.map((todo, i) => {
    return (
      <TodoList
        title={todo.title}
        imageSrc={todo.img}
        key={todo.id}
        onDelete={() => handleTodoDelete(todo.id)}
      />
    );
  });
  return (
    <Container maxWidth="sm">
      <TodoForm
        label="Enter name"
        variant="standard"
        value={inputTodo}
        buttonLabel="Add Items"
        onTodoInputUpdate={(e) => setInputTodo(e.target.value)}
        onButtonClick={handleTodoAdd}
      />
      {loading ? <p>Loading....</p> : <p></p>}
      <Box>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            {typoControl}
          </Typography>
          <List>{todoListItem}</List>
        </Grid>
      </Box>
    </Container>
  );
};

export default Todo;
