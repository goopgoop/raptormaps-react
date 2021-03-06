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
exports.Feature = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Geometry_1 = require("./Geometry");
const Technician_1 = require("./Technician");
let Feature = class Feature {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ default: "Feature" }),
    __metadata("design:type", String)
], Feature.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Technician_1.Technician)
], Feature.prototype, "properties", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Geometry_1.Geometry)
], Feature.prototype, "geometry", void 0);
Feature = __decorate([
    type_graphql_1.ObjectType(),
    typegoose_1.index({ geometry: '2dsphere' })
], Feature);
exports.Feature = Feature;
//# sourceMappingURL=Feature.js.map