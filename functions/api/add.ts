import {ForwardMessage} from 'oicq'

export const onRequestPost: PagesFunction<{
    API_KEY: string;
    DATA_STORE: KVNamespace;
}> = async ({request, env}) => {
    const data = await request.json() as {
        auth: string,
        key: string,
        data: ForwardMessage[]
    }

    if (data.auth !== env.API_KEY) {
        return new Response('Wrong API key', {
            status: 403,
        })
    }

    await env.DATA_STORE.put(data.key, JSON.stringify(data.data))

    return new Response('succeed', {
        status: 201,
    })
}
