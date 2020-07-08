"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const Booking_1 = require("./Booking");
const Listing_1 = require("./Listing");
const User_1 = require("./User");
const Viewer_1 = require("./Viewer");
exports.resolvers = merge_1.mergeResolvers([
    Booking_1.bookingResolvers,
    Listing_1.listingResolvers,
    User_1.userResolvers,
    Viewer_1.viewerResolvers
]);
