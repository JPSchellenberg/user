import * as React from 'react';
import { connect } from 'react-redux';
import { State as Root_State } from '../state';

import SortComponent 			from '../components/material/sort';
import MultiplechoiceComponent  from '../components/material/multiple-choice';
import FreetextComponent 		from '../components/material/freetext';
import Video 					from '../components/material/video';
import { Sort } 				from '../state/material/types';

import {
	Material,
	get_material
} 				from '../state/material/selector';

import {
	Collection,
	get_collection
}				from '../state/collection/selector';

import {
	create_material_meta,
	material_meta_update
} 							from '../state/material/actions';

interface StateProps {
	material: Material;
	collection_id: string;
	collection: Collection;
}

interface DispatchProps {
	dispatch: (action) => void;
}

interface Props extends StateProps, DispatchProps { }

interface State {}

export class MaterialContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	public render() { 
		return (
			<div id="material">
			{
				this.props.material && this.props.material.meta 
				? 
				(() => {
					switch ( this.props.material.material_type ) {
						case 'sort':
							return (
								<SortComponent
									task={this.props.material.task}
									material_items={this.props.material.items}
									user_items={this.props.material.meta.value}
									cb={(value, score) => this.props.dispatch( 
										material_meta_update( this.props.material.meta._id, { value, score })
									)}
								/>
								);
						case 'multiplechoice':
							return (
								<MultiplechoiceComponent 
									material={this.props.material as any}
									cb={(value, score) => this.props.dispatch( 
										material_meta_update( this.props.material.meta._id, { value, score })
									)}
									answer={this.props.material.meta.value}
									show_correct_answers={this.props.collection.meta.submitted}
									task={this.props.material.task}
									hints={this.props.material.meta.hints}
									hint={() => this.props.dispatch( 
										material_meta_update( this.props.material.meta._id, { hints: this.props.material.meta.hints + 1 })
										)}
								/>
							);

						case 'video':
							return <Video url={this.props.material.task} />;

						case 'freetext':
							return (
								<FreetextComponent
									cb={(value: string, score: number) => this.props.dispatch( 
										material_meta_update( this.props.material.meta._id, { value: [value], score })
									)}
									answer_options={this.props.material.items}
									user_answer={this.props.material.meta.value[0]}
									show_answer={this.props.collection.meta.submitted}
									task={this.props.material.task}
								/>
							);
						default:
							return <div>Bitte warten.</div>;
					}
				})()
				: 
				<div>Loading material</div>
			}
			</div>
		); 
	}
}

function mapDispatchToProps(dispatch): DispatchProps {
	return {
		dispatch: (action) => dispatch(action)
	};
}

function mapStateToProps(state: Root_State, ownProps): StateProps {
	const query = ownProps.location.query;
	return {
		material: get_material(state, ownProps.params.material_id, { 
			collection: ownProps.params.collection_id, 
			type: 'worksheet' 
		}),
		collection: get_collection(state, ownProps.params.collection_id),
		collection_id: ownProps.params.collection_id
	};
}

export default connect<{}, {}, {}>(
	mapStateToProps,
	mapDispatchToProps,
)(MaterialContainer);
