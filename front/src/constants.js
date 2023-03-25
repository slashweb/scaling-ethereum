import { Polybase } from "@polybase/client";
export const CHAIN_ID = 10200
export const CONTRACT_ID = '0x099B657a3a331866cB196381f2C3C991953Aa45D'

export const db = new Polybase({
    defaultNamespace: "pk/0x1a273aa33e686db717878288b2adcfbdd8de4e58e86ab03e68ff786bbe41769bbcfd9571905e25c19e7a34817a4978ba7fc9676aef7f147f608449b5f687de74/scalling-v1",
})
