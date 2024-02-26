/**
 * @since 1.0.0
 */

export interface Succeed {
	_tag: "Regex";
	_op: "OneOf";
	value: Regex;
}

export interface OneOf {
	_tag: "Regex";
	_op: "OneOf";
	value: ReadonlyArray<string>; // chars
}

export interface Sequence {
	_tag: "Regex";
	_op: "Sequence";
	first: Regex;
	second: Regex;
}

export interface Repeat {
	_tag: "Regex";
	_op: "Repeat";
	regex: Regex;
	min?: number;
	max?: number;
}

export interface Or {
	_tag: "Regex";
	_op: "Or";
	left: Regex;
	right: Regex;
}

export interface And {
	_tag: "Regex";
	_op: "And";
	left: Regex;
	right: Regex;
}

export type Regex = OneOf | Sequence | Or | And | Repeat | Succeed;
