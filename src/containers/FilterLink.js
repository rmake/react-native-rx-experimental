import { connect } from "../state/rxStateComponent";
import visibilityFilterActions from "../actions/visibilityFilterActions";
import Link from "../components/Link";

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter.filter,
    filter: ownProps.filter,
    onClick: (filter) => visibilityFilterActions.setVisibilityFilter.send(filter),
});

const FilterLink = connect(
    mapStateToProps,
)(Link);

export default FilterLink;
