

import { prismaClient } from 'db/client';
import async from '../web/app/page';
Bun.serve({
    port: 8081,
    fetch(req, server) {
        //upgrade to ws
        if (server.upgrade(req)) {
            return;
        }
        return new Response("Upgrade failed", { status: 500 });
    },

    websocket: {
       async message(ws:any, message: any) {
            console.log(message);
            await prismaClient.user.create({
                data: {
                    username: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            ws.send(message)
        }
    }
})