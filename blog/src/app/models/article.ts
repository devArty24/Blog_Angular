// Export class model
export class Article{
    constructor(
        public _id: string,
        public title: string,
        public content: string,
        public image: string,
        public data: any
    ){}
}