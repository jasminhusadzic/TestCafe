import {t, Selector } from 'testcafe';

class ProfilePage {

    constructor(){
        this.profileTitle = Selector('h1').withAttribute('id', 'example-profile-id');
    }


    async getProfileTitle(){
        try {
            const profileTitle = await this.profileTitle.innerText;
            return profileTitle;
        }
        catch (e){
            console.log(e);
        }
    }

}

export default new ProfilePage();