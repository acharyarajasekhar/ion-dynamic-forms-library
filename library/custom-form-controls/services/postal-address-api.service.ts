import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators/first';
import { CacheService } from "ionic-cache";
import * as _ from 'lodash';

@Injectable()
export class PostalAddressApiService {

    constructor(public http: HttpClient, private cache: CacheService) { }

    getDetailsByPINCode(pinCode: number): Promise<any> {
        let url = 'https://indian-pincodes.firebaseio.com/records.json?orderBy=%22pincode%22&equalTo=%22' + pinCode + '%22&print=pretty';
        let cacheKey = url;
        let groupKey = "postaldata"
        let request = this.http.get(url);
        let delayType = 'none';
        let ttl = 30 * 24 * 60 * 60;
        var postOffices = [];
        return new Promise((resolve, reject) => {
            let response = this.cache.loadFromDelayedObservable(cacheKey, request, groupKey, ttl, delayType);
            response.pipe(first()).toPromise().then(data => {
                if (data) {
                    for (var x in data) {
                        if (data[x].deliverystatus == "Delivery") {
                            postOffices.push({
                                ...data[x],
                                country: "India",
                                _display: this.getPostalDetailsForPlainDisplay(data[x])
                            });
                        }
                    }
                    resolve(postOffices);
                }
            }, err => reject(err))
        })
    }

    private getPostalDetailsForPlainDisplay(postal) {
        let details = '';
        if (postal) {
            if (postal.officename) {
                details = postal.officename.replace(' S.O', ', ').replace(' B.O', ', ').replace(' H.O', ', ');
                details += postal.taluk + ', ';
                if (!_.includes(postal.taluk, postal.districtname)) {
                    details += postal.districtname + ', ';
                }
                details += this.getStateID(postal.statename) + ' - ' + postal.pincode + ", India";
            }
        } else {
            details = '';
        }
        return details;
    }

    private getStateID(stateName) {
        let s = _.filter(states, state => state.name.toUpperCase() === stateName.toUpperCase());
        if (s && s[0]) return s[0].code;
        return stateName;
    }

}

const states = [
    {
        "code": "AN",
        "name": "Andaman and Nicobar Islands"
    },
    {
        "code": "AP",
        "name": "Andhra Pradesh"
    },
    {
        "code": "AR",
        "name": "Arunachal Pradesh"
    },
    {
        "code": "AS",
        "name": "Assam"
    },
    {
        "code": "BR",
        "name": "Bihar"
    },
    {
        "code": "CG",
        "name": "Chandigarh"
    },
    {
        "code": "CH",
        "name": "Chhattisgarh"
    },
    {
        "code": "DH",
        "name": "Dadra and Nagar Haveli"
    },
    {
        "code": "DD",
        "name": "Daman and Diu"
    },
    {
        "code": "DL",
        "name": "Delhi"
    },
    {
        "code": "GA",
        "name": "Goa"
    },
    {
        "code": "GJ",
        "name": "Gujarat"
    },
    {
        "code": "HR",
        "name": "Haryana"
    },
    {
        "code": "HP",
        "name": "Himachal Pradesh"
    },
    {
        "code": "JK",
        "name": "Jammu and Kashmir"
    },
    {
        "code": "JH",
        "name": "Jharkhand"
    },
    {
        "code": "KA",
        "name": "Karnataka"
    },
    {
        "code": "KL",
        "name": "Kerala"
    },
    {
        "code": "LD",
        "name": "Lakshadweep"
    },
    {
        "code": "MP",
        "name": "Madhya Pradesh"
    },
    {
        "code": "MH",
        "name": "Maharashtra"
    },
    {
        "code": "MN",
        "name": "Manipur"
    },
    {
        "code": "ML",
        "name": "Meghalaya"
    },
    {
        "code": "MZ",
        "name": "Mizoram"
    },
    {
        "code": "NL",
        "name": "Nagaland"
    },
    {
        "code": "OR",
        "name": "Odisha"
    },
    {
        "code": "PY",
        "name": "Puducherry"
    },
    {
        "code": "PB",
        "name": "Punjab"
    },
    {
        "code": "RJ",
        "name": "Rajasthan"
    },
    {
        "code": "SK",
        "name": "Sikkim"
    },
    {
        "code": "TN",
        "name": "Tamil Nadu"
    },
    {
        "code": "TS",
        "name": "Telangana"
    },
    {
        "code": "TR",
        "name": "Tripura"
    },
    {
        "code": "UK",
        "name": "Uttarakhand"
    },
    {
        "code": "UP",
        "name": "Uttar Pradesh"
    },
    {
        "code": "WB",
        "name": "West Bengal"
    }
];
