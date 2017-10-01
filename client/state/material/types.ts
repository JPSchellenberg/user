export interface Material {
	_id: string;
	name: string;
	description: string;
	material_type: "markdown" | "multiplechoice" | "freetext" | "sort";
	type: string;
	tag_list: string[];
	image?: string;
}

export interface MaterialMeta {
	_id: string;
	type: string;
	material_id: string;
	// material: Material;
	user_id: string;
	query: {
		run?: string;
		collection?: string;
		type?: string;
		material?: string;
	};
	score?: number;
	hints?: number;
	value?: string[] | string;
}

export interface Task extends Material {
	task: string;
	items: string[];
}

export interface MultipleChoice extends Task {
	solution: Array<number | string>;
}

export interface FreeText extends Task {
	solution: string[];
}

export interface Markdown extends Material {
	text: Markdown;
}

export interface Sort extends Task {}

export interface TaskMeta extends MaterialMeta {}

export interface SortMeta extends TaskMeta {}

export interface MultipleChoiceMeta extends TaskMeta {}

export interface FreeTextMeta extends MaterialMeta {
	value: string;
}

export interface State {
	material: {
		list: Material[];
		meta: MaterialMeta[];
	};
}