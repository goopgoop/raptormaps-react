"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graphql_1 = require("graphql");
const json_to_graphql_query_1 = require("json-to-graphql-query");
const index_1 = require("../../index");
const router = express_1.default.Router();
router.get("/:solarFarmId/technicians", (req, res) => {
    const query = `
        {
            technicians(SolarFarmId: "${req.params.solarFarmId}") {
                errors,
                response {
                    features {
                        type, 
                        properties {
                            name,
                            id,
                            bearing,
                            tsecs
                        }
                        geometry {
                            coordinates
                        }
                    }
                }
            }
        }
        `;
    graphql_1.graphql(index_1.graphQLSchema, query).then((dbRes) => {
        if (dbRes["errors"]) {
            res.status(400).json(dbRes);
        }
        else {
            let returnRes = dbRes["data"]["technicians"];
            if (returnRes.errors)
                res.status(400).json(dbRes["data"]["technicians"]);
            else
                res.json(returnRes.response);
        }
    }).catch((err) => {
        res.status(400).json(err);
    });
});
router.post("/:solarFarmId/techniciansMoved", (req, res) => {
    const query = {
        mutation: {
            techniciansMoved: {
                __args: {
                    SolarFarmId: req.params.solarFarmId,
                    Technicians: req.body
                },
                "errors": true
            }
        }
    };
    const toGraphQL = json_to_graphql_query_1.jsonToGraphQLQuery(query);
    graphql_1.graphql(index_1.graphQLSchema, toGraphQL).then(result => {
        res.json(result);
    });
});
exports.default = router;
//# sourceMappingURL=solar_farms.js.map