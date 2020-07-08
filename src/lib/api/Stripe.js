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
exports.Stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const client = new stripe_1.default(`${process.env.S_SECRET_KEY}`, {
    apiVersion: '2020-03-02',
});
exports.Stripe = {
    connect: (code) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.oauth.token({
            grant_type: "authorization_code",
            code,
        });
        return response;
    }),
    disconnect: (stripeUserId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.oauth.deauthorize({
            client_id: `${process.env.S_CLIENT_ID}`,
            stripe_user_id: stripeUserId
        });
        return response;
    }),
    getSecret: (amount, stripeAccount) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentIntent = yield client.paymentIntents.create({
            payment_method_types: ['card'],
            amount,
            currency: 'usd',
            application_fee_amount: Math.round(amount * 0.05),
            transfer_data: {
                destination: stripeAccount,
            },
        });
        return paymentIntent.client_secret;
    }),
    charge: (amount, source, stripeAccount) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield client.charges.create({
            amount,
            source,
            currency: 'usd',
            application_fee_amount: Math.round(amount * 0.05),
        }, {
            stripe_account: stripeAccount
        });
        if (res.status !== "succeeded") {
            throw new Error("Failed to create charge with Stripe.");
        }
    }),
};
