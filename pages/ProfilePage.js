import {t, Selector } from 'testcafe';

class ProfilePage {

    constructor(){
        this.profileTitle = Selector('h1').withAttribute('id', 'example-profile-id');
        this.userName = Selector('div').withText('Jasmin');
        this.signOutButton = Selector('p').withText('Sign Out')
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

    async logoutUser(){
        await t
            .click(this.signOutButton);
    }

}

export default new ProfilePage();