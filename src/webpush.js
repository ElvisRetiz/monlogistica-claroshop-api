const webpush = require("web-push");
const publicKey = 'BHeSmyydRm2B0RtcqQbI4_r0xFf7ymq9HbrJlscPEIQAHLoHulyAx88RkFdHnRPQGSNfDKRI-0R0Niy45s6BCFk';
const privateKey = 'dcwtVIcgUDeBXEtbHGA1YVLZY46C_VwHlS5mGTJ8S5k';

webpush.setVapidDetails("mailto:eretiz_kit@gpoasshel.com",publicKey,privateKey);

module.exports = webpush;