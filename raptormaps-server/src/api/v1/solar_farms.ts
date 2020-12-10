import express from 'express'
import { graphql } from 'graphql'
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { FeaturesResponse } from 'src/database/responseTypes';
import { graphQLSchema } from '../../index'
const router = express.Router();

//This is a fleshed out api with errors and everthing
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
    graphql(graphQLSchema, query).then((dbRes) => {
        if(dbRes["errors"]) {
            res.status(400).json(dbRes);
        }
        else {
            let returnRes = (dbRes["data"]["technicians"] as unknown) as FeaturesResponse;
            if(returnRes.errors)
                res.status(400).json(dbRes["data"]["technicians"]);
            else
                res.json(returnRes.response);
        }
    }).catch((err) => {
        res.status(400).json(err);
    });
});

//This is a test api meant for being able to add technicians and simulating their movement
//This still needs to send errors (would depend on design)
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

    const toGraphQL = jsonToGraphQLQuery(query);
    graphql(graphQLSchema, toGraphQL).then(result => {
       res.json(result);
    })
});

export default router;