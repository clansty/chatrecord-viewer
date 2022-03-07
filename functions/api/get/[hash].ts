export const onRequestPost: PagesFunction<{
    DATA_STORE: KVNamespace;
}, 'hash'> = async ({request, env, params}) => {
    const data = await env.DATA_STORE.get(params.hash as string)

    if (data) {
        return new Response(data)
    }
    else {
        return new Response('not found', {
            status: 404,
        })
    }
}
