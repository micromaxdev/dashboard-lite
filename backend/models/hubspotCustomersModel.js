const mongoose = require("mongoose");

const hubspotCustomersSchema = mongoose.Schema({
  recordId: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Record ID",
  },
  companyName: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Company name",
  },
  companyOwner: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Company owner",
  },
  createDate: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Create Date",
  },
  phoneNumber: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Phone Number",
  },
  lastActivityDate: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Last Activity Date",
  },
  city: {
    type: mongoose.Schema.Types.Mixed,
    alias: "City",
  },
  countryOrRegion: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Country/Region",
  },
  industry: {
    type: mongoose.Schema.Types.Mixed,
    alias: "Industry",
  },
});

module.exports = mongoose.model("HubspotCustomers", hubspotCustomersSchema);
