import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators/first';
import { CacheService } from "ionic-cache";

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
                details = postal.officename.replace('S.O', ' (Post), ').replace('B.O', ' (Post), ').replace('H.O', ' (Post), ');
                details += postal.taluk + ' (Taluk), ';
                details += postal.districtname + ' (District), ';
                details += postal.statename + ', PIN:' + postal.pincode + ", India";
            }
        } else {
            details = '';
        }
        return details;
    }

}
