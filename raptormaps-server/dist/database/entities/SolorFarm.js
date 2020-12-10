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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarFarmModal = exports.SolarFarm = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Features_1 = require("./Features");
let SolarFarm = class SolarFarm {
};
__decorate([
    type_graphql_1.Field(() => [Features_1.Features]),
    typegoose_1.prop({ type: [Features_1.Features], required: true }),
    __metadata("design:type", Array)
], SolarFarm.prototype, "currentTechnicians", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typegoose_1.prop({ required: true, default: 1 }),
    __metadata("design:type", Number)
], SolarFarm.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typegoose_1.prop({ required: true, default: 1 }),
    __metadata("design:type", Number)
], SolarFarm.prototype, "technicianId", void 0);
SolarFarm = __decorate([
    type_graphql_1.ObjectType()
], SolarFarm);
exports.SolarFarm = SolarFarm;
exports.SolarFarmModal = typegoose_1.getModelForClass(SolarFarm);
//# sourceMappingURL=SolorFarm.js.map