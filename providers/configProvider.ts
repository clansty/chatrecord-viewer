import fs from 'fs'
import YAML from 'yaml'

type Config = {
    host: {
        account: number
        password: string
        protocol: 1 | 2 | 3 | 4 | 5
    }
    token: string
}

export const config = <Config>YAML.parse(fs.existsSync('config.yaml') ?
    fs.readFileSync('config.yaml', 'utf8') : process.env.RECORD_SERVER_CONFIG!)
