import React from 'react';

import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Grid from '@material-ui/core/Grid';

import Select from '@material-ui/core/Select';

import ExtensionIcon from '@material-ui/icons/Extension';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';




import ChipInput from 'material-ui-chip-input'


import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { VtnConfigurationVenCard } from '../common/VtnConfigurationCard'

import { MarketContextSelectDialog, GroupSelectDialog, VenStatusSelectDialog } from '../common/VtnconfigurationDialog'

import { history } from '../../store/configureStore';




var MarketContextChip = (props) => {
  return (
  <span style={ { display: 'flex', alignItems: 'center', marginLeft: '-7px', } }><ExtensionIcon color="disabled" style={ { marginRight: '5px' } }/> { props.name }</span>
  );
}

var GroupChip = (props) => {
  return (
  <span style={ { display: 'flex', alignItems: 'center', marginLeft: '-7px', } }><GroupWorkIcon color="disabled" style={ { marginRight: '5px' } }/> { props.name }</span>
  );
}

var VenStatusChip = (props) => {
  return (
  <span style={ { display: 'flex', alignItems: 'center', marginLeft: '-7px', } }><SettingsInputComponentIcon color="disabled" style={ { marginRight: '5px' } }/> { props.name }</span>
  );
}

export class VenList extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {}
    this.state.marketContextSelectDialogOpen = false;
    this.state.groupSelectDialogOpen = false;
    this.state.venStatusSelectDialogOpen = false;
    this.state.filterMarketContext = [];
    this.state.filterGroup = [];
    this.state.filter = []

  }

  handleMarketContextSelectOpen = () => {
    this.setState( {
      marketContextSelectDialogOpen: true
    } )
  }

  handleMarketContextSelectClose = (context) => {
    var params = {
      marketContextSelectDialogOpen: false
    }
    if ( context != null ) {
      this.handleAddChip( <MarketContextChip name={ context.name } /> );
    }
    this.setState( params )
  }

  handleGroupSelectOpen = () => {
    this.setState( {
      groupSelectDialogOpen: true
    } )
  }

  handleGroupSelectClose = (group) => {
    var params = {
      groupSelectDialogOpen: false
    }
    if ( group != null ) {
      this.handleAddChip( <GroupChip name={ group.name } /> );
    }
    this.setState( params )
  }

  handleVenStatusSelectOpen = () => {
    this.setState( {
      venStatusSelectDialogOpen: true
    } )
  }

  handleVenStatusSelectClose = (group) => {
    var params = {
      venStatusSelectDialogOpen: false
    }
    if ( group != null ) {
      this.handleAddChip( <GroupChip name={ group.name } /> );
    }
    this.setState( params )
  }

  handleAddChip = (chip) => {
    var filter = this.state.filter;
    filter.push( chip );
    this.setState( {
      filter
    } )
  }

  handleDeleteChip = (chip, index) => {
    var filter = this.state.filter;
    filter.splice( index, 1 );
    this.setState( {
      filter
    } )


  }

  handleDeleteVen = (username) => {
    var that = this;
    return function ( event ) {
      event.preventDefault();
      that.props.deleteVen( username )

    }

  }

  handleEditVen = (username) => {
    return function ( event ) {
      event.preventDefault();
      history.push( '/ven/detail/' + username )
    }
  }

  handleCreateVENClick = () => {
    history.push( '/ven/create' )
  }

  render() {
    const {classes, ven, marketContext, group} = this.props;

    var view = [];

    for (var i in ven) {
      var v = ven[ i ];
      view.push(

        <VtnConfigurationVenCard key={ 'ven_card_' + v.username }
                                 classes={ classes }
                                 ven={ v }
                                 handleDeleteVen={ this.handleDeleteVen( v.username ) }
                                 handleEditVen={ this.handleEditVen( v.username ) } />
      );
    }
    return (
    <div>
      <Grid container spacing={ 8 }>
        <Grid container
              item
              xs={ 12 }
              spacing={ 24 }>
          <Grid item xs={ 6 }>
            <ChipInput label="Filters"
                       placeholder="Filters"
                       value={ this.state.filter }
                       onAdd={ this.handleAddChip }
                       onDelete={ this.handleDeleteChip }
                       fullWidth={ true } />
          </Grid>
          <Grid item xs={ 3 }>
            <div style={ { marginTop: 15 } }>

              <IconButton className={ classes.iconButton }
                          aria-label="market_context"
                          onClick={ this.handleMarketContextSelectOpen }>
                <ExtensionIcon />
                <ExpandMore />
              </IconButton>
              <MarketContextSelectDialog marketContext={ marketContext}
                                         open={ this.state.marketContextSelectDialogOpen }
                                         close={ this.handleMarketContextSelectClose }
                                         title="Filter by Market Context" />


              <IconButton className={ classes.iconButton }
                          aria-label="group"
                          onClick={ this.handleGroupSelectOpen }>
                <GroupWorkIcon />
                <ExpandMore />
              </IconButton>
              <GroupSelectDialog group={ group }
                                 open={ this.state.groupSelectDialogOpen }
                                 close={ this.handleGroupSelectClose }
                                 title="Filter by Group" />

              <IconButton className={ classes.iconButton }
                          aria-label="group"
                          onClick={ this.handleVenStatusSelectOpen }>
                <SettingsInputComponentIcon />
                <ExpandMore />
              </IconButton>
              <VenStatusSelectDialog open={ this.state.venStatusSelectDialogOpen }
                                 close={ this.handleVenStatusSelectClose }
                                 title="Filter by Ven Status" />


              <IconButton className={ classes.iconButton } aria-label="Search">
                <SearchIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={ 3 }>
            <Button key="btn_create"
                    style={ { marginTop: 15 } }
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={ classes.button }
                    onClick={ this.handleCreateVENClick }>
              <AddIcon />Create a new VEN
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider style={ { marginBottom: '20px', marginTop: '20px' } } />
      <Typography gutterBottom
                  variant="title"
                  component="h2">
        Existing VENs
      </Typography>
      <GridList style={ { justifyContent: 'space-around', } }>
        { view }
      </GridList>
    </div>
    );
  }
}

export default VenList;