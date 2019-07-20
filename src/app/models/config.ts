export class Config {
    id: number;
    mision: string;
    vision: string;
    aboutText: string;
    aboutMessage: string;
    facebook: string;
    instagram: string;
    twitter: string;
    issuu: string;
    contact: string;


    constructor() {
        this.mision = '';
        this.vision = '';
        this.aboutText = '';
        this.aboutMessage = '';
        this.facebook = '';
        this.instagram = '';
        this.twitter = '';
        this.issuu = '';
        this.contact = '';
    }

    getJson() {
        return this;
    }

    getJsonLogin() {
        return this;
    }
}
