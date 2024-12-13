import { createProfiguration } from '@golevelup/profiguration';

type Config = {
    kafka: {
        clientId: string;
        brokers: string[];
        retryCount: number;
        consumer: {
            groupId: string;
        };
        topics: {
            exampleTopic: string;
        };
    };
    database: {
        adapter: string;
        config: any;
    }[];
    cache: {
        namespace: string;
        host: string;
        port: number;
        db?: number;
        password?: string;
    };
    app: {
        port: number;
    };
};

export const config = createProfiguration<Config>(
    {
        kafka: {
            clientId: {
                default: 'example-client',
                format: String,
                env: 'KAFKA_CLIENT_ID',
            },
            brokers: {
                default: ['localhost:9093'],
                format: Array,
                env: 'KAFKA_BROKERS',
            },
            retryCount: {
                default: 1,
                format: Number,
                env: 'KAFKA_RETRY_COUNT',
            },
            consumer: {
                groupId: {
                    default: 'example-client',
                    format: String,
                    env: 'KAFKA_CONSUMER_GROUP_ID',
                },
            },
            topics: {
                exampleTopic: {
                    default: 'example-topic',
                    format: String,
                    env: 'KAFKA_EXAMPLE_TOPIC',
                },
            },
        },
        cache: {
            namespace: {
                default: 'cache',
                format: String,
                env: 'CACHE_NS',
            },
            host: {
                default: 'localhost',
                format: String,
                env: 'CACHE_HOST',
            },
            port: {
                default: 6379,
                format: Number,
                env: 'CACHE_PORT',
            },
            db: {
                default: 1,
                format: Number,
                env: 'CACHE_DB',
            },
            password: {
                default: '',
                format: String,
                env: 'CACHE_PWD',
            },
        },
        database: [
            {
                adapter: {
                    default: 'postgres',
                    format: String,
                    env: 'DB_ADAPTER',
                },
                config: {
                    username: {
                        default: 'root',
                        format: String,
                        env: 'DB_USER',
                    },
                    password: {
                        default: 'root',
                        format: String,
                        env: 'DB_PWD',
                    },
                    replica: {
                        master: {
                            default: 'localhost:5432',
                            format: String,
                            env: 'DB_MASTER',
                        },
                        slaves: {
                            default: ['localhost:5432'],
                            format: Array,
                            env: 'DB_SLAVES',
                        },
                    },
                },
            },
        ],
        app: {
            port: {
                default: 3000,
                format: 'port',
                env: 'APP_PORT',
            },
        },
    },
    {
        strict: false,
        configureEnv: (env = 'local') => ({
            strict: false,
            files: [`.env.${env}`],
        }),
    },
);
