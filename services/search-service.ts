import axios from 'axios';

export class SearchService {
    getCharacterIds(searchParam: string): Promise<number[]> {
        return new Promise((resolve, reject) => {
            axios.get(`https://esi.tech.ccp.is/latest/search/?categories=character&datasource=tranquility&language=en-us&search=${searchParam}&strict=false`)
                .then(res => {
                    resolve(res.data.character);
                })
                .catch(reject);
        });
    }

    getCharacterInfoById(id: number) {
        return new Promise((resolve, reject) => {
            axios.get(`https://esi.tech.ccp.is/latest/characters/${id}/?datasource=tranquility`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(reject);
        });
    }
}