import type { ZodSchema } from "zod";
import z from "zod";

export function jsonContent<T extends ZodSchema>(
	schema: T,
	description: string,
) {
	return {
		content: {
			"application/json": {
				schema,
			},
		},
		description,
	};
}

export function requiredJsonContent<T extends ZodSchema>(
	schema: T,
	description: string,
) {
	return {
		...jsonContent(schema, description),
		required: true,
	};
}

export function errorContent(message: string) {
	return jsonContent(
		z
			.object({
				message: z.string().openapi({
					example: message,
				}),
			})
			.openapi("error"),
		"Rest API Error",
	);
}
