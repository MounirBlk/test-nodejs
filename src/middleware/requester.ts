import { isUndefinedOrNull } from "@middleware";
import { Brand, IModel } from "@model";
import axios, { AxiosError, AxiosResponse, Method } from "axios"

export class Requester<T extends IModel> {
    path: string;
    data: { 
        [name: string]: string; 
    };

    constructor(path: string) {
        this.path = path
    }

    public async post(data: { [name: string]: string; }): Promise<T> {
        try {
            const response = await axios(getConfigAxios(this.path, 'post', data)) // post
            return Promise.resolve(<T>response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async get(id: string = null): Promise<T | T[]> {
        try {
            const isGetAll: boolean = isUndefinedOrNull(id)
            const getFinalPath: string = isGetAll ? `${this.path}` : `${this.path}/${id}`;
            const response = await axios(getConfigAxios(getFinalPath, 'get')) // get
            return isGetAll ? Promise.resolve(<T[]>response.data) : Promise.resolve(<T>response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

/**
 *  Request config 
 *  @param url url
 *  @param methodReq post / get / put / delete ...
 *  @param dataBody? data from body
 */ 
const getConfigAxios = (url: string, methodReq: Method, dataBody: any = null) => {
    const configAxios = {
        url: url.trim(),
        method: methodReq,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        data: dataBody
    };
    dataBody === null ? (configAxios.data = undefined) : null;
    return configAxios;
}