"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.connectToDB = exports.DatabaseResolver = void 0;
const type_graphql_1 = require("type-graphql");
const techinicaninput_1 = require("../entities/types/techinicaninput");
const responseTypes_1 = require("../responseTypes");
const solarfarminmem_1 = __importDefault(require("./solarfarminmem"));
var database;
let DatabaseResolver = class DatabaseResolver {
    technicians(solarFarmId) {
        return __awaiter(this, void 0, void 0, function* () {
            const technicians = database.getTechnicians(solarFarmId);
            if (!technicians)
                return { errors: ["Solar farm id not found"] };
            return { response: technicians };
        });
    }
    techniciansMoved(solarFarmId, techs) {
        return __awaiter(this, void 0, void 0, function* () {
            const solarFarm = database.getSolarFarm(solarFarmId);
            const techId = solarFarm.technicianId + 1;
            let features = [];
            for (let i = 0; i < techs.length; i++) {
                let tech = techs[i];
                features.push({
                    type: "Feature",
                    properties: Object.assign(Object.assign({}, tech), { id: techId, tsecs: new Date() }),
                    geometry: { type: "Point", coordinates: tech.coordinates }
                });
            }
            database.techniciansMoved(solarFarmId, { features: features });
            return { response: database.getTechnicians(solarFarmId) };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => responseTypes_1.FeaturesResponse),
    __param(0, type_graphql_1.Arg("SolarFarmId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DatabaseResolver.prototype, "technicians", null);
__decorate([
    type_graphql_1.Mutation(() => responseTypes_1.FeaturesResponse),
    __param(0, type_graphql_1.Arg("SolarFarmId", () => String)),
    __param(1, type_graphql_1.Arg("Technicians", () => [techinicaninput_1.TechnicianInput])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], DatabaseResolver.prototype, "techniciansMoved", null);
DatabaseResolver = __decorate([
    type_graphql_1.Resolver()
], DatabaseResolver);
exports.DatabaseResolver = DatabaseResolver;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        database = new solarfarminmem_1.default();
        yield database.readFile();
    });
}
exports.connectToDB = connectToDB;
//# sourceMappingURL=inmem-resolver.js.map