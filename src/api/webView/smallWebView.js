import { Signing } from '../url';
import {makeRequest} from "../requestConfig";


export const submitSigning = (param) => {

    return makeRequest(Signing.userTaxSign, param);
};


export const getUserTaxTemplate = (param) => {

    return makeRequest(Signing.getUserTaxTemplate, param);
};
