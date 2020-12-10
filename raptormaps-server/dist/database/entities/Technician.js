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
exports.Technician = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let Technician = class Technician {
    constructor() {
        this.tsecs = new Date();
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typegoose_1.prop({ default: 1 }),
    __metadata("design:type", Number)
], Technician.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Technician.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop({ default: new Date(), required: true }),
    __metadata("design:type", Date)
], Technician.prototype, "tsecs", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Technician.prototype, "bearing", void 0);
Technician = __decorate([
    type_graphql_1.ObjectType()
], Technician);
exports.Technician = Technician;
//# sourceMappingURL=Technician.js.map