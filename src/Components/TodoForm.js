import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const TodoForm = (props) => {
    return (
        <>
            <TextField
                label={props.label}
                variant={props.variant}
                value={props.value}
                onChange={props.onTodoInputUpdate}
            />
            <Button variant="contained" onClick={props.onButtonClick}>{props.buttonLabel}</Button>
        </>
    )
}

export default TodoForm;