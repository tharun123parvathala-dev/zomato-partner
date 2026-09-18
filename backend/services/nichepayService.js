const Partner = require('../models/Partner');

exports.getPartnerStatus = async (partnerId) => {
  const p = await Partner.findOne({ partnerId });
  if(!p) return null;
  return {
    partnerId: p.partnerId,
    name: p.name,
    city: p.city,
    isOnline: p.isOnline,
    onlineHoursToday: p.onlineHoursToday,
    totalDeliveries: p.totalDeliveries,
    completedDeliveries: p.completedDeliveries,
    todayEarnings: p.todayEarnings,
    vehicleType: p.vehicleType,
    isVerified: p.isVerified
  };
};
exports.registerPartner = async (partnerId) => { return true; };
exports.sendActivity = async (activity) => { return true; };
exports.sendEligibilityData = async (partnerId) => { return true; };
