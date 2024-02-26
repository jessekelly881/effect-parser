/**
 * @since 1.0.0
 */

import * as Parser from "@/Parser";
import * as Printer from "@/Printer";
import { Regex } from "@/Regex";
import { Chunk } from "effect";

export declare namespace Syntax {
	/**
	 * @since 1.0.0
	 * @category models
	 */
	export interface Proto {
		_tag: "Syntax";
	}
}

export interface Syntax<Err, In, Out, Value> extends Syntax.Proto {
	parser: Parser.Parser<Err, In, Value>;
	printer: Printer.Printer<Err, Out, Value>;
}

export const syntax = <Err, In, Out, Value>(
	parser: Parser.Parser<Err, In, Value>,
	printer: Printer.Printer<Err, Out, Value>
): Syntax<Err, In, Out, Value> => ({
	_tag: "Syntax",
	parser,
	printer
});

export const regexDiscard = <Err>(
	regex: Regex,
	failure: Err,
	value: Chunk.Chunk<string>
) =>
	syntax<Err, string, string, void>(
		Parser.regexDiscard(regex, failure),
		Printer.regexDiscard(regex, value)
	);
