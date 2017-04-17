import { Request, Response } from 'express';
import { CharacterResponse } from '../../models/character-response.model';
import { SearchService } from '../../services/search.service';
export class SearchController {
    async get(req: Request, res: Response) {
        try {
            const searchService = new SearchService();
            const searchParam = req.params.searchParam;
            const ids = await searchService.getCharacterIds(searchParam);
            
            if(!ids){
                res.status(400).end('no users found');
                return;
            }

            let promises: Promise<CharacterResponse>[] = [];
            for (let id of ids) {
                promises.push(searchService.getCharacterInfoById(id));
            }
            const results = await Promise.all(promises);
            const response = results.map((user) => {
                return {
                    name: user.name,
                    birthday: user.birthday
                }
            });

            res.send(response);
        } catch (e) {
            res.status(500).end(e.toString());
        }
    }
}