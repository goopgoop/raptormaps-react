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
exports.Features = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Feature_1 = require("./Feature");
let Features = class Features {
};
__decorate([
    type_graphql_1.Field(() => [Feature_1.Feature]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Features.prototype, "features", void 0);
Features = __decorate([
    type_graphql_1.ObjectType(),
    typegoose_1.index({ geometry: '2dsphere' })
], Features);
exports.Features = Features;
//# sourceMappingURL=Features.js.map