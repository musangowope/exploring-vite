import {parse} from "csv-parse/sync";

export default () => {
    return {
        name: 'vite:csv',
        async transform(src, id) {
            if(/\.csv$/.test(id)) {
                const records = parse(src, { columns: true })
                return {
                    code: `export default ${JSON.stringify(records)}`
                }
            }
        },
        async handleHotUpdate(context) {
            if(/\.csv$/.test(context.file)) {
                context.server.ws.send({
                    type: 'custom',
                    event: 'csv-update',
                    data: {
                        url: context.file,
                        data: parse(await context.read(), { columns: true })
                    }
                })
                return []
            }
        }
    }
}