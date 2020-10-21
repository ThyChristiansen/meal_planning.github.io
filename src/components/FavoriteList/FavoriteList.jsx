import React, { Component } from 'react';

import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import '../Recipes/Recipes.css'
import { Card, Container, Grid, Typography } from '@material-ui/core';
import RecipeSummary from '../Recipes/RecipeSummary';



const useStyles = (theme, isDraggingOver) => ({
  root: {
    marginTop: '25vh',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

  },
  card: {
    height: "100%",
    width: "100%",
    minWidth: "50%",
  },
  center: {
    textAlign: "center",

  },
  float: {
    float: "left",
    margin: theme.spacing(1),
  },
  section: {
    border: "1px solid gray",
  },

})


const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};


class FavoriteList extends Component {

  state = {
    favorite_list: [],
    tried_list: []
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FEATCH_FAVORITE_RECIPE',
    });

    this.props.dispatch({
      type: 'FEATCH_TRIED_RECIPE',
    });
    setTimeout(() => {
      this.setState({
        favorite_list: this.props.favoriteRecipes,
        tried_list: this.props.triedRecipes
      })
    }, 1000)


  }

  id2List = {
    droppable: 'favorite_list',
    droppable2: 'tried_list'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    setTimeout(() => {
      let changeInTriedList = this.state.tried_list.filter(item1 =>
        !this.props.triedRecipes.some(item2 => (item2.title === item1.title)))

      console.log(changeInTriedList[0]);

      let changeInFavoriteList = this.state.favorite_list.filter(item1 =>
        !this.props.favoriteRecipes.some(item2 => (item2.title === item1.title)))

        console.log(changeInFavoriteList);


        this.props.dispatch({
          type: 'MOVE_FAVORITE_RECIPE_TO_TRIED',
          payload: changeInTriedList[0]
        });
    }, 1000)




   
    // dropped outside the list
    if (!destination) {
      return;
    }

    console.log(this)
    result = move(
      this.getList(source.droppableId),
      this.getList(destination.droppableId),
      source,
      destination
    );

    this.setState({
      favorite_list: result.droppable,
      tried_list: result.droppable2
    });

    console.log(result)
    // }
  };

  getItem = (item) => {
    console.log(item)
  }

  droppableSection(sectionTitle, list, droppableId) {
    let objectToDrag = <Grid item xs={6} className={this.props.classes.section}>
      <Typography variant="h5" className={this.props.classes.center}>{sectionTitle}</Typography>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {list.map((item, index) => {
              // console.log(index)
              return (
                <Draggable
                  key={`item-${item.id}`}
                  draggableId={`item-${item.id}`}
                  index={index}>
                  {(provided) => (
                    <Card className={this.props.classes.card}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <RecipeSummary item={item} />

                    </Card>

                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Grid>

    return objectToDrag
  }

  render() {
    const { classes, favoriteRecipe } = this.props;

    return (
      <Container className={classes.root} maxWidth="md">
        <Typography variant="h3" className={classes.center}>Favorite Recipe List</Typography>
        {/* {favoriteRecipe.length === 0 && (
            <Typography className={classes.center}>You haven't any favorite recipes</Typography>
        )} */}

        <Grid container spacing={1}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.droppableSection("Not Try yet", this.state.favorite_list, "droppable")}
            {this.droppableSection("Tried", this.state.tried_list, "droppable2")}
          </DragDropContext>
        </Grid>
      </Container>

    )
  }
};


const putReduxStateToProps = (reduxState) => {
  let favoriteRecipes = reduxState.getFavoriteRecipe.map((item) => {
    return item
  })
  let triedRecipes = reduxState.getTriedRecipe.map((item) => {
    return item
  })

  return {
    favoriteRecipes,
    triedRecipes
  }
};
export default connect(putReduxStateToProps)(withStyles(useStyles)(FavoriteList));
