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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLSchema = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const inmem_resolver_1 = require("./database/inmemory/inmem-resolver");
const cors_1 = __importDefault(require("cors"));
const solar_farms_1 = __importDefault(require("./api/v1/solar_farms"));
const apollo_server_express_1 = require("apollo-server-express");
var graphQLSchema;
exports.graphQLSchema = graphQLSchema;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield inmem_resolver_1.connectToDB();
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default({
        origin: "http://localhost:3000"
    }));
    exports.graphQLSchema = graphQLSchema = yield type_graphql_1.buildSchema({
        resolvers: [inmem_resolver_1.DatabaseResolver],
        validate: false
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: graphQLSchema
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.use('/api/v1/solar_farms', solar_farms_1.default);
    app.listen(4000, () => {
        console.log('server started at 4000');
    });
});
main();
//# sourceMappingURL=index.js.map