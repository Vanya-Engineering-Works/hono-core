import { OpenAPIHono, type OpenAPIHonoOptions } from "@hono/zod-openapi";
import { type Env, Hono } from "hono";
import type { HonoOptions } from "hono/hono-base";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { HttpStatus } from "../constants";
import { notFound, onError } from "../middlewares";
import { Logger } from "./pino.ts";

type HonoAppOptions = HonoOptions<Env> & OpenAPIHonoOptions<Env>;

export const createHonoApp = (options?: HonoAppOptions) => {
	const app = new OpenAPIHono({
		defaultHook: (result, c) => {
			if (!result.success) {
				return c.json(result, HttpStatus.BAD_REQUEST);
			}
		},
		...options,
	});
	const pinoLogger = Logger.get("createHonoApp");

	app.use("*", requestId());
	app.use(secureHeaders());
	app.use(prettyJSON());
	app.use(logger(pinoLogger.trace));
	app.notFound(notFound);
	app.onError(onError);

	return app;
};
