"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const parser_1 = require("./parser");
const TOPIC_NAME = "quickstart-events";
const prismaClient = new client_1.PrismaClient();
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({
            groupId: 'main-worker-2'
        });
        yield consumer.connect();
        const producer = kafka.producer();
        yield producer.connect();
        yield consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
        yield consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c, _d, _e, _f, _g, _h, _j;
                console.log({
                    partition,
                    offset: message.offset,
                    value: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                });
                if (!((_c = message.value) === null || _c === void 0 ? void 0 : _c.toString())) {
                    return;
                }
                const parsedValue = JSON.parse((_d = message.value) === null || _d === void 0 ? void 0 : _d.toString());
                const zapRunId = parsedValue.zapRunId;
                const stage = parsedValue.stage;
                const zapRunDetails = yield prismaClient.zapRun.findFirst({
                    where: {
                        id: zapRunId
                    }, include: {
                        zap: {
                            include: {
                                actions: {
                                    include: {
                                        type: true
                                    }
                                }
                            }
                        },
                    }
                });
                //send a query  to get back zap id
                //send a query to getback the actions associated with this zap id
                //find the available actions
                const currentAction = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions.find(x => x.sortingOrder === stage);
                if (!currentAction) {
                    console.log("Current action not found?");
                    return;
                }
                console.log(currentAction);
                const zapRunMetadata = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.metadata;
                if (currentAction.type.id === "email") {
                    const body = (0, parser_1.parse)((_e = currentAction.metadata) === null || _e === void 0 ? void 0 : _e.body, zapRunMetadata);
                    const to = (0, parser_1.parse)((_f = currentAction.metadata) === null || _f === void 0 ? void 0 : _f.email, zapRunMetadata);
                    console.log(`Sending out to ${to} body is ${body}`);
                }
                if (currentAction.type.id === "send-sol") {
                    const amount = (0, parser_1.parse)((_g = currentAction.metadata) === null || _g === void 0 ? void 0 : _g.amount, zapRunMetadata);
                    const address = (0, parser_1.parse)((_h = currentAction.metadata) === null || _h === void 0 ? void 0 : _h.address, zapRunMetadata);
                    console.log(`Sending out SOL of ${amount} body is ${address}`);
                }
                yield new Promise(r => setTimeout(r, 5000));
                const zapId = (_j = message.value) === null || _j === void 0 ? void 0 : _j.toString();
                const lastStage = ((zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions.length) || 1) - 1;
                if (lastStage !== stage) {
                    yield producer.send({
                        topic: TOPIC_NAME,
                        messages: [{
                                value: JSON.stringify({
                                    stage: stage + 1,
                                    zapRunId
                                })
                            }]
                    });
                }
                console.log("processing done");
                yield consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        partition: partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
            }),
        });
    });
}
main();
