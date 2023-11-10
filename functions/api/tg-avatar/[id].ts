export const onRequestGet: PagesFunction<{
    AVATAR_META: KVNamespace;
}, 'id'> = async ({env, params}) => {
    const data = await env.AVATAR_META.get(`photoId:${params.id}`)

    if (data) {
        return Response.redirect(`https://tg-avatars.init.ink/files/${data}`, 302)
    }
    else {
        return new Response('not found', {
            status: 404,
        })
    }
}
