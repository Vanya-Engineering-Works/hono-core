import type { Context } from "hono";
import { HttpStatus, HttpStatusMessage } from "../constants";

export function notFound(c: Context) {
	return c.json(
		{
			message: HttpStatusMessage.NOT_FOUND,
		},
		HttpStatus.NOT_FOUND,
	);
}
