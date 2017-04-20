import { Request, Response } from 'express';

export class StockController {
    kushkush(req: Request, res: Response) {
        console.log('controller')
        const someQueryParam = req.query.somequeryParam;
        const stockName = req.params.stockName;

        if(stockName !== 'google'){
            res.status(404).end();
            return;
        }

        const stock = Math.random();
        res.json({name: 'google', stock: stock});
    }

    post(req:Request, res){
        req.body
    }
}