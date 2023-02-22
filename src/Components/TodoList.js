import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = (props) => {
  return (
    <ListItem
      id={props.id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar src={props.imageSrc} sx={{ width: 100, height: 100 }}>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.title} />
    </ListItem>
  );
};

export default TodoList;
