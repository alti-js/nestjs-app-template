import { Module } from '@nestjs/common';
import { ConsumerModule } from './consumer/consumer.module';
import { KafkaModule } from '@alti-js/nestjs-kafka';
import { config } from './config/config';
import { DatabaseModule } from '@alti-js/nestjs-db';
import { CacheManagerModule } from '@alti-js/nestjs-cache';

@Module({
    imports: [
        ConsumerModule,
        KafkaModule.register([
            {
                name: 'default',
                options: {
                    client: {
                        clientId: config.get('kafka.clientId'),
                        brokers: config.get('kafka.brokers'),
                        retry: {
                            retries: config.get('kafka.retryCount'),
                        },
                    },
                    consumer: {
                        groupId: config.get('kafka.consumer.groupId'),
                    },
                },
            },
        ]),
        DatabaseModule.forRoot({
            postgres: {
                options: {
                    ...(config.get('db.replica.master')
                        ? {
                              replication: {
                                  master: {
                                      host: config
                                          .get('db.replica.master')
                                          .split(':')[0],
                                      port:
                                          config
                                              .get('db.replica.master')
                                              .split(':')[1] || 5432,
                                      username: config.get('db.username'),
                                      password: config.get('db.password'),
                                      database: config.get('db.name'),
                                  },
                                  slaves: config
                                      .get('db.replica.slaves')
                                      .map((sl) => {
                                          const [host, port] = sl
                                              .trim()
                                              .split(':');
                                          return {
                                              host,
                                              port: Number(
                                                  port ||
                                                      config.get('db.port') ||
                                                      5432,
                                              ),
                                              username:
                                                  config.get('db.username'),
                                              password:
                                                  config.get('db.password'),
                                              database: config.get('db.name'),
                                          };
                                      }),
                              },
                          }
                        : {
                              host: config.get('db.host'),
                              port: config.get('db.port'),
                              username: config.get('db.username'),
                              password: config.get('db.password'),
                              database: config.get('db.name'),
                          }),
                },
            },
        }),
        CacheManagerModule.forRoot({
            adapter: 'redis',
            max: 10000,
            ttl: config.get('cache.ttl'),
            namespace: config.get('cache.namespace'),
            adapterOptions: {
                host: config.get('cache.host'),
                port: config.get('cache.port'),
                db: config.get('cache.db'),
                ...(config.get('cache.password')
                    ? { password: config.get('cache.password') }
                    : {}),
            },
        }),
    ],
})
export class AppModule {}
