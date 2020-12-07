import { Logger } from './logger.service';

export class HeroService{
    private heroes: Hero[] = [];

    constructor(
        private backed: BackendService,
        private logger: Logger
    ){ }

    getHeroes(){
        this.backed.getAll(Hero).then( (heroes: Hero[]) => {
            this.logger.log(`Fetched ${heroes.length} heroes.`);
            this.heroes.push(...heroes);
        });
        return this.heroes;
    }

}
