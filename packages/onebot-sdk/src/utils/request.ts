import axios from "axios"

export function createRequest(config: { baseURL: string }) {
    const request = axios.create({
        baseURL: config.baseURL,
    })

    return request
}
