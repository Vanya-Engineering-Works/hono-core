import pino from "pino";

const logger = pino({
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
		},
	},
});

export class Logger {
	private readonly context: string;

	constructor(context: string) {
		this.context = context;
	}

	public static get(context: string) {
		return new Logger(context);
	}

	info(message: string, _logInfo?: Record<string, unknown>) {
		logger.info(message, _logInfo);
	}

	error(error: Error, message: string, _logInfo?: Record<string, unknown>) {
		logger.error(message, {
			...logger,
			error,
		});
	}

	trace(message: string, ...rest: Array<string>) {
		logger.trace(message, ...rest);
	}
}
