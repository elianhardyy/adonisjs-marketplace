import Env from '@ioc:Adonis/Core/Env'

export const clientKey :string = Env.get('MIDTRANS_CLIENT_KEY')
export const serverKey : string = Env.get('MIDTRANS_SERVER_KEY')

//{{ config('midtrans.clientKey') }}