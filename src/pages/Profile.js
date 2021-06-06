import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from '../Navigation/NavBar'


/*function set_value_favorite(new_value) {
  console.log("Favorito?: " + new_value);
}
function set_value_rating(new_value) {
  //TODO: Enviar para o backend salvar, e depois utilizar como valor no front
  console.log("Nota: " + new_value);
}
function set_name(new_value) {
  console.log("O nome é: " + new_value);
}*/

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    //background: 'linear-gradient(5deg, #edb600 30%, #FF8E53 90%)',
    padding: theme.spacing(3),
    margin: "center",
    maxWidth: 600,
    minHeight: 150
  },
  img: {
    //background: 'linear-gradient(45deg, #F5FB8B 30%, #F5FB8B 90%)',
    margin: "auto",
    width: 128,
    height: 128
  },
  image: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    position: "relative",
    margin: "center",
    display: "flex",
    width: 128,
    height: 128
  },
  avatar: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },

}));

export default function Profile() {
  const classes = useStyles();
  const [value /*setValue*/] = React.useState(1);

  /*const handleExpandClick = () => {
    setExpanded(!expanded);
  };*/

  return (
    <div className={classes.root}>
        <NavBar></NavBar>
        
    </div>
  );
}
