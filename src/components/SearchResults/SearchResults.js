import PropTypes from "prop-types";
import React from "react";
import "./SearchResults.css";

//Components
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          onAdd={this.props.onAdd}
          isRemoval={false}
          tracks={this.props.results}
        />
      </div>
    );
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  onAdd: PropTypes.func
};

export default SearchResults;
