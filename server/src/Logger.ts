import { AdvancedConsoleLogger, Logger, LoggerOptions, QueryRunner } from "typeorm";


export class RMLogger extends AdvancedConsoleLogger implements Logger{
    constructor(options?: LoggerOptions) {
        super(options);
    }
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        parameters = parameters?.filter(param=> {
            if (Buffer.isBuffer(param)) return false;
            return true;
        });
        
        super.logQuery(query, parameters, queryRunner);
    }
}