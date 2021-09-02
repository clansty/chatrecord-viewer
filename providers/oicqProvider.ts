import {Client, createClient} from 'oicq'
import {config} from './configProvider'
import sleep from '../utils/sleep'

// 重复初始化实例问题：
// https://nextjs-in-action-cn.taonan.lu/#%E5%9C%A8-nextjs-%E4%B8%AD%E4%BD%BF%E7%94%A8-prisma

// @ts-ignore
export const bot = global.bot || createClient(config.host.account, {
    platform: config.host.protocol,
})
// @ts-ignore
if (process.env.NODE_ENV !== "production") global.bot = bot

if (!bot.isOnline())
    bot.login(config.host.password)

export const ensureOnline = async () => {
    let count = 0
    while (!bot.isOnline()) {
        count++
        if (count > 300) return false
        await sleep(10)
    }
    return true
}
