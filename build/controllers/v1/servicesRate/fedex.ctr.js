"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fedexServiceRate = void 0;
const base_ctr_1 = __importDefault(require("../base.ctr"));
const xmljson = require('xmljson').to_json;
const moment = require('moment');
const request = require('request');
class FedexServiceRate extends base_ctr_1.default {
    constructor() {
        super();
    }
    async getRate(req, res, next) {
        try {
            let today = new Date();
            today = moment(today).format('YYYY-MM-DDThh:mm:ss+00:00');
            console.log(today);
            let FedexKey = "ngeUYckEgHk5YsMw";
            let FedexPassword = "VgmUmkWAt1lSJV0aMf3csowlp";
            let FedexAccountNo = "510087941";
            let FedexMeterNo = "118641680";
            var options = {
                'method': 'POST',
                'url': 'https://wsbeta.fedex.com/web-services',
                'headers': {
                    'Content-Type': 'application/json',
                },
                body: '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" ' +
                    'xmlns:SOAPENC="http://schemas.xmlsoap.org/soap/encoding/" ' +
                    'xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" ' +
                    'xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
                    ' xmlns="http://fedex.com/ws/rate/v28">\r\n <SOAP-ENV:Body>\r\n ' +
                    '<RateRequest>\r\n<WebAuthenticationDetail>\r\n' +
                    '<UserCredential>\r\n  ' +
                    `<Key>${FedexKey}</Key>\r\n ` +
                    `<Password>${FedexPassword}</Password>\r\n` +
                    '</UserCredential>\r\n</WebAuthenticationDetail>\r\n <ClientDetail>\r\n ' +
                    `<AccountNumber>${FedexAccountNo}</AccountNumber>\r\n` +
                    `<MeterNumber>${FedexMeterNo}</MeterNumber>\r\n` +
                    `</ClientDetail>\r\n` +
                    '<TransactionDetail>\r\n' +
                    '<CustomerTransactionId>RateRequest_v28</CustomerTransactionId>\r\n' +
                    '</TransactionDetail>\r\n' +
                    '<Version>\r\n' +
                    '<ServiceId>crs</ServiceId>\r\n ' +
                    '<Major>28</Major>\r\n' +
                    '<Intermediate>0</Intermediate>\r\n' +
                    '<Minor>0</Minor>\r\n ' +
                    '</Version>\r\n' +
                    '<RequestedShipment>\r\n' +
                    '<ShipTimestamp>2021-03-16T12:17:29+00:00</ShipTimestamp>\r\n ' +
                    '<DropoffType>REGULAR_PICKUP</DropoffType>\r\n' +
                    '<ServiceType>PRIORITY_OVERNIGHT</ServiceType>\r\n' +
                    '<PackagingType>FEDEX_BOX</PackagingType>\r\n' +
                    '<TotalWeight>\r\n' +
                    '<Units>LB</Units>\r\n' +
                    '<Value>20.0</Value>\r\n </TotalWeight>\r\n' +
                    '<Shipper>\r\n <AccountNumber>${FedexAccountNo}</AccountNumber>\r\n' +
                    '<Contact>\r\n ' +
                    '<CompanyName>FedEx-WAPI</CompanyName>\r\n' +
                    '<PhoneNumber> 7985018133 </PhoneNumber>\r\n' +
                    '</Contact>\r\n' +
                    '<Address>\r\n' +
                    '<StreetLines>SN2000 Test Meter 8</StreetLines>\r\n ' +
                    '<StreetLines>10 Fedex Parkway</StreetLines>\r\n' +
                    '<City>UP</City>\r\n ' +
                    '<StateOrProvinceCode>UP</StateOrProvinceCode>\r\n' +
                    '<PostalCode>273015</PostalCode>\r\n' +
                    '<CountryCode>INDIA</CountryCode>\r\n ' +
                    '</Address>\r\n ' +
                    '</Shipper>\r\n ' +
                    '<Recipient>\r\n ' +
                    '<Contact>\r\n' +
                    '<PersonName>test </PersonName>\r\n' +
                    '<PhoneNumber>7985018133</PhoneNumber>\r\n' +
                    '</Contact>\r\n' +
                    '<Address>\r\n' +
                    '<StreetLines>Recipient Address Line 1</StreetLines>\r\n' +
                    '<StreetLines>Recipient Address Line 2</StreetLines>\r\n' +
                    '<City>Collierville</City>\r\n' +
                    '<StateOrProvinceCode>TN</StateOrProvinceCode>\r\n' +
                    '<PostalCode>110065</PostalCode>\r\n <CountryCode>INDIA</CountryCode>\r\n' +
                    '</Address>\r\n </Recipient>\r\n <ShippingChargesPayment>\r\n ' +
                    '<PaymentType>SENDER</PaymentType>\r\n </ShippingChargesPayment>\r\n' +
                    ' <RateRequestTypes>LIST</RateRequestTypes>\r\n <PackageCount>1</PackageCount>\r\n' +
                    ' <RequestedPackageLineItems>\r\n <SequenceNumber>1</SequenceNumber>\r\n' +
                    ' <GroupNumber>1</GroupNumber>\r\n <GroupPackageCount>1</GroupPackageCount>\r\n ' +
                    '<Weight>\r\n <Units>LB</Units>\r\n<Value>20.0</Value>\r\n </Weight>\r\n ' +
                    '<Dimensions>\r\n ' +
                    '<Length>12</Length>\r\n' +
                    '<Width>12</Width>\r\n' +
                    '<Height>12</Height>\r\n' +
                    '<Units>IN</Units>\r\n ' +
                    '</Dimensions>\r\n' +
                    '<ContentRecords>\r\n' +
                    '<PartNumber>123XX5</PartNumber>\r\n' +
                    '<ItemNumber>INPUT YOUR INFORMATION</ItemNumber>\r\n' +
                    '<ReceivedQuantity>12</ReceivedQuantity>\r\n' +
                    '<Description>ContentDescription</Description>\r\n' +
                    '</ContentRecords>\r\n </RequestedPackageLineItems>\r\n' +
                    '</RequestedShipment>\r\n </RateRequest>\r\n ' +
                    '</SOAP-ENV:Body>\r\n' +
                    '</SOAP-ENV:Envelope>'
            };
            request(options, function (error, response, body) {
                if (error || response.statusCode != 200) {
                    console.log('status Code ==>', response.statusCode, body);
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    error = new Error();
                    error.code = response.statusCode;
                    error.response = response;
                    error.body = body;
                    throw error;
                }
                xmljson(body, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    if (res["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]) {
                        const result = res["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["RateReply"];
                        console.log(result);
                    }
                    else {
                        throw new Error(res["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["$"]["HighestSeverity"]);
                    }
                });
            });
        }
        catch (error) {
            next();
        }
    }
}
exports.fedexServiceRate = new FedexServiceRate();
//# sourceMappingURL=fedex.ctr.js.map