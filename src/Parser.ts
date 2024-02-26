/**
 * @since 1.0.0
 */

import { Regex } from "@/Regex";

export declare namespace Parser {
	/**
	 * @since 1.0.0
	 * @category models
	 */
	export interface Proto {
		_tag: "Parser";
	}
}

export interface Succeed<Result> extends Parser.Proto {
	_op: "Succeed";
	value: Result;
}

export interface Fail<Err> extends Parser.Proto {
	_op: "Fail";
	failure: Err;
}

export interface Named<Err, In, Result> extends Parser.Proto {
	_op: "Named";
	name: string;
	parser: Parser<Err, In, Result>;
}

export interface SkipRegex<Err> extends Parser.Proto {
	_op: "SkipRegex";
	regex: Regex;
	onFailure?: Err;
}

export const skipRegex = <Err>(
	regex: Regex,
	onFailure?: Err
): SkipRegex<Err> => ({
	_tag: "Parser",
	_op: "SkipRegex",
	regex,
	onFailure
});

export const regexDiscard = <Err>(
	regex: Regex,
	onFailure: Err
): SkipRegex<Err> => ({
	_tag: "Parser",
	_op: "SkipRegex",
	regex,
	onFailure
});

export const unsafeRegexDiscard = <Err>(regex: Regex): SkipRegex<Err> => ({
	_tag: "Parser",
	_op: "SkipRegex",
	regex
});

export type Parser<Err, In, Result> =
	| Succeed<Result>
	| Fail<Err>
	| SkipRegex<Err>
	| Named<Err, In, Result>;
