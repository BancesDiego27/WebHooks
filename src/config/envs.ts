import 'dotenv/config'
import {get} from  'env-var'


export const envs ={
    PORT: get('PORT').required().asPortNumber(),
    Discord_Webhook_URL : get('DISCORD_WEBHOOK_URL').required().asString(),
    Secret_Token : get('SECRET_TOKEN').required().asString(),
}