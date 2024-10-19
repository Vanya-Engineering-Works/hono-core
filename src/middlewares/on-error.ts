import type { Context } from "hono";
import { HttpStatus, HttpStatusMessage } from "../constants";

export function onError(error: Error, c: Context) {
	return c.json(
		{
			message: error.message || HttpStatusMessage.INTERNAL_SERVER_ERROR,
		},
		HttpStatus.INTERNAL_SERVER_ERROR,
	);
}
