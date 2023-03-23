import {Web3Storage} from "web3.storage";

export const guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


export const makeStorageClient = () => {
    return new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyNTJjMWM2NEViN0RhZDUzNWYyMkQ0M0JEOGU4NTEyQjY3ZWZiM2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk2MTA3OTI0OTUsIm5hbWUiOiJzY2FsaW5nLWV0aGVyZXVtIn0._BR2Un4Y6ESyagSkZK5KDOwVYcei9VSGQ4JW2OjCdno' })
}