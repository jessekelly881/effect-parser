/**
 * @since 1.0.0
 */

import { Regex } from "@/Regex";
import { Chunk } from "effect";

export declare namespace Printer {
	/**
	 * @since 1.0.0
	 * @category models
	 */
	export interface Proto {
		_tag: "Printer";
	}
}

export interface Succeed extends Printer.Proto {
	_op: "Succeed";
	value: unknown;
}

export interface Fail<Err> extends Printer.Proto {
	_op: "Fail";
	failure: Err;
}

export interface ProvideValue<Err, Out, Value> extends Printer.Proto {
	_op: "ProvideValue";
	printer: Printer<Err, Out, Value>;
	value: Value;
}

export interface SkipRegex extends Printer.Proto {
	_op: "SkipRegex";
	regex: Regex;
	printAs: Chunk.Chunk<string>; // char
}

export const skipRegex = (
	regex: Regex,
	printAs: Chunk.Chunk<string>
): SkipRegex => ({
	_tag: "Printer",
	_op: "SkipRegex",
	regex,
	printAs
});

export const regexDiscard = (
	regex: Regex,
	value: Chunk.Chunk<string>
): Printer<never, string, void> => skipRegex(regex, value);

export type Printer<Err, Out, Value> =
	| Succeed
	| Fail<Err>
	| ProvideValue<Err, Out, Value>
	| SkipRegex;
