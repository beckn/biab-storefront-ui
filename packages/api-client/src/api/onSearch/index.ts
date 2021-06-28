import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { PollRequest } from '../../types/Search';
import { AckResponse } from '../../types/BecknClientApi';
import { buildOnSearchRequest } from './../../helpers/search';
import { Context } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function onSearch(context:Context, params: PollRequest): Promise<AckResponse> {
  const qParams = buildOnSearchRequest(params);
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.get(config.api.url + config.api.endpoints.onSearch)
    .query(qParams)
    .then(()=>{
      return JSON.parse(`{
            "context": {
                "domain": "local-retail",
                "country": "IND",
                "city": "Bengaluru",
                "action": "SEARCH",
                "core_version": "0.9.1-draft03",
                "bap_id": "beckn_in_a_box_bap",
                "bap_uri": "beckn_in_a_box_bap.com",
                "bpp_id": null,
                "bpp_uri": null,
                "transaction_id": "434a7680-012b-4e4f-a403-f6698292a5ae",
                "message_id": "5de2595b-3b78-469a-9eba-04d28b8f21e3",
                "timestamp": "2021-06-24T11:15:10.046999",
                "key": null,
                "ttl": null
            },
            "message": {
                "catalogs": [
                    {
                        "bpp_providers": [
                            {
                                "id": "./retail.kirana/ind.blr/lrdn.bpp.shopez.com",
                                "descriptor": {
                                    "name": "Pooja Stores",
                                    "code": "Retail-provider-1 code",
                                    "symbol": "Retail-provider-1 symbol",
                                    "short_desc": "A short description about Retail-provider-1",
                                    "long_desc": "A long description about Retail-provider-1",
                                    "images": [
                                        "uri:https://Retail-provider-1-image-1.com",
                                        "uri:https://Retail-provider-1-image-2.com"
                                    ],
                                    "audio": "Retail-provider-1-image-audio-file-path",
                                    "3d_render": "Retail-provider-1-3d"
                                },
                                "categories": null,
                                "items": [
                                    {
                                        "id": "./retail.kirana/ind.blr/pooja-stores.brown-bread-400gm@lrdn.bpp.shopez.com.item",
                                        "parent_item_id": null,
                                        "descriptor": {
                                            "name": "Brown Bread 400 gm",
                                            "code": null,
                                            "symbol": null,
                                            "short_desc": null,
                                            "long_desc": null,
                                            "images": null,
                                            "audio": null,
                                            "3d_render": null
                                        },
                                        "price": {
                                            "currency": "INR",
                                            "value": "40",
                                            "estimated_value": null,
                                            "computed_value": null,
                                            "listed_value": null,
                                            "offered_value": null,
                                            "minimum_value": null,
                                            "maximum_value": null
                                        },
                                        "category_id": "./local-retail.kirana/ind.blr/pooja-stores.breads@lrdn.bpp.shopx.com.provider_category",
                                        "location_id": "./retail.kirana/ind.blr/pooja-stores.koramangala-4th-block@lrdn.bpp.shopez.com.provider_location",
                                        "time": null,
                                        "matched": true,
                                        "related": null,
                                        "recommended": true,
                                        "tags": null
                                    },
                                    {
                                        "id": "./retail.kirana/ind.blr/pooja-stores.goodlife-milk-toned-1L@lrdn.bpp.shopez.com.item",
                                        "parent_item_id": null,
                                        "descriptor": {
                                            "name": "Good Life Toned Milk 1L",
                                            "code": null,
                                            "symbol": null,
                                            "short_desc": null,
                                            "long_desc": null,
                                            "images": null,
                                            "audio": null,
                                            "3d_render": null
                                        },
                                        "price": {
                                            "currency": "INR",
                                            "value": "60",
                                            "estimated_value": null,
                                            "computed_value": null,
                                            "listed_value": null,
                                            "offered_value": null,
                                            "minimum_value": null,
                                            "maximum_value": null
                                        },
                                        "category_id": "./local-retail.kirana/ind.blr/pooja-stores.dairy@lrdn.bpp.shopx.com.provider_category",
                                        "location_id": "./retail.kirana/ind.blr/pooja-stores.koramangala-4th-block@lrdn.bpp.shopez.com.provider_location",
                                        "time": null,
                                        "matched": true,
                                        "related": null,
                                        "recommended": true,
                                        "tags": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "bpp_providers": [
                            {
                                "id": "./retail.kirana/ind.blr/lrdn.bpp.shopez.com",
                                "descriptor": {
                                    "name": "Pooja Stores",
                                    "code": "Retail-provider-1 code",
                                    "symbol": "Retail-provider-1 symbol",
                                    "short_desc": "A short description about Retail-provider-1",
                                    "long_desc": "A long description about Retail-provider-1",
                                    "images": [
                                        "uri:https://Retail-provider-1-image-1.com",
                                        "uri:https://Retail-provider-1-image-2.com"
                                    ],
                                    "audio": "Retail-provider-1-image-audio-file-path",
                                    "3d_render": "Retail-provider-1-3d"
                                },
                                "categories": null,
                                "items": [
                                    {
                                        "id": "./retail.kirana/ind.blr/pooja-stores.brown-bread-400gm@lrdn.bpp.shopez.com.item",
                                        "parent_item_id": null,
                                        "descriptor": {
                                            "name": null,
                                            "code": null,
                                            "symbol": null,
                                            "short_desc": null,
                                            "long_desc": null,
                                            "images": null,
                                            "audio": null,
                                            "3d_render": null
                                        },
                                        "price": {
                                            "currency": "INR",
                                            "value": "40",
                                            "estimated_value": null,
                                            "computed_value": null,
                                            "listed_value": null,
                                            "offered_value": null,
                                            "minimum_value": null,
                                            "maximum_value": null
                                        },
                                        "category_id": "./local-retail.kirana/ind.blr/pooja-stores.breads@lrdn.bpp.shopx.com.provider_category",
                                        "location_id": "./retail.kirana/ind.blr/pooja-stores.koramangala-4th-block@lrdn.bpp.shopez.com.provider_location",
                                        "time": null,
                                        "matched": true,
                                        "related": null,
                                        "recommended": true,
                                        "tags": null
                                    },
                                    {
                                        "id": "./retail.kirana/ind.blr/pooja-stores.goodlife-milk-toned-1L@lrdn.bpp.shopez.com.item",
                                        "parent_item_id": null,
                                        "descriptor": {
                                            "name": "Good Life Toned Milk 1L",
                                            "code": null,
                                            "symbol": null,
                                            "short_desc": null,
                                            "long_desc": null,
                                            "images": null,
                                            "audio": null,
                                            "3d_render": null
                                        },
                                        "price": {
                                            "currency": "INR",
                                            "value": "60",
                                            "estimated_value": null,
                                            "computed_value": null,
                                            "listed_value": null,
                                            "offered_value": null,
                                            "minimum_value": null,
                                            "maximum_value": null
                                        },
                                        "category_id": "./local-retail.kirana/ind.blr/pooja-stores.dairy@lrdn.bpp.shopx.com.provider_category",
                                        "location_id": "./retail.kirana/ind.blr/pooja-stores.koramangala-4th-block@lrdn.bpp.shopez.com.provider_location",
                                        "time": null,
                                        "matched": true,
                                        "related": null,
                                        "recommended": true,
                                        "tags": null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "error": null
        }`);
    });
  // .then(res => {
  //   // eslint-disable-next-line camelcase
  //   res.body.context.message_id = '111113';
  //   return (res.body as AckResponse);
  // });
}
