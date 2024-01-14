import amqplib from 'amqplib';
import { ReifiedTest } from './reified-test';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env',
});

let _conn: amqplib.Connection | undefined = undefined;

export async function publish<T>(queue: string, message: T): Promise<boolean> {
  const conn = await createConn();
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true, arguments: { 'x-queue-type': 'quorum' } });
  return ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { type: 'quorum' });
}

export async function subscribe<T>(
  queue: string,
  callback: (message: T | undefined) => Promise<void>
): Promise<string> {
  const conn = await createConn();
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true, arguments: { 'x-queue-type': 'quorum' } });
  const consumer = await ch.consume(
    queue,
    (msg: amqplib.ConsumeMessage | null) => {
      callback(msg?.content && JSON.parse(msg.content.toString()))
        .then(() => {
          msg && ch.ack(msg);
        })
        .catch(() => {
          msg && ch.nack(msg);
        });
    },
    { arguments: { 'x-queue-type': 'quorum' } }
  );
  return consumer.consumerTag;
}

async function createConn(): Promise<amqplib.Connection> {
  if (!_conn) {
    const url = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@0.0.0.0:5672/${process.env.RABBITMQ_VHOST}`;
    _conn = await amqplib.connect(url);
  }
  return _conn;
}

export interface TestExecutionMessage {
  test: ReifiedTest;
}

export const TEST_EXECUTION_CHANNEL = 'test_execution';
