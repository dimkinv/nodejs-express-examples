
import { SearchService } from '../services/search.service';

const service = new SearchService();
const searchParam = process.argv[2]

async function foo() {
    try {
        const res = await service.getCharacterIds(searchParam);

        const promises = [];
        for (let id of res) {
            let promise = service.getCharacterInfoById(id);
            promises.push(promise);
        }

        const data = await Promise.all(promises);
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

foo();


// service.getCharacterIds(searchParam)
//     .then(res => {
//         return res;
//     })
//     .then(res => {
//         const promises = [];
//         for (let id of res) {
//             let promise = service.getCharacterInfoById(id);

//             promises.push(promise);

//         }

//         Promise.all(promises)
//             .then(res =>{
//                 console.log(res);
//             });
//     })



// console.log(searchParam);
